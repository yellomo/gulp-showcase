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


######   gulp-showcase
gulp-showcase 相比于上面的工程结构，多了```package.json、gulpfiles文件夹和 gulpfile.js文件```，
package.json定义了开发时所依赖模块，gulpfiles负责来管理每个页面工程的gulp-[app].js文件，
gulpfile.js文件 相当于gulp的main方法，当运行gulp命令时，就会加载gulpfile.js文件，并运行相应的命令。

gulp-showcase里包含了一个base模版工程，用来简化操作。加入了```init任务和vendor任务```，分别用来初始化新的页面工程和合并js库。

######   根据gulp-showcase的base模版，创建一个user页面工程
* 下载gulp-showcase工程。并安装开发所依赖的模块

```shell
 $ git clone git@github.com:yellomo/gulp-showcase.git gulp-user-example
 $ cd gulp-user-example/
 $ npm install
```

npm会将依赖都安装到node_modules 文件夹中，```将node_modules 添加至svnignore 或 gitignore中```,不加入版本控制，并且推荐去掉eclipse的js验证，否则每次build工程，验证js会花费很多时间。

在根目录下新建一个gulpfiles.js文件，因为gulpfiles.js主要是本地自己开发时使用，通常只加载当前开发页面的配置文件，所以推荐也加入```添加至svnignore 或 gitignore中```。


* 引入init配置文件，并创建user工程

```js
require('./gulpfiles/_init_');
```

init会根据showcase下的base 模版，生成相应的js、handlebars、view和gulpjs 文件，在命令行输入

```shell
$ gulp init --name user
```

将生成：

```
showcase:
  css:
  fonts:
  js:
    user:							// 在js文件夹中生存user模块
    	modules:
    		user-init.js			//生成 user-init.js
    	templates:
    		user-init.hbs			//生成 user-init.hbs
  views: 
	user.html						//创建 user.html
  gulpfiles:
  	gulp-user.js					//创建 gulp-user.js

```
不输入 ```--name user``` 会以默认的app为名称，生成上面的文件。

在浏览器中打开user.html，控制台输出了'"hello world"，就说明user页面工程创建成功了，


* 引人gulp-[app].js 配置文件，使用 watch-[app] 和 build-[app]

为了监控user页面工程中，js和handlebars模版的变化，需要使用watch-[app]的任务。

在gulpfile.js中引入gulp-user.js

```js
require('./gulpfiles/gulp-user');
```

运行watch-user

```shell
$ gulp watch-user
```

终端打印出

```
[02:49:28] Using gulpfile ~/.../gulpfile.js
[02:49:28] Starting 'watch-user'...
[02:49:28] Finished 'watch-user' after 7.89 ms
```

说明 watch-user 任务启动成功，这时新增，修改user模块下的modules和templates，watch-user就会监控变化，生成新的main.js 和 templates.js.

例如修改user－init.js --> console.log("hello-world,111");
修改 user-init.hbs --> <p>hello world,123</p>;

watch－user 会分别调用concat-user和templates-user两个子任务，生成新的js

```
[02:54:04] Starting 'concat-user'...
[02:54:04] Finished 'concat-user' after 9.07 ms
[02:54:19] Starting 'templates-user'...
[02:54:19] Finished 'templates-user' after 21 ms
```

刷新页面，控制台就会打印出 ： hello-world,111。


开发完成后，运行build-user，压缩js文件

```
$gulp watch-[app]   监控js和hbs模版
$gulp build-[app]   压缩js和模版
```



#### 4.相关阅读
* minimist:parse argument options		https://github.com/substack/minimist;https://github.com/gulpjs/gulp/blob/master/docs/recipes/pass-arguments-from-cli.md
* gulp-rename:		https://www.npmjs.com/package/gulp-rename
* gulp-template:		https://www.npmjs.com/package/gulp-template
* gulp synchronous-tasks: http://schickling.me/synchronous-tasks-gulp/
* gulp inject:	https://www.npmjs.com/package/gulp-inject
* handlebars: http://handlebarsjs.com
* gulp handlebars: https://github.com/lazd/gulp-handlebars/blob/master/README.md


