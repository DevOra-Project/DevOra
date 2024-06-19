const { ipcMain,app, BrowserWindow,dialog} = require('electron')
const url = require('url');
const path = require('path');
const fs = require('fs');  // Asegúrate de que fs está importado aquí

let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadURL(
    url.format({
      /*  pathname: path.join(__dirname, `/dist/dev-ora/browser/index.html`),
      protocol: "file:",
      slashes: true */
      pathname: 'localhost:4200',
      protocol: "http:",
      slashes: true


    })
  );
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  if (mainWindow === null) createWindow()
})


///////////////////////COMUNICATION LOGIC:

/* ipcMain.handle('read-directory', async (event, dirPath) => {
  return fs.promises.readdir(dirPath, { withFileTypes: true });
}); */



ipcMain.handle('read-directory', async (event, dirPath) => {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    // Obtener información adicional para cada entrada
    const entriesInfo = await Promise.all(entries.map(async entry => {
      const fullPath = path.join(dirPath, entry.name);
      const stats = await fs.promises.stat(fullPath);
      return {
        name: entry.name,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        size: stats.size,
        // Otras propiedades según sea necesario
      };
    }));
    return entriesInfo;
  } catch (error) {
    console.error('Error al leer el directorio:', error);
    throw error; // Propaga el error de vuelta al proceso de renderizado
  }
});


ipcMain.handle('read-file', async (event, filePath) => {
  return fs.promises.readFile(filePath, 'utf8');
});
