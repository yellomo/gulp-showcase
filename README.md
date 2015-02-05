# gulp-showcase
使用gulp来管理前端程序
***

#### 1.简介
***
###### 程序基本结构

静态文件的基本结构与我们经常使用的结构一样，在public目录下，包含css、js等文件

```
public:
  css:
  fonts:
  js:
    user:	
    	modules:
    		user-init.js
    		user-search.js
    		user-create.js
    		user-delete.js
    		user-edit.js
    	templates:
    		user-edit.hbs
    		user-list.hbs
    	main.js
    	templates.js
    	venfor.js
    vendor:
    	jquery.js
    	handlebars.runtime.js
    	helper.js
  views: 
	user.html
	product.html
```
为了方便管理和维护，设置一些基本的约定，以user为例。user包含基本的增删改查的功能。

在views中创建user.html的页面，
#### 3.使用gulp管理前端程序

######  安装nodejs 和 npm
######  在showcase中执行npm install 安装相关依赖
在showcase目录下，package.json定义了gulp运行的时需要的依赖,只需要执行

```
 npm install
```
就会安装进所需要的依赖，
安装依赖后，showcase目录中会多出一个node_modules 文件夹，```将node_modules 添加至svnignore 或 gitignore中```；node_modules里面包含了具体的node模块，无需关心。

######  新建gulpfiles.js
在showcase根目录下新建一个gulpfiles.js文件，```添加至svnignore 或 gitignore中```,
并引入init配置文件，

```
require('./gulpfiles/_init_');
```
init会根据showcase下的base 模版，生成相应的js、handlebars、view和gulpjs 文件，例如在新建一个user页面，那么在命令行输入

```shell
$ gulp init --name user
```

生成：

```
showcase:
  css:
  fonts:
  js:
    user:	
    	modules:
    		user-init.js			//create user-init.js
    	templates:
    		user-init.hbs			//create user-init.hbs
  views: 
	user.html						//create user.html
  gulpfiles:
  	gulp-user.js					//create gulp-user.js

```
不输入 ```--name user``` 会以默认的app为名称，生成上面的文件



######  引人gulp-[app].js 配置文件
每个页面的gulp 配置文件都放到gulpfiles目录下进行管理，例如上面user.html 的 gulp配置文件，就命名为gulp-app.js,
使用时，就在gulpfile.js中引入 gulp-user.js就可以了，

```js
require('./gulpfiles/gulp-user');
```

之后就可以运行 watch-user 命令，监控js和模版的编码，开发完成后，运行build-user，压缩js文件

```
$gulp watch-user   监控js和hbs模版
$gulp build-user   压缩js和模版
```



#### 4.相关阅读
minimist:parse argument options		https://github.com/substack/minimist;https://github.com/gulpjs/gulp/blob/master/docs/recipes/pass-arguments-from-cli.md

gulp-rename:		https://www.npmjs.com/package/gulp-rename

gulp-template:		https://www.npmjs.com/package/gulp-template

gulp synchronous-tasks: http://schickling.me/synchronous-tasks-gulp/

gulp inject:	https://www.npmjs.com/package/gulp-inject



