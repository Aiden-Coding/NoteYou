# start project
```
npm install dva-cli -g
dva new NoteYou
```
## 安装插件
### antd
```
npm install antd babel-plugin-import --save -D
编辑 .webpackrc，使 babel-plugin-import 插件生效。
{
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
```
### 使用浏览器history
```
npm i history -D
入口index.js文件修改
import {createBrowserHistory as createHistory} from "history"
const app =dva({history:createHistory()});
```
### font-awesome
```
npm i font-awesome -D
```
### react-fontawesome
```
npm i react-fontawesome -D
```
### electron
```
npm i electron -D
```
### electron-reload 热更新
```
npm i electron-reload -D
```
### 安装electron-is-dev库，判断是否是开发环境
```
npm i electron-is-dev -D
```
### electron-updater 更新
```
npm i electron-updater -D
```
### cross-env控制系统不开启浏览器中
```
  npm i cross-env -D
  "dev": "cross-env COMPRESS=none roadhog build --watch"
```
### 打包工具
```
npm i electron-builder -D
```
### concurrently同步
```
npm i concurrently -D
```
### wait-on等待命令运行完
```
npm i wait-on -D
//package.json中将script的dev改成
     "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"npm start\""
```
