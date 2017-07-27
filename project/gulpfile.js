'use strict';

const compiler = require('google-closure-compiler-js').gulp();
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    clean = require('gulp-clean'),
    minifyHTML = require('gulp-minify-html');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/scss/*.scss'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss'
    }
};

gulp.task('html:build', function () {
    gulp.src([path.src.html])
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(compiler({
            compilationLevel: 'ADVANCED',
            warningLevel: 'VERBOSE',
            outputWrapper: '(function(){\n%output%\n}).call(this)',
            jsOutputFile: 'calculator.js',
            createSourceMap: true
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build'
]);

gulp.task('clean', function () {
    gulp.src(path.build.css, {read: false})
        .pipe(clean({force: true}));
    gulp.src(path.build.js, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('default', ['clean', 'build', 'watch']);