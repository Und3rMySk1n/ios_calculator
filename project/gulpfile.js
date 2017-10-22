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
    minifyHTML = require('gulp-minify-html'),
    mocha = require('gulp-mocha'),
    runSequence = require('run-sequence');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        test: 'test/',
        prepare_test: 'test/src/'
    },
    src: {
        html: 'src/*.html',
        js: [
            'node_modules/google-closure-library/closure/goog/base.js',
            'src/js/*.js'
        ],
        style: 'src/scss/*.scss',
        prepare_test: [
            'node_modules/google-closure-library/closure/goog/base.js',
            'src/js/CalcCommand.js',
            'src/js/CalcModel.js',
            'src/js/lib/mocha.js',
            'src/js/model_test.js'
        ],
        test: 'test/src/test.js',
        test_run: 'test/src/test.js'
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
            compilationLevel: 'SIMPLE',
            warningLevel: 'VERBOSE',
            processCommonJsModules: true,
            outputWrapper: '(function(){\n%output%\n}).call(this)',
            jsOutputFile: 'calculator.js'
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('test:prepare', function () {
    gulp.src(path.src.prepare_test)
        .pipe(compiler({
            compilationLevel: 'WHITESPACE_ONLY',
            warningLevel: 'VERBOSE',
            processCommonJsModules: true,
            outputWrapper: '(function(){\n%output%\n}).call(this)',
            jsOutputFile: 'calculator_model_test.js',
            env: 'BROWSER',
            externs: ['node']
        }))
        .pipe(gulp.dest(path.build.prepare_test));
});

gulp.task('test:run', ['test:prepare'], function () {
    gulp.src(path.src.test_run)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.test))
        .pipe(mocha({
            reporter: 'spec',
            require: [
                'assert'
            ]
        }));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build'
]);

gulp.task('test', [
    'test:prepare',
    'test:run'
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