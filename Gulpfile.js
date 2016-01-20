var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');

//all scss imported in site.scss, except page-specific stuff
var output = './css/'
var input = './css/site.scss';
var watchFiles = ['./css/*.scss', './css/*.css'];
var templateFiles = './*.php';
// var jsFiles= './static/js/*.js';


gulp.task('sass', function() {
    gulp.src(input)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch(watchFiles,['sass']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "localhost:8000"
    });

    gulp.watch(watchFiles, ['sass']);
    gulp.watch([templateFiles]).on('change', browserSync.reload);
});

//Watch task
gulp.task('default', ['serve']);