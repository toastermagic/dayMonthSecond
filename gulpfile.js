var gulp = require("gulp");
var ts = require("gulp-typescript");

var vendor = [
    "./node_modules/es6-shim/es6-shim.min.js",
    "./node_modules/systemjs/dist/system-polyfills.js",
    "./node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
    "./node_modules/angular2/bundles/angular2-polyfills.js",
    "./node_modules/systemjs/dist/system.src.js",
    "./node_modules/rxjs/bundles/Rx.js",
    "./node_modules/es6-promise/dist/es6-promise.js",
    "./node_modules/angular2/bundles/angular2.dev.js",
    "./node_modules/angular2/bundles/router.dev.js",
    "./node_modules/angular2/bundles/http.dev.js",
    "./node_modules/ng2-material/dist/font.css",
    "./node_modules/ng2-material/dist/ng2-material.css"
];

var copyOnly = [
    "./node_modules/angular2-jwt/angular2-jwt.js",
    "./node_modules/ng2-material/dist/ng2-material.js",
    "./node_modules/ng2-material/dist/MaterialIcons-Regular.eot",  
    "./node_modules/ng2-material/dist/MaterialIcons-Regular.ttf",  
    "./node_modules/ng2-material/dist/MaterialIcons-Regular.woff",  
    "./node_modules/ng2-material/dist/MaterialIcons-Regular.woff2"  
];

var tsProject = ts.createProject("src/tsconfig.json");

gulp.task("watch:client", ["build:client"], function () {
    gulp.watch("./app/**/*.css", ["copyCss"]);
    gulp.watch("./app/**/*.html", ["copyHtml", "injectVendor"]);
    gulp.watch("./app/**/*.ts", ["compile-ts", "credentials"]);
});

gulp.task("build:client", ["copyHtml", "copyCss", "credentials", "injectVendor"]);

gulp.task("credentials", ["compile-ts"], function () {
    var replace = require("gulp-replace");
    var creds = require("./config.json");
    try {
        creds = require("./config.Production.json");
        console.log("using prod credentials - auth0 should work");
    } catch (error) {
        console.log("using dev credentials - auth0 will not work");
    }

    return gulp.src(["./wwwroot/app/services/auth.service.js"])
        .pipe(replace("auth0clientId", creds.Auth0Settings.ClientId))
        .pipe(replace("auth0domain", creds.Auth0Settings.Domain))
        .pipe(gulp.dest("wwwroot/app/services"));
});

gulp.task("compile-ts", function () {
    var sourcemaps = require("gulp-sourcemaps");

    var tsResult = tsProject.src(["./app/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./wwwroot/app"));
});

gulp.task("copyHtml", function () {
    gulp.src(["./index.html"], {cwd: "./app"}).pipe(gulp.dest("./wwwroot/"));
    return gulp.src(["./app/**/*.html"]).pipe(gulp.dest("./wwwroot/app/"));
});

gulp.task("copyCss", function () {
    return gulp.src(["./app/css/*.css"]).pipe(gulp.dest("./wwwroot/css"));
});

gulp.task("injectVendor", ["copyHtml"], function () {
    var inject = require("gulp-inject");
    
    var vendorStream = gulp.src(vendor)
        .pipe(gulp.dest("./wwwroot/vendor"));

    // copy only - do not inject
    gulp.src(copyOnly)
        .pipe(gulp.dest("./wwwroot/vendor"));

    return gulp.src("./wwwroot/index.html")
        .pipe(inject(vendorStream, { relative: true }))
        .pipe(gulp.dest("./wwwroot"));
});

gulp.task("servewatch", ["watch"], function () {
    var http = require("http");
    var connect = require("connect");
    var serveStatic = require("serve-static");
    var open = require("open");

    var port = 5000, app;
    var serveDir = __dirname + "/wwwroot";

    app = connect().use(serveStatic(serveDir));
    http.createServer(app).listen(port, function () {
        open("http://localhost:" + port);
    });

    console.log("serving", serveDir, "on", port);
});

 
gulp.task("ts-babel", function () {
    var babel = require("gulp-babel");
    var rename = require("gulp-rename");
    // Using my existing tsconfig.json file

    var tsProject = ts.createProject('./server/tsconfig.json');
 
    // The `base` part is needed so
    //  that `dest()` doesnt map folders correctly after rename
    return gulp.src(["server/**/*.ts", "!server/typings/**/*"], { base: "./" })
        .pipe(ts(tsProject))
        .pipe(babel({
            
        }, { cwd: 'server' }))
        .pipe(rename(function (path) {
            path.extname = ".js";
        }))
        .pipe(gulp.dest("."));
});