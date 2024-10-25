const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload script loaded');

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
    /*  openTerminal: (command) => ipcRenderer.invoke('open-terminal', command),
    onTerminalResponse: (callback) => ipcRenderer.on('terminal-response', (event, data) => callback(data))
 */

    //cookies
    /*   getCookies: () => ipcRenderer.invoke('get-cookies'),
        setCookie: (cookie) => ipcRenderer.send('set-cookie', cookie),
    */
    setCookie: (name, value) => ipcRenderer.send('set-cookie', { name, value }),
    getCookie: (name) => ipcRenderer.invoke('get-cookie', name),
    deleteCookie: (name) => ipcRenderer.send('delete-cookie', name),


    onLogMessage: (callback) => ipcRenderer.on('log-message', (event, message) => callback(message))
    
});
