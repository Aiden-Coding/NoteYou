global.__dirname = __dirname;
global.__render_process_dir = __dirname + "/render_process";
console.log("当前地址：" + __dirname);
const path = require("path");
const isDev = require("electron-is-dev");
// require('electron-reload')(__dirname);
require("electron-reload")(path.join(__dirname, "electron"), {
  electron: path.join("node_modules", "src/electron"),
});
require(isDev ? "./src/electron/index.js" : "./main_process/index.js");
