const { app , BrowserWindow, Menu, ipcMain} = require('electron');

const url = require ('url'); 
const path = require ('path');

let fs = require('fs');

const Datastore = require('nedb');

const dbWoods = new Datastore({ filename: 'data/WOODS_DETAILS', autoload: true });
const dbCalimnas = new Datastore({ filename: 'data/CALAMINAS_DETAILS', autoload: true });
const dbIronmongery = new Datastore({ filename: 'data/IRONMONGERY_DETAILS', autoload: true });

function chargeCounterInDataBase() {
    dbWoods.insert({"flag":"counter","counter":"2","_id":"1"});
    dbCalimnas.insert({"flag":"counter","counter":"2","_id":"1"});
    dbIronmongery.insert({"flag":"counter","counter":"2","_id":"1"});
}

if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, "../node_modules/", '.bin', 'electron'),
    })
}

let mainWindow;
let newProductWindow;
const jsonFilename = path.resolve(__dirname, '.', 'data', 'WOODS_DETAILS.json');

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMainMenu);
    Menu.setApplicationMenu (mainMenu);
    
    mainWindow.on('closed', () => {
        app.quit();
    })

});

function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 700,
        height: 600,
        title: "Add A New Product",
        webPreferences: {
            nodeIntegration: true,
            
        }
    });

    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))

    newProductWindow.on('closed', ()=> {
        newProductWindow = null;
    })

}

ipcMain.on('product:form',()=> {
    createNewProductWindow();
});

ipcMain.on('product:new', (e, newProduct) => {
    mainWindow.reload();
    newProductWindow.close();
});

const templateMainMenu = [
    // isMac() ? {
    //     label: app.getName(),
    //     submenu: [
    //         {
    //             label: 'Copiar',
    //             role: 'Copy'
    //         }   
    //     ]
    // } :[{
    //     label: 'Archivo',
    //     submenu: [
    //         {
    //             label: 'Nueva madera',
    //             accelerator: 'Ctrl+N',
    //             click(){
    //                 createNewProductWindow();
    //             }
    //         },
    //         {
    //             label: "Salir",
    //             role: 'Quit'
    //         },
    //     ]
    // },],

    
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Nueva madera',
                accelerator: 'Ctrl+N',
                click(){
                    createNewProductWindow();
                }
            },
            {
                label: "Salir",
                role: 'Quit'
            },
        ]
    },
    {
        label: 'Editar',
        submenu: [
            {
                label: 'Deshacer',
                role: 'Undo'
            },
            {
                label: "Rehacer",
                role: 'Redo'
            },
            {
                type: 'separator'
            },
            {
                label: "Cortar",
                role: 'Cut'
            },
            {
                label: "Copiar",
                role: 'Copy'
            },
            {
                label: "Pegar",
                role: 'Paste'
            },
            {
                label: "Pegar con el mismo estilo",
                role: 'pasteAndMatchStyle'
            },
            {
                label: "Borrar",
                role: 'Delete'
            },
            {
                label: "Seleccionar todo",
                role: 'selectAll'
            },
        ]
    },

    {
        label: 'Ver',
        submenu: [
            {
                label: 'Tamaño real',
                role: 'resetZoom'
            },
            {
                label: "Acercar",
                role: 'zoomIn'
            },
            {
                label: "Alejar",
                role: 'zoomOut'
            },
        ]
    },
];

function isMac() {
    return process.platform === 'darwin';
}
function isInProduction() {
    return process.env.NODE_ENV === 'production';
}

if (!isInProduction()) {
    templateMainMenu.push ({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/hide Dev Tools like a inspector of chrome',
                accelerator: 'ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
                accelerator: 'ctrl+R'
            }
        ]
    })
}

chargeCounterInDataBase();
module.exports = createNewProductWindow;