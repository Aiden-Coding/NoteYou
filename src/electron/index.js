const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
// 引入自动更新模块
const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');
let mainWindow = null;
//判断命令行脚本的第二参数是否含--debug
const debug = /--debug/.test(process.argv[2]);
function makeSingleInstance() {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}
function createWindow() {
    const windowOptions = {
        width: 800,
        height: 600,
        transparent: true, //圆角窗口
        titleBarStyle: 'hidden',
        webPreferences: {
            webSecurity: true,
            nodeIntegration: true, // 是指在render process(渲染线程)中可以使用nodeNodejs
            // preload: path.join(__dirname, 'preload.js') /**String (可选) -在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径。 当 node integration 关闭时, 预加载的脚本将从全局范围重新引入node的全局引用标志 */
        },
        // icon: path.join(__dirname, '../assets/logo192.png')
    };
    if (process.platform === 'darwin') {
      // app.dock.setIcon(path.join(__dirname, '../assets/logo.png'));
    }
    mainWindow = new BrowserWindow(windowOptions);
    console.log(global.__dirname)
    console.log(global.__render_process_dir)
    mainWindow.loadURL(
        // isDev ? 'http://localhost:8000' : `file://${path.join(global.__dirname, global.__render_process_dir,'/index.html')}`
        // `file://${path.join(global.__dirname, global.__render_process_dir,'/index.html')}`
        `file://${path.join(global.__dirname,'/render_process/index.html')}`
        // `file://${path.join(global.__dirname, '/render_process/index.html')}`
    );
    // mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
    //接收渲染进程的信息
    const ipc = require('electron').ipcMain;
    ipc.on('min', function () {
        mainWindow.minimize();
    });
    ipc.on('max', function () {
        mainWindow.maximize();
    });
    ipc.on('login', function () {
        mainWindow.maximize();
    });
    //如果是--debug 打开开发者工具，窗口最大化，
    if (debug) {
        mainWindow.webContents.openDevTools();
        // require('devtron').install();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
makeSingleInstance();
//app主进程的事件和方法
app.on('ready', () => {
    createWindow();
    if (isDev) {
      console.log("当前地址+1："+__dirname)
        autoUpdater.updateConfigPath = path.join(global.__dirname, 'dev-app-update.yml');
    }
    autoUpdater.autoDownload = false
    // autoUpdater.checkForUpdatesAndNotify()

    // autoUpdater.checkForUpdates();
    autoUpdater.on('error', error => {
        dialog.showErrorBox('Error: ', error == null ? 'unknown' : error);
    });
    autoUpdater.on('update-available', () => {
        dialog
            .showMessageBox({
                type: 'info',
                title: '应用有新的版本',
                message: '发现新版本，是否现在更想？',
                buttons: ['是', '否'],
            })
            .then(buttonIndex => {
                console.log(buttonIndex)
                // let i = buttonIndex
                if (buttonIndex.response === 0) {
                    // console.log("正在下载。。。")
                    autoUpdater.downloadUpdate();
                }
            });
    });
    autoUpdater.on('update-not-available', () => {
        dialog.showMessageBox({
            type: 'info',
            title: '没有新版本',
            message: '当前已经是最新版本',
        });
    });
    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
        // sendUpdateMessage('downloadProgress', progressObj);
        // console.log(progressObj);
        let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
        log_message = log_message + '- Downloaded ' + progressObj.percent + '%';
        log_message = log_message + '(' + progressObj.transferred + '/' + progressObj.total + ')';
        console.log(log_message);
    });
    // 更新下载完成事件
    autoUpdater.on('update-downloaded', function (
        event,
        releaseNotes,
        releaseName,
        releaseDate,
        updateUrl,
        quitAndUpdate
    ) {
      console.log("下在完成");
        // sendUpdateMessage('isUpdateNow');
        // ipcMain.on('updateNow', (e, arg) => {
        // autoUpdater.quitAndInstall();
        // });
        dialog
            .showMessageBox({
                title: '安装更新',
                message: '更新下载完毕，应用将重启并进行安装',
            })
            .then(() => {
                setImmediate(() => autoUpdater.quitAndInstall());
            });
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
module.exports = mainWindow;
