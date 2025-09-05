const path = require('path');
const { app, BrowserWindow, Menu} = require('electron');
const { subscribe } = require('diagnostics_channel');
const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';


// Create the main window
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Planner', 
        // Dev tools are of a width of 500 
        width: isDev ? 1000 :500, 
        height: 600
    });

    // open devtools if in dev env
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }


    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}


// App is ready
app.whenReady().then(() =>{
    createMainWindow();

    // implement menu 
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

}); 

// menu template
const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: 'About'
            }
        ]
    }] : []),
    {
        role: 'fileMenu'
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [{
            label: 'About'
        }]
    }] : [])
];

// const menu = [
//     {
//         label: 'File',
//         submenu: [
//             {
//                 label: 'Quit',
//                 click: () => app.quit(),
//                 accelerator: 'CmdOrCtrl+W'
//             }
//         ]
//     }
// ];


app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})