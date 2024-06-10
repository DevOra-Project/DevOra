
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadURL('http://localhost:4200');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(
      url.format({
          pathname: path.join(__dirname, `/../../dist/dev-ora/browser/index.html`),
          protocol: 'file:',
          slashes: true
      })
  );

  win.webContents.openDevTools();

  win.on('closed', () => {
      win = null;
  });
}
/* function createWindow() {
  win = new BrowserWindow({ fullscreen: true });
} */