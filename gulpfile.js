var gulp = require("gulp");
var ts = require("gulp-typescript");
var sequence = require("run-sequence");

var vendorNpm = [
    "./node_modules/moment/**/*.js",
    './node_modules/angular2-jwt/angular2-jwt.js',
    './node_modules/jquery/dist/jquery.js',
    './node_modules/systemjs/dist/system-polyfills.js',
    './node_modules/systemjs/dist/system.src.js',
    './node_modules/zone.js/dist/*.js',
    './node_modules/es6-shim/es6-shim.js',
    './node_modules/reflect-metadata/*.js',
    './node_modules/rxjs/**/*.js',
    './node_modules/@angular/**/*.js',
    './node_modules/@angular2-material/**/*.js'
];

var vendorBower = [
    './bower_components/auth0-lock/build/auth0-lock.js'
];

var tsProject = ts.createProject("./src/tsconfig.json");

gulp.task('sass:watch', function () {
    return gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task("sass", function () {
    var sass = require('gulp-sass');
    return gulp.src(["./src/**/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./wwwroot/"));
});

gulp.task("watch", ["sass:watch", "compile:watch", "html:watch"]);

gulp.task('bundle', function () {
    var path = require('path');
    var Builder = require('systemjs-builder');

    var builder = new Builder('/node_modules');

    builder.config({
        packages: {
            '@angular/core': { main: 'index' },
            '@angular/common': { main: 'index' },
            '@angular/compiler': { main: 'index' },
            '@angular/http': { main: 'index' },
            '@angular/router': { main: 'index' },
            '@angular/platform-browser': { main: 'index' },
            '@angular/platform-browser-dynamic': { main: 'index' }
        }
    });

    return builder.bundle([
        '@angular/**/*.js'
    ],
        'wwwroot/bundle.js',
        { minify: false, sourceMaps: false })
        .then(function () {
            console.log('Build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task("build:client", function (cb) {
    return sequence("clean", "webpack:build", ["copyHtml", "copyVendor:bower", "sass"], cb);
});

gulp.task('compile:watch', ['compile:cred'], function () {
    return gulp.watch('src/**/*.ts', ['compile:cred']);
});

gulp.task('compile:cred', function (cb) {
    return sequence('credentials', 'webpack:build', cb);
});

gulp.task('pack', function () {
    return sequence('webpack:build', 'webpack:copy');
})

gulp.task('webpack:build', function () {
    var webpack = require('gulp-webpack');

    gulp.src('src/**/*.ts')
        .pipe(webpack(require('./webpack.prod.js')))
        .pipe(gulp.dest('wwwroot'));
});

gulp.task("compile", function () {
    var sourcemaps = require("gulp-sourcemaps");

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(".tmp"));
});

gulp.task("clean", function () {
    var del = require("del");
    return del([
        '.tmp',
        'tmp',
        'wwwroot'
    ]);
});

gulp.task("html:watch", ["copyHtml"], function () {
    return gulp.watch(["./src/**/*.html"], ["copyHtml"]);
})

gulp.task("copyHtml", function () {
    return gulp.src(["./src/**/*.html", "!./src/index.html"]).pipe(gulp.dest("./wwwroot"));
});

gulp.task("copyVendor:npm", function () {
    return gulp.src(vendorNpm, { base: 'node_modules/' })
        .pipe(gulp.dest("./wwwroot/vendor"));
})

gulp.task("copyVendor:bower", function () {
    return gulp.src(vendorBower, { base: 'bower_components/' })
        .pipe(gulp.dest("./wwwroot/vendor"));
})

gulp.task("copyVendor", ["copyVendor:npm", "copyVendor:bower"]);

gulp.task("cleanTemp", function (cb) {
    var del = require("del");
    return del([".tmp", "tmp"], cb);
});

gulp.task("cleanRoot", function (cb) {
    var del = require("del");
    return del("wwwroot", cb);
});

gulp.task("credentials", function () {
    var replace = require("gulp-replace");
    var creds = require("./config.json");
    try {
        creds = require("./config.Production.json");
        console.log("using prod credentials - auth0 should work");
    } catch (error) {
        console.log("using dev credentials - auth0 will not work");
    }

    return gulp.src(["./wwwroot/*.js"])
        .pipe(replace("auth0clientId", creds.Auth0Settings.ClientId))
        .pipe(replace("auth0domain", creds.Auth0Settings.Domain))
        .pipe(gulp.dest("wwwroot"));
});
