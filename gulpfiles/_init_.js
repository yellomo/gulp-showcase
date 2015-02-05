// 输入 gulp inint --name app 会在views中创建一个 app.html
var gulp = require('gulp');
var template = require('gulp-template');
var rename = require("gulp-rename");
var minimist = require('minimist');

var concat = require('gulp-concat');
var handlebars = require('gulp-handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

var series = require('stream-series');

var wraper = "(function() { var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; templates[\\'<%= getName(file.relative) %>\\'] = template(<%= contents %>);})();";
// var wraper = "hello world";

var knownOptions = {
  string: 'name',
  default: { name: 'app' }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('_init-view',function(){
	if (options.name === "app") {
		console.log("create default view : app");
	} else {
		console.log("create view : " + options.name);
	}
	// 创建页面
    return gulp.src('views/base.html')
        .pipe(template({name:options.name}))
        .pipe(rename(options.name + ".html"))
        .pipe(gulp.dest('views'));
});
 
gulp.task('_init-js',function(){
    // 创建js模块
    console.log("create js module : " + options.name);
    return gulp.src('js/base/modules/base-init.js')
        .pipe(template())
        .pipe(rename(options.name + "-init.js"))
        .pipe(gulp.dest('js/'+options.name+"/modules"));
});

gulp.task('_init-template',function(){
    // 创建template模版
    console.log("create handlebars template : " + options.name);
    return gulp.src('js/base/templates/base-init.hbs')
        .pipe(template())
        .pipe(rename(options.name + "-init.hbs"))
        .pipe(gulp.dest('js/'+options.name+"/templates"));
});

gulp.task('_init-gulpfile',function(){

    // 创建gulp-[app].js 文件
    console.log("create gulp file : " + options.name);
    return gulp.src('gulpfiles/gulp-base.js')
        .pipe(template({name:options.name,wraper:wraper}))
        .pipe(rename("gulp-" + options.name + ".js"))
        .pipe(gulp.dest('gulpfiles'));

});

gulp.task('_merge-js',['_init-js'], function () {

    // 合并 js module 
    return gulp.src('js/'+options.name+'/modules/*.js')
        // .pipe(sourcemaps.init())
	    .pipe(concat('main.js'))
        // .pipe(sourcemaps.write())
	    .pipe(gulp.dest('js/'+options.name));


});

gulp.task('_merge-template',['_init-template'], function () {
	//合并 hbs 模版
	 return gulp.src('js/'+options.name+'/templates/*.hbs')
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
	    .pipe(gulp.dest('js/'+options.name));

});

// gulp.task('app-inject',['init-view','merge-js','merge-template'],function(){
// 	// var vendorStream = gulp.src(['./src/vendors/*.js'], {read: false});
//  	var target = gulp.src('./views/base.html');
// 	var cssStream = gulp.src(['./css/**/*.css'], {read: false},{relative: true});

// 	var jsStream = gulp.src(['./js/'+options.name+'/main.js'], {read: false},{relative: true});
// 	var templateStream = gulp.src(['./js/'+options.name+'/templates.js'], {read: false},{relative: true});
	 
//    return target
//    		.pipe(inject(series(cssStream, jsStream, templateStream))) 
//         .pipe(template({title:options.name}))
//         .pipe(rename(options.name + ".html"))
//         .pipe(gulp.dest('./views'));
// });

// 调用init task，
gulp.task('init',['_init-view','_init-gulpfile','_init-js','_merge-js','_init-template','_merge-template']);


