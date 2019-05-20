const { app , BrowserWindow, Menu, ipcMain} = require('electron');

const url = require ('url'); 
const path = require ('path');

let fs = require('fs');



if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, "../node_modules/", '.bin', 'electron'),
    })
}

let mainWindow;
let newProductWindow;

function getWoodListFromJsonFile() {
    let woodsJSON = fs.readFileSync('src/data/WOODS_DETAILS.json');
    let woodList = JSON.parse(woodsJSON);
    return woodList;
}

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            // nodeIntegrationInWorker: true,
            // nodeIntegrationInSubFrames: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMainMenu);
    Menu.setApplicationMenu (mainMenu);
    
    //Esta funcion sirve para que cuando cierre la ventana principal se cierre todo
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
            // nodeIntegrationInWorker: true,
            // nodeIntegrationInSubFrames: true
        }
    });
    //Para que la venta de nuevo producto no tenga la barra de las pestañas
    //No funciona en macOS
    newProductWindow.setMenu(null);
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
    let woodList = getWoodListFromJsonFile();

    woodList.push(newProduct);
    let newProductToJson = JSON.stringify(woodList, null, 2);
    
    fs.writeFile('src/data/WOODS_DETAILS.json', newProductToJson, 'utf8',finished);
    function finished(err) {
    }
    mainWindow.reload();
    newProductWindow.close();
});

const templateMainMenu = [
    isMac() ? {
        label: app.getName(),
        submenu: [
            {
                label: 'Copiar',
                role: 'Copy'
            }   
        ]
    } :[],

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
                accelerator: 'command+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
                accelerator: 'command+R'
            }
        ]
    })
}

module.exports = createNewProductWindow;