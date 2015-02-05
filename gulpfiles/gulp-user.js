var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var sourcemaps = require('gulp-sourcemaps');
// 合并 hbs 模版
gulp.task('templates-user', function(){
  gulp.src('js/user/templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('(function() { var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; templates[\'<%= getName(file.relative) %>\'] = template(<%= contents %>);})();', {}, {
            imports: {
                getName: function(filename) {
                    var path = require('path');
                    return path.basename(filename, path.extname(filename));
                }
            }
        }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('js/user'));
});

// 合并 js 模块
gulp.task('concat-user', function(){
	  gulp.src('js/user/modules/*.js')
        // .pipe(sourcemaps.init())
	    .pipe(concat('main.js'))
        // .pipe(sourcemaps.write())
	    .pipe(gulp.dest('js/user'));
	});

// 压缩
gulp.task('build-user',function(){
    gulp.src('js/user/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/user'));
});


gulp.task('watch-user',function() {
	gulp.watch('js/user/templates/*.hbs',['templates-user']);
	gulp.watch('js/user/modules/*.js',['concat-user']);

});
