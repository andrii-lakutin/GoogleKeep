"use strict";

var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

gulp.task('connect', function() {
  connect.server({
    root: '../Google Keep/',
    livereload: true
  });
});

gulp.task('stylus', function () {
  return gulp.src(['stylus/reset.styl',
  				   'stylus/global.styl',
  				   'stylus/header.styl',
  				   'stylus/menu.styl',
  				   'stylus/notesCreator.styl',
             'stylus/stickersArea.styl',
             'stylus/note.styl'])
  	.pipe(concat('main.styl'))
  	.pipe(stylus('main.css'))
    .pipe(gulp.dest('../Google Keep/'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src('../Google Keep/index.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  return gulp.src(['scripts/header.js',
  				   'scripts/notesCreator.js',
             'scripts/note.js',
             'scripts/DB.js',
             'scripts/notesArea.js',
             'scripts/sideMenu.js'])
  	.pipe(concat('main.js'))
  	.pipe(gulp.dest('../Google Keep/'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('stylus/*.styl', ['stylus']);
	gulp.watch('../Google Keep/index.html', ['html']);
	gulp.watch('scripts/*.js', ['js']);
})

// default
gulp.task('default', ['html','stylus','js','watch','connect']);