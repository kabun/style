var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var compass = require('gulp-compass');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber')

// browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
             baseDir: "master",       //対象ディレクトリ
             index  : "index.html"    //インデックスファイル
         }
     });
 });
gulp.task('bs-reload', function () {
    browserSync.reload();
});
// compass
gulp.task('compass', function(){
    gulp.src('develop/sass/*.scss')
		.pipe(plumber())
		.pipe(compass({
        config_file: 'config.rb',
        css: 'develop/css/',
        sass: 'develop/sass/'
    }));
});
// minify-css
gulp.task('minify-css', function() {
    return gulp.src("develop/css/*.css")
    .pipe(cleanCSS())
		.pipe(rename({
		  extname: '.min.css'
		}))
    .pipe(gulp.dest('master/mincss/'));
    //.pipe(gulp.dest('css')); 上書きする場合
});
 //JS圧縮
gulp.task('minify-js', function() {
    return gulp.src("develop/js/*.js")
    .pipe(uglify())
		.pipe(rename({
		  extname: '.min.js'
		}))
    .pipe(gulp.dest('master/minjs/'));
    //.pipe(gulp.dest('js')); 上書きする場合
});


 // Watch
gulp.task('watch', function(){
    gulp.watch('develop/sass/*.scss', function(event) {
        gulp.run('compass');
    });
    gulp.watch('develop/css/*.css', function(event) {
        gulp.run('minify-css');
        gulp.run('bs-reload');
    });
    gulp.watch('develop/js/*.js', function(event) {
        gulp.run('minify-js');
        gulp.run('bs-reload');
    });
    gulp.watch('master/*.html', function(event) {
        gulp.run('bs-reload');
    });
});

gulp.task('default', ['browser-sync'], function () {
    gulp.run('watch');
});
