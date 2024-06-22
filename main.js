const { ipcMain,app, BrowserWindow,dialog} = require('electron')
const { exec, execSync } = require('child_process');

const url = require('url');
const path = require('path');
//const fs = require('fs');  // Asegúrate de que fs está importado aquí
const fs = require('fs-extra'); 
const os = require('os');




let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1400,
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

// Manejar la funcionalidad de clonado
ipcMain.on('clone-project', (event, projectPath, backupVersion) => {
  const sourcePath = projectPath;
  const backupPath = `${sourcePath} ${backupVersion}`;

  fs.copy(sourcePath, backupPath, err => {
    if (err) {
      console.error('Error al clonar el proyecto:', err);
      event.reply('clone-project-response', 'error');
    } else {
      console.log('Proyecto clonado exitosamente en:', backupPath);
      event.reply('clone-project-response', 'success');
    }
  });
});

// Manejar la funcionalidad de rollback
ipcMain.on('rollback-project', (event, projectPath, backupVersion) => {
  const backupPath = `${projectPath} ${backupVersion}`;

  fs.copy(backupPath, projectPath, { overwrite: true }, err => {
    if (err) {
      console.error('Error al realizar el rollback:', err);
      event.reply('rollback-project-response', 'error');
    } else {
      console.log('Rollback realizado exitosamente desde:', backupPath);
      event.reply('rollback-project-response', 'success');
    }
  });
});

// Manejar la selección de carpeta
ipcMain.on('select-folder', async (event) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  if (result.canceled) {
    event.reply('select-folder-response', null);
  } else {
    event.reply('select-folder-response', result.filePaths[0]);
  }
});


ipcMain.handle('get-current-directory', async (event) => {
  try {
    const currentDir = execSync('pwd').toString().trim();
    return currentDir;
  } catch (error) {
    return 'Error obtaining current directory';
  }
});


//eJECUTAR COMANDOS:
ipcMain.handle('execute-command', async (event, command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error: stderr || 'Unknown error' });
      } else {
        resolve({ output: stdout, error: stderr });
      }
    });
  });
});

/* ipcMain.handle('open-terminal', (event, command, directory) => {
  let terminalCommand;

  if (process.platform === 'win32') {
    terminalCommand = `start cmd.exe /K "cd /d ${directory} && ${command}"`;
  } else if (process.platform === 'darwin') {
    terminalCommand = `open -a Terminal ${directory} && ${command}`;
  } else {
    terminalCommand = `x-terminal-emulator -e "cd ${directory} && ${command}"`;
  }

  exec(terminalCommand, { cwd: directory }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      event.reply('terminal-response', `Error: ${stderr}`);
    } else {
      console.log(`Output: ${stdout}`);
      event.reply('terminal-response', `Output: ${stdout}`);
    }
  });
});
 */