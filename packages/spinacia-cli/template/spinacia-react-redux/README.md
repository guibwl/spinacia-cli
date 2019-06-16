# Spinacia-react-redux

基于旧版本的React脚手架的升级版本，升级后的脚手架无论本地服务启动速度，打包后的文件大小、浏览器加载速度等都得到一定提升，同时你还可以使用 react 16 和 webpack 4 的新特性来进行开发；
 
**目录结构及开发方式尽量与旧版保持一致，多数文件直接进行copy即可**；

``react 16.x``  ``webpack 4.x``  ``react router 4.x``  ``redux 4.x``



## Install

``` bash
npx spinacia-cli
```
or

``` bash
npx spinacia-cli <folder name>
```

*[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, run ```npm i -g npm``` to update


在  ```spinacia-react-redux``` 或 ```<folder name>``` 文件夹中会自动初始化项目结构 (**主要看下src目录即可进行开发**)：

```bash
spinacia-react-redux            #npx 命令生成的文件夹
├── .babelrc                    #babel 配置文件
├── .editorconfig               #editorconfig 配置文件
├── .eslintignore               #eslint 检测忽略项
├── .eslintrc.js                #eslint 检测规则
├── .gitignore                  #git 忽略项
├── favicon.ico                 #ico
├── package.json                #package.json
├── postcss.config.js           #postcss 的配置文件
├── README.md
├── build                       #入口文件及webpack配置文件
│   ├── loading                 #首次内容渲染 loading
│   │   ├── loading.css
│   │   └── loading.html
│   ├── index.html              #入口html文件
│   ├── index.js                #入口js文件
│   ├── server.js               #开发环境 webpack 配置文件
│   └── webpack.config.js       #生产环境 webpack 配置文件
└── src                         #业务代码
    ├── components              #公用组件
    ├── config                  #配置项
    │   ├── router-core         #router4.x 核心配置文件(开发时不用修改该文件夹)
    │   ├── env.js              #环境配置
    │   ├── reducer.js          #root reducer
    │   └── route.js            #router4.x 路由配置
    ├── containers              #页面容器
    │   ├── App                 #首页面
    │   │   ├── action.js
    │   │   ├── constant.js
    │   │   ├── index.js
    │   │   ├── reducer.js
    │   │   └── style.less      #私有样式
    │   └── Main                #案例页面
    │         ├── action
    │         ├── components    #公用组件
    │         ├── connect
    │         ├── constants
    │         ├── reducers
    │         ├── index.js
    │         ├── SPINACIA.svg
    │         └── style.less    #私有样式
    ├── css                     #公有样式
    │   ├── common.less
    │   └── resets.less
    ├── utils                   #封装工具
    │   └── request.js          #请求
    └── index.jsx               #app入口文件
```

现在打开你的项目目录:

``` cd spinacia-react-redux ```

or

``` cd <folder name>```

## Start develop

``` npm start ```

打开链接:  http://localhost:3000/

## Start production

``` npm run build ```

项目将被打包到 ``dist`` 文件夹中；
所有打包文件名将带有 hashes ，无需担心首次发布后会有缓存问题；
脚手架采用 ``optimization.splitChunks`` 分离打包，优化加载性能！

## Features

#### 首次内容渲染 loading

如果说 SPA 首次加载过程分为以下3步：

* 空白的页面；
* 然后 html 和引用的 css 加载完毕，浏览器进行首次渲染，我们把首次渲染需要加载的资源体积称为 “首屏体积”；
* 然后 react、react-dom、业务js代码加载完毕，应用第一次渲染，或者说首次内容渲染；


旧版本中我们需要在第3步完成后渲染页面，在此之前页面都是空白的；我们其实可以在第2步加载完成时，做些什么；通过 webpack ```html-webpack-plugin``` 插件配置加载 loading。可以在第2步首屏体积(通常1-4kb)加载完成时渲染 loading ，在第3步js(通常100-1000kb)加载完成后将loding销毁进行首次内容渲染。以此达到减少白屏时间提升用户体验的目的。

[更多性能优化方案](https://juejin.im/entry/5b03afd351882542ac7d9291)

#### 分离打包，充分利用浏览器缓存

通过使用 ```optimization.splitChunks``` 将框架代码抽离为 ```vendors.[hash].js```, ```node_modules``` 依赖抽离为 ```dependencies.[hash].js```。因此若你这些代码没有修改，则build 后 hash（文件名）不变，浏览器加载时因文件名未变会直接从缓存读取文件，而不会从互联网重新下载，我们以此达到提高加载性能的目的；

#### 样式前缀自动补全

通常我们编写某些样式，为了兼容各类老版浏览器，我们必须这么写：

```css
::-webkit-input-placeholder {
  color: gray;
}
:-ms-input-placeholder {
  color: gray;
}
::-ms-input-placeholder {
  color: gray;
}
::placeholder {
  color: gray;
}
```

而在升级版脚手架你只需写默认样式，[Autoprefixed](https://github.com/postcss/autoprefixer) 插件会帮助你完成其余代码，

所以在升级版脚手架中这样编写，你无需考虑其他前缀：

```css
::placeholder {
  color: gray;
}
```


#### Eslnt in vscode

该脚手架使用了Eslnt来规范代码，若使用 vscode 来开发项目, 在安装了```eslint``` 插件后可以在编辑器设置中设置 ``` eslint.autoFixOnSave  ``` 为 ``true``, 这样在你保存代码时候，浏览器会帮你修复一些 ```eslint``` 检测出的错误；

###### 更多特性待补充。。。



