var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// vendor中保存了常用的js库，如jquery等，
// 执行gulp vendor，将js/vendor中的js合并压缩成vendor.js放入js目录下, 页面中引入vendor.js
// 实际使用中，根据自己的需求，修改即可
gulp.task('vendor',function(){
    gulp.src('js/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

