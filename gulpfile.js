/*---------------------------------------------
Require's
----------------------------------------------*/
// BugFix promise
require('es6-promise').polyfill();

// Require's
var gulp          = require('gulp'),
    clean         = require('gulp-dest-clean'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    shorthand     = require('gulp-shorthand'),
    csscomb       = require('gulp-csscomb'),
    uglifyCss     = require('gulp-uglifycss'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    htmlmin       = require('gulp-htmlmin'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant'),
    browserSync   = require('browser-sync').create(),
    runSequence   = require('gulp-run-sequence'),
    sftp          = require('gulp-sftp');

/*---------------------------------------------
Path's and Configs
----------------------------------------------*/
// Path's
deploy = {
  dhost       : 'rxvolonte.esy.es',
  douser      : 'u935562344.rxvolonte',
  dpass       : 'i1a9s1d9',
  dport       : 21,
  remotePath  : '/home/u935562344/public_html/'
}

server = {
  src     : './',
  proxy   : 'boilerplate.dev',
  port    : 80
}

src = {
  base   : './src/',
  sass : './src/assets/scss/',
  css    : './src/assets/css/',
  js     : './src/assets/js/',
  img    : './src/assets/img/',
  html   : './src/',
}

dest = {
  base   : './public/',
  css    : './public/assets/css/',
  js     : './public/assets/js/',
  img    : './public/assets/img/',
  html   : './public/',
}

no = {
  sassFolder : '!' + src.sass,
  sassFiles  : '!' + src.sass + '**/*',
  jsFolder     : '!' + src.js + 'src/',
  jsFiles      : '!' + src.js + 'src/**/*',
  imgFolder    : '!' + src.img,
  imgFiles     : '!' + src.img + '**/*',
  htmlFiles    : '!' + src.html + '**/*.{html,php}',
}

/*---------------------------------------------
Development Task's
----------------------------------------------*/
// Compile css
gulp.task('css', function () {
  return gulp.src(src.sass + 'main.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
			cascade: false
    }))
    .pipe(shorthand())
    .pipe(csscomb())
    .pipe(gulp.dest(src.css));
});

// Compile js
gulp.task('js', function () {
  return gulp.src(src.js + 'src/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(src.js))
});

// Run Server Sync
gulp.task('server', ['css', 'js'], function () {
  browserSync.init({
    baseDir : server.src,
    proxy   : server.proxy,
    port    : server.port,
    logConnections: true
  });

  gulp.watch(src.sass + '**/*.scss', ['css']).on('change', browserSync.reload);
  gulp.watch(src.js + 'src/**/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch(src.html + '**/*.{html,php}').on("change", browserSync.reload);
});

// Watch change files
gulp.task('watch', function () {
  gulp.watch(src.sass + '**/*.scss', ['css']);
  gulp.watch(src.js + 'src/**/*.js', ['js']);
});

// Compile Dev Files
gulp.task('compile', ['css', 'js']);

/*---------------------------------------------
Build Task's
----------------------------------------------*/
// Copy files from SRC to Public
gulp.task('copy', function() {
  return gulp.src([
    src.base + '**/*',
    no.stylusFolder,
    no.stylusFiles,
    no.jsFolder,
    no.jsFiles,
    no.imgFolder,
    no.imgFiles,
    no.htmlFiles
  ])
  .pipe(clean(dest.base))
  .pipe(gulp.dest(dest.base))
});

// Minify JS
gulp.task('js-min', function() {
  return gulp.src(src.js + 'main.js')
  .pipe(uglify())
  .pipe(gulp.dest(dest.js))
});

// Minify CSS
gulp.task('css-min', function() {
  return gulp.src(src.css + 'main.css')
  .pipe(uglifyCss())
  .pipe(gulp.dest(dest.css))
});

// Minify HTML
gulp.task('html-min', function() {
  return gulp.src( src.html + '**/*.{html,php}' )
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dest.html))
});

// Compress IMG
gulp.task('img-compress', function() {
  return gulp.src( src.img + '**/*' )
  .pipe( imagemin() )
  .pipe(gulp.dest( dest.img ))
});

// Build
gulp.task('build', function(cb) {
  runSequence(['copy'], ['css-min', 'js-min', 'html-min', 'img-compress'], cb)
});

// Deploy
gulp.task('deploy', function() {
  return gulp.src( src.base + '*/**' )
    .pipe(sftp({
      host : deploy.dhost,
      user : deploy.duser,
      pass : deploy.dpass
    }))
});

/*---------------------------------------------
Extras task's
----------------------------------------------*/
// Info about this project
gulp.task('info', function() {
  console.log("===================================================");
  console.log("Wellcome to Boilerplate.Dev | powered by @rxvolonte");
  console.log("Date: 2016-03-14 | Hour: 21:28");
  console.log("Url: https://github.com/RxVolonte/boilerplate.dev");
  console.log("Version: 1.0.0 | Last Update: 2016-03-15");
  console.log("===================================================");
});

// List All Task's
gulp.task('help', function() {
  console.log("===================================================");
  console.log("HELP!");
  console.log("---------------------------------------------------");
  console.log("TASK | DESCRIPTION");
  console.log("---------------------------------------------------");
  console.log("compile | Compile .scss and .js files");
  console.log("---------------------------------------------------");
  console.log("css | Compile files .scss");
  console.log("---------------------------------------------------");
  console.log("help | List all tasks and descriptions");
  console.log("---------------------------------------------------");
  console.log("info | Show info about this project");
  console.log("---------------------------------------------------");
  console.log("js | Compile files .js");
  console.log("---------------------------------------------------");
  console.log("js-min | Minify files .js");
  console.log("----------------------------------------------------");
  console.log("server | run server with browser sync");
  console.log("----------------------------------------------------");
  console.log("watch | Watch and run task for corresponding files");
  console.log("===================================================");
});
