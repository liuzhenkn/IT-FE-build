/**
 * @author liuzhenkun
 * @date 2017/12/25-下午1:41
 * @file gulpfile.js
 */

// gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
// gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
// gulp.dest(path[, options]) 处理完后文件生成路径
 
var gulp = require('gulp');
var babel = require("gulp-babel");
var browserSync = require('browser-sync').create();
var imageMin = require('gulp-imagemin');
var htmlMin = require('gulp-htmlmin');
var less = require('gulp-less');
var uglify = require('gulp-uglify');

var htmlSrc = 'src/*.html';
var jsSrc = 'src/js/*.js';
var styleSrc = 'src/style/*.less'; // 本地 style 文件路径
var imgSrc = 'src/img/*.{png,jpg,gif,ico}';

gulp.task('js', function () {
    gulp.src(jsSrc)
        .pipe(babel()) // es6 => es5
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('less', function () {
   gulp.src(styleSrc)
       .pipe(less())
       .pipe(gulp.dest('dist/style'))
       .pipe(browserSync.stream());
});

gulp.task('htmlMin', function () {
    var options = {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: false, // 压缩HTML
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
    };

    gulp.src('src/*.html')
        .pipe(htmlMin(options))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('imageMin', function () {
    gulp.src(imgSrc)
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('server', ['js', 'less', 'htmlMin', 'imageMin'], function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch(htmlSrc, ['htmlMin']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch(styleSrc, ['less']);
});

gulp.task('default',['server']); // 默认调用的任务列表