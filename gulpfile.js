// Plugins
var gulp = require('gulp');

// Tarefas
gulp.task('info', function() {
  console.log("===================================================");
  console.log("Wellcome to Boilerplate.Dev | powered by @rxvolonte");
  console.log("Date: 2016-03-14 | Hour: 21:28");
  console.log("Url: https://github.com/RxVolonte/boilerplate.dev");
  console.log("Version: 1.0.0 | Last Update: 2016-03-14");
  console.log("===================================================");
});

gulp.task('help', function() {
  console.log("===================================================");
  console.log("HELP!");
  console.log("---------------------------------------------------");
  console.log("TASK | DESCRIPTION");
  console.log("---------------------------------------------------");
  console.log("info | Show info about this project");
  console.log("===================================================");
});
