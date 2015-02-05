var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var sourcemaps = require('gulp-sourcemaps');
// 合并 hbs 模版
gulp.task('templates-<%= name %>', function(){
  gulp.src('js/<%= name %>/templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('<%= wraper %>', {}, {
            imports: {
                getName: function(filename) {
                    var path = require('path');
                    return path.basename(filename, path.extname(filename));
                }
            }
        }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('js/<%= name %>'));
});

// 合并 js 模块
gulp.task('concat-<%= name %>', function(){
	  gulp.src('js/<%= name %>/modules/*.js')
        // .pipe(sourcemaps.init())
	    .pipe(concat('main.js'))
        // .pipe(sourcemaps.write())
	    .pipe(gulp.dest('js/<%= name %>'));
	});

// 压缩
gulp.task('build-<%= name %>',function(){
    gulp.src('js/<%= name %>/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/<%= name %>'));
});


gulp.task('watch-<%= name %>',function() {
	gulp.watch('js/<%= name %>/templates/*.hbs',['templates-<%= name %>']);
	gulp.watch('js/<%= name %>/modules/*.js',['concat-<%= name %>']);

});
