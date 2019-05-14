const { app , BrowserWindow, Menu, ipcMain} = require('electron');

const url = require ('url'); 
const path = require ('path');

if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, "../node_modules/", '.bin', 'electron'),
    })
}

let mainWindow;
let newProductWindow;

//Cuando se abre la app, ventana principal
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
        width: 400,
        height: 330,
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

ipcMain.on('product:new', (e, newProduct) => {
    mainWindow.webContents.send('product:new', newProduct);
    newProductWindow.close();
});

const templateMainMenu = [
    (process.platform === 'darwin' ? {
        ///Este label es obligatorio en macOS X, sin este como primero los demas se desordenan
        
        label: app.getName(),
        
        submenu: [
            {
                label: 'Option',
            }   
        ]
    } :[]),

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
            
            // {
            //     label: 'Remover todos los productos',
            //     accelerator: 'Ctrl+A',
            //     click() {
            //         mainWindow.webContents.send('products:remove-all');
            //     }
            // },
            {
                label: "Salir",
                //Si darwin (darwin es para macos X)
                accelerator: process.platform === 'darwin' ? 'command+Q' : "Ctrl+Q",
                click() {
                    app.quit();
                }
            },
            
        ]
    },
    
    // {
    //     label: "Edit",
    //     submenu: [
            
    //     ]
    // },
    //Esta pestaña no funcionara en macOS X porque no acepta labels sin submenus
    // {
    //     label: "Salir",
    //     //Si darwin (darwin es para macos X)
    //     submenu:[
    //         {
    //             label: "Cerrar aplicación",
    //             //Si darwin (darwin es para macos X)
    //             accelerator: process.platform === 'darwin' ? 'command+Q' : "Ctrl+Q",
    //             click() {
    //                 app.quit();
    //             }
    //         },
    //     ]
    // },
];


// Esta funcion agrega el primer label el nombre de la app en sistemas macOS
// if(isMac()) {
//     templateMainMenu.unshift({
//         label: app.getName(),
//         submenu: [
//             {
//                 label: 'Option',
//             }   
//         ]
//     });
// }

// function isMac() {
//     return process.platform === 'darwin';
// }
// process.env.NODE_ENV === 'production'
if (true) {
    templateMainMenu.push ({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/hide Dev Tools like a inspector of chrome',
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