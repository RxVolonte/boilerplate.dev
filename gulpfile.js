// Plugins
var gulp = require('gulp'),

    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    shorthand = require('gulp-shorthand'),
    csscomb = require('gulp-csscomb'),

    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();

// Tarefas desenvolvimento
gulp.task('css', function () {
  return gulp.src('./src/assets/scss/main.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
			cascade: false
    }))
    .pipe(shorthand())
    .pipe(csscomb())
    .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('js', function () {
  return gulp.src('./src/assets/js/src/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./src/assets/js/'))
});

gulp.task('server', ['css', 'js'], function () {
  browserSync.init({
    proxy: 'boilerplate.dev'
  });

  gulp.watch('./src/assets/scss/**/*.scss', ['css']).('change', browerSync.reload);
  gulp.watch('.src/assets/js/src/**/*.js', ['js']).('change', browerSync.reload);
});

gulp.task('watch', function () {
  gulp.watch('./src/assets/scss/**/*.scss', ['css']);
  gulp.watch('.src/assets/js/src/**/*.js', ['js']);
});
// Tarefas produção


// Tarefas extras
gulp.task('info', function() {
  console.log("===================================================");
  console.log("Wellcome to Boilerplate.Dev | powered by @rxvolonte");
  console.log("Date: 2016-03-14 | Hour: 21:28");
  console.log("Url: https://github.com/RxVolonte/boilerplate.dev");
  console.log("Version: 1.0.0 | Last Update: 2016-03-15");
  console.log("===================================================");
});

gulp.task('help', function() {
  console.log("===================================================");
  console.log("HELP!");
  console.log("---------------------------------------------------");
  console.log("TASK | DESCRIPTION");
  console.log("---------------------------------------------------");
  console.log("css | Compile files .scss");
  console.log("---------------------------------------------------");
  console.log("help | List all tasks and descriptions");
  console.log("---------------------------------------------------");
  console.log("info | Show info about this project");
  console.log("---------------------------------------------------");
  console.log("js | Compile files .js");
  console.log("----------------------------------------------------");
  console.log("watch | Watch and run task for corresponding files");
  console.log("===================================================");
});
