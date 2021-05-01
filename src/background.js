'use strict'

import { app, protocol, BrowserWindow, ipcMain, ipcRenderer, NativeImage, shell, Tray, Menu, Notification } from 'electron'
import { autoUpdater } from 'electron-updater'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { download } from './helper'

const isDevelopment = process.env.NODE_ENV !== 'production'
const {exec} = require('child_process')
const os = require('os')
var fs = require('fs');
const baseDir = os.homedir()+"/.inxanelauncher"

function makeDirIfNotExists(folder){
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
  }
}

for (const folder of [
  baseDir,
  baseDir+"/clients",
])
  makeDirIfNotExists(folder)

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])


let win;
async function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    minHeight: 600,
    minWidth: 900,
    frame: false,
    title: "Inxane",
    webSecurity: false,
    icon: "./public/icons/256.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  let tray = null
  app.whenReady().then(() => {
    tray = new Tray('./public/icons/256.png')
    var contextMenu = Menu.buildFromTemplate([
        { label: 'Open', click:  function(){
            win.show();
        } },
        { label: 'Home', click:  function(){
          win.show();
          win.webContents.send("router-push", {url: "/"})
        } },
        { label: 'Market', click:  function(){
          win.show();
          win.webContents.send("router-push", {url: "/market"})
        } },
        { label: 'Library', click:  function(){
          win.show();
          win.webContents.send("router-push", {url: "/library"})
        } },
        { label: 'Quit', 
        click:  function(){
            app.quit()
            app.exit();
        }, role: "close" }
    ]);
    tray.setToolTip('Inxane Launcher')
    tray.setContextMenu(contextMenu)
  })

  win.on('window-all-closed', function (event) {
      event.preventDefault();
      win.hide();
      event.returnValue = false;
  });
  
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  

  const onStdOut = function(data){
    const out = data.toString()
    for (const line of out.split("\n")){
      if (line.trim().startsWith('PROGRESS:')) {
        win.webContents.send("asynchronous-message", {
          action: "progress",
          progress: line.trim().replaceAll('PROGRESS:', '')
        })
      } else if (line.trim().startsWith('DW:')) {
        win.webContents.send("asynchronous-message", {
          action: "start-dw",
          text: line.trim().replaceAll('DW:', '')
        })
      } else if (line.trim() == 'DONE') {
        win.webContents.send("asynchronous-message", {
          action: "done"
        })
      }
    }
  }

  ipcMain.on('request-mainprocess-action', (event, arg) => {
    if (arg.action == 'exit') {
      win.hide()
    } else if (arg.action == 'maximize') {
      win.maximize()
    } else if (arg.action == 'minimize') {
      win.minimize()
    } else if (arg.action == 'install') {
      const directory = baseDir+"/clients/"+arg.id;
      makeDirIfNotExists(directory)
      fs.writeFile(directory+"/launcher.json", JSON.stringify({
        id: arg.id,
        launcher: "INXANELAUNCHER",
        name: arg.name,
        version: arg.version,
        userName: "InxaneUser",
        ram: "2G",
        installed: false
      }), function(){
        win.webContents.send("asynchronous-message", {
          action: "start-dw",
          text: "DOWNLOADING manager"
        })
        download(arg.image, directory+"/client.png", ()=>{})
        download(arg.download, directory+"/manager.jar", ()=>{
          win.webContents.send("asynchronous-message", {
            action: "done",
          })
          const child = exec("cd "+directory+" && java -jar manager.jar install", (error, stdout, stderr) => {});
          child.stdout.on("data", onStdOut)
        }, (current, end)=>{
          win.webContents.send("asynchronous-message", {
            action: "progress",
            progress: end/current*100
          })
        })
      })
    } else if (arg.action == 'launch') {
      const directory = baseDir+"/clients/"+arg.id;
      makeDirIfNotExists(directory)
      const child = exec("cd "+directory+" && java -jar manager.jar launch", (error, stdout, stderr) => {});
      child.stdout.on('data', onStdOut)
  }
  });
  

  autoUpdater.on('checking-for-update', () => {
    win.webContents.send("asynchronous-message", {action: "progress", progress: 100 })
    win.webContents.send("asynchronous-message", { action: "start-dw", text: "CHECKING FOR UPDATES" })
  });
  autoUpdater.on('update-available', info => {
    win.webContents.send("asynchronous-message", { action: "start-dw", text: "UPDATING" })
  });
  autoUpdater.on('update-not-available', info => {
    win.webContents.send("asynchronous-message", { action: "done" })
  });
  autoUpdater.on('error', err => {
    console.log(err)
    win.webContents.send("asynchronous-message", {action: "progress", progress: 100 })
    win.webContents.send("asynchronous-message", { action: "start-dw", text: `Error in auto-updater: ${err.toString()}` })
    if (err.errno === -2)
    win.webContents.send("asynchronous-message", { action: "done" })
  });
  autoUpdater.on('download-progress', progressObj => {

    win.webContents.send("asynchronous-message", { action: "start-dw", text: "DOWNLOADING: SPEED: "+progressObj.bytesPerSecond+" ("+progressObj.percent+"%)" })
    win.webContents.send("asynchronous-message", {action: "progress", progress: progressObj.percent })
  });
  autoUpdater.on('update-downloaded', info => {
    win.webContents.send("asynchronous-message", {action: "progress", progress: 100 })
    win.webContents.send("asynchronous-message", { action: "start-dw", text: "DOWNLOADED. INSTALLING NOW" })
  });
  
  autoUpdater.on('update-downloaded', info => {
    win.webContents.send("asynchronous-message", { action: "done" })
    autoUpdater.quitAndInstall();
  });
  
  autoUpdater.checkForUpdates();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
