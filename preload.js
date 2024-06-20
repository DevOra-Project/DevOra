const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    readDirectory: (dirPath) => ipcRenderer.invoke('read-directory', dirPath),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),

    //Clonar Proyectos
    cloneProject: (projectPath, backupVersion) => ipcRenderer.send('clone-project', projectPath, backupVersion),
    rollbackProject: (projectPath, backupVersion) => ipcRenderer.send('rollback-project', projectPath, backupVersion),
    selectFolder: () => ipcRenderer.send('select-folder'),
    onCloneProjectResponse: (callback) => ipcRenderer.on('clone-project-response', callback),
    onRollbackProjectResponse: (callback) => ipcRenderer.on('rollback-project-response', callback),
    onSelectFolderResponse: (callback) => ipcRenderer.on('select-folder-response', callback),

    getCurrentDirectory: () => ipcRenderer.invoke('get-current-directory'),
    //EJECUTRAR COMANDOS:
    executeCommand: (command) => ipcRenderer.invoke('execute-command', command),

});
