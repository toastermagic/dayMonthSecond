var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('app/tsconfig.json');

gulp.task('watch', ['build:client', 'build:dotnet', 'copyHtml'], function () {
    gulp.watch('app/**/*.html', ['copyHtml']);
    gulp.watch('app/**/*.ts', ['build:client']);
    gulp.watch('server/**/*.cs', ['build:dotnet']);
});

gulp.task('credentials', function () {
    var replace = require('gulp-replace');
    var creds = require('./config.json');
    try {
        creds = require('./config.Production.json');
        console.log('using prod credentials - auth0 should work')
    } catch (error) {
        console.log('using dev credentials - auth0 will not work')
    }

    return gulp.src(['wwwroot/app/services/auth.service.js'])
        .pipe(replace('auth0clientId', creds.ClientId))
        .pipe(replace('auth0domain', creds.Domain))
        .pipe(gulp.dest('wwwroot/app/services'));
});

gulp.task('build:client', ['compile-ts', 'credentials', 'copyHtml']);

gulp.task('build:dotnet', function () {
    var shell = require('gulp-shell');
    return shell.task(['dotnet build']);
});

gulp.task('compile-ts', function () {
    var sourcemaps = require('gulp-sourcemaps');

    var tsResult = tsProject.src(['/app/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('wwwroot/app'));
});

gulp.task('copyHtml', function() {
    return gulp.src(['./app/index.html']).pipe(gulp.dest('wwwroot'));
})

gulp.task('servewatch', ['watch'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 5000, app;
    var serveDir = __dirname + "//wwwroot";

    app = connect().use(serveStatic(serveDir));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });

    console.log('serving', serveDir, 'on', port);
});

