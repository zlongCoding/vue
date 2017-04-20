var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
 
gulp.task('img', function(){
    gulp.src('dist/static/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))

});
gulp.task('css', function () {
// 1. 找到文件
gulp.src('dist/static/css/*.css')
// 2. 压缩文件
.pipe(minifyCSS())
// 3. 另存为压缩文件
.pipe(gulp.dest('dist/css'))
})
gulp.task('build',['css','img']);