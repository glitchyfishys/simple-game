const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700
    });

    mainWindow.setTitle('Simple Game');
    mainWindow.setIcon('icon.png');
    mainWindow.setResizable(true);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.removeMenu();
    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})