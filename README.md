# gulp-showcase
使用gulp来管理前端程序

#### 1.简介
***
###### 程序基本结构

静态文件的基本结构与我们经常使用的结构一样，在public目录下，包含css、js等文件

```
public:
  css:
  fonts:
  js:
    user.js	
  views: 
	  user.html
```
为了方便管理和维护，设置一些基本的约定，

在js中创建一个vendor文件夹，包含jquery，handlebars等通用的js库，页面自己的js文件，也按照不同的功能，分割成不同的js文件放入到相应的文件夹中管理起来。


以user为例。user包含基本的增删改查的功能。并且有大量的动态模版。按照约定整理的目录结构就变成

```
public:
  css:
  fonts:
  js:
    user:                     -- user.html 对应的js程序目录
      modules:                -- user js模块目录，按照功能，将js分成不同的文件，管理起来
        user-init.js
        user-search.js
        user-create.js
        user-delete.js
        user-edit.js
      templates:              -- user template 目录，
        user-edit.hbs
        user-list.hbs
      main.js                 -- 将user module 中的js，合并成 main.js
      templates.js            -- 对js模版 预编译，合并成templates.js
    vendor:                   -- js类库，
      jquery.js
      handlebars.runtime.js
      helper.js
    vendor.js                 -- 合并vendor 目录下的js库
  views: 
  user.html                   -- user.html 依此引入vendor.js, tempalte.js, main.js
```
下面的小节，展示如何用gulp来创建和管理，如上约定的程序。
#### 3.使用gulp管理前端程序

######  安装nodejs 和 npm
参照文档安装nodejs和npm

nodejs:http://nodejs.org/

npm:https://www.npmjs.com/

安装完成之后，执行如下命令，在全局安装gulp

```shell
$ npm install gulp -g
```


######  下载 gulp-showcase
gulp-showcase 相比于上面的工程结构，多了package.json、gulpfiles文件夹和 gulpfile.js文件，
package.json定义了开发时所依赖模块，gulpfiles负责来管理每个页面工程的gulp-[app].js文件，
gulpfile.js文件 相当于gulp的main方法，当运行gulp命令时，就会加载gulpfile.js文件，并运行相应的命令。

gulp-showcase里包含了一个base模版工程，用来简化操作。
在showcase目录下,只需要执行

```shell
 $ npm install
```

就会将依赖，都安装到node_modules 文件夹中，```将node_modules 添加至svnignore 或 gitignore中```；不加入版本控制，并且推荐去掉eclipse的js验证，否则每次build工程，验证js会花费很多时间。

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



