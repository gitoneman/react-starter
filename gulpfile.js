var gulp = require("gulp");
var uglify = require("gulp-uglify");
var minifycss = require("gulp-minify-css");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var livereload = require("gulp-livereload");
var base64 = require("gulp-base64");
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

//合并压缩一些js库
gulp.task('vendor', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/toastr/toastr.js',
        'node_modules/socket.io-client/socket.io.js',
        'node_modules/echarts/build/source/echarts-all.js'
    ]).pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

//转化scss到css
gulp.task('sass', function () {
    gulp.src('app/stylesheets/index.scss')
        .pipe(sass("index.css").on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/css/'))
        .pipe(livereload());
});

//转化scss到css并压缩
gulp.task('sass:min', function () {
    gulp.src('app/stylesheets/index.scss')
        .pipe(sass("index.css").on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifycss())
        .pipe(gulp.dest('public/css/'))
        .pipe(livereload());
});

//监视scss文件，有变动就编译
gulp.task('sass:watch', function () {
    gulp.watch('app/stylesheets/index.scss', ['sass']);
});

//合并js文件
gulp.task('browserify', function() {
    return browserify('app/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/js'));  
});

//监视js文件，有变动就合并
gulp.task('browserify-watch', function() {
    var bundler = watchify(browserify('app/app.js', watchify.args));
    bundler.transform(babelify);
    bundler.on('update', rebundle);
    return rebundle();

    function rebundle() {
        var start = Date.now();
        return bundler.bundle()
            .on('error', function(err) {
                gutil.log(gutil.colors.red(err.toString()));
            })
            .on('end', function() {
                gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('public/js/'))
            .pipe(livereload());
    }
});

//gulp监听任务，任何js或css改变时执行
gulp.task("watch",function(){	
	livereload.listen();
})

gulp.task('dev',["browserify-watch","watch","sass:watch","sass","vendor"]);
gulp.task("build",["vendor","sass:min","browserify"]);