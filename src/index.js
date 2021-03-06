const { app , BrowserWindow, Menu, ipcMain, dialog} = require('electron');

const url = require ('url'); 
const path = require ('path');

let fs = require('fs');

const os = require('os');
const electron = require('electron')
const shell = electron.shell;

const dbWoods = require ('./JS/DatabasesSingletons/WoodsDB');
const dbCalimnas = require ('./JS/DatabasesSingletons/CalaminasDB');
const dbIronmongery = require ('./JS/DatabasesSingletons/IronmongeryDB');
const dbReceipts = require ('./JS/DatabasesSingletons/ReceiptsDB');
const dbShoppingCart = require ('./JS/DatabasesSingletons/ShoppingCartDB');
const dbCurrentProduct = require ('./JS/DatabasesSingletons/CurrentProductDB');
const ProductsController = require("./JS/ProductsController");
const ShoppingCartController = require("./JS/ShoppingCartController");
const shoppingCartController = new ShoppingCartController();

function chargeCounterInDataBase() {
    dbWoods.insert({"flag":"counter","counter":"20","_id":"1"});
    dbCalimnas.insert({"flag":"counter","counter":"20","_id":"1"});
    dbIronmongery.insert({"flag":"counter","counter":"20","_id":"1"});
    dbReceipts.insert({"flag":"counter","counter":"20","_id":"1"});
    dbCurrentProduct.insert({"current":"wood","_id":"1"});
}

if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, "../node_modules/", '.bin', 'electron'),
    })
}

let mainWindow;
let newProductWindow;
let newClientInfoWindow;
let pdfWindow;
const jsonFilename = path.resolve(__dirname, '.', 'data', 'WOODS_DETAILS.json');

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    let defaultFileName = "Descarga"

    mainWindow.webContents.session.on('will-download', (event, downloadItem, webContents) => {

        var fileName = dialog.showSaveDialog({
          defaultPath: defaultFileName,
          filters: [
            { name: 'Excel', extensions: ['csv'] }]
        });
    
        if (typeof fileName == "undefined") {
          downloadItem.cancel()
        }
        else {
          downloadItem.setSavePath(fileName);
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

function createProductDownloadWindow(productType) {
    newProductDownloadWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: "Download wood in csv",
        webPreferences: {
            nodeIntegration: true,            
        }
    });

    newProductDownloadWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/product-csv-download.html'),
        protocol: 'file',
        slashes: true
    }))

    newProductDownloadWindow.webContents.on('did-finish-load', () => {
        newProductDownloadWindow.webContents.send('message', productType);
    });
    
    newProductDownloadWindow.on('closed', ()=> {
        newProductWindow = null;
    })
}


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

function createNewCalaminaWindow() {
    newProductWindow = new BrowserWindow({
        width: 700,
        height: 600,
        title: "Add A New Product",
        webPreferences: {
            nodeIntegration: true,
            
        }
    });

    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-calamina.html'),
        protocol: 'file',
        slashes: true
    }))
    
    newProductWindow.on('closed', ()=> {
        newProductWindow = null;
    })
}
function createNewSaleWindow(product) {
    newProductWindow = new BrowserWindow({
        width: 700,
        height: 600,
        title: "Confirmar Cantidad",
        webPreferences: {
            nodeIntegration: true,
        }
    });
    newProductWindow.webContents.on('did-finish-load', () => {
        newProductWindow.webContents.send('message', product);
    });

    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/newSale.html'),
        protocol: 'file',
        slashes: true
    }))

    newProductWindow.on('closed', ()=> {
        newProductWindow = null;
    })
}

function editWoodWindow(product) {
    newProductWindow = new BrowserWindow({
        width: 700,
        height: 600,
        title: "Editar producto",
        webPreferences: {
            nodeIntegration: true,
        }
    });

    newProductWindow.webContents.on('did-finish-load', () => {
        newProductWindow.webContents.send('message', product);
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

function createNewIronmongeryWindow() {
    newProductWindow = new BrowserWindow({
        width: 700,
        height: 600,
        title: "Add A New Product",
        webPreferences: {
            nodeIntegration: true,
            
        }
    });
   
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-ironmongery.html'),
        protocol: 'file',
        slashes: true
    }));
   
    newProductWindow.on('closed', ()=> {
        newProductWindow = null;
    })
    
}

function createNewNoWoodWindow(product){
    newProductWindow = new BrowserWindow({
        width: 700,
        height: 600,
        title: "Confirmar Cantidad",
        webPreferences: {
            nodeIntegration: true,
        }
    });
    newProductWindow.webContents.on('did-finish-load', () => {
        newProductWindow.webContents.send('message', product);
    });

    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/newOtherSale.html'),
        protocol: 'file',
        slashes: true
    }))

    newProductWindow.on('closed', ()=> {
        newProductWindow = null;
    })
}

function createHeadWindow(){
    newClientInfoWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Datos cliente",
        webPreferences: {
            nodeIntegration: true,
        }
    });

    newClientInfoWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/head-form.html'),
        protocol: 'file',
        slashes: true
    }))

    newClientInfoWindow.on('closed', ()=> {
        newClientInfoWindow = null;
    })
}

function createPreview(data){
    pdfWindow = new BrowserWindow({
        width: 1300,
        height: 720,
        title: "recibo",
        webPreferences: {
            nodeIntegration: true,
        }
    });

    pdfWindow.webContents.on('did-finish-load', () => {
        pdfWindow.webContents.send('message', data);
    });
    
    pdfWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/voucher.html'),
        protocol: 'file',
        slashes: true
    }))

    pdfWindow.on('closed', ()=> {
        pdfWindow = null;
    })
}

ipcMain.on('product:download',()=> {
    newProductDownloadWindow.close();
});

ipcMain.on('product:form',()=> {
    createNewProductWindow();
});
ipcMain.on('salesN:form',(e, newProduct)=> {
    createNewNoWoodWindow(newProduct);
});

ipcMain.on('sales:form',(e, newProduct)=> {
    createNewSaleWindow(newProduct);
});

ipcMain.on('calamina:form',()=> {
    createNewCalaminaWindow();
});

ipcMain.on('ironmongery:form',()=> {
    createNewIronmongeryWindow();
});

ipcMain.on('head:form', ()=>{
    createHeadWindow();
    newClientInfoWindow.reload();
});

ipcMain.on('product:new', (e, newProduct) => {
    mainWindow.reload();
    newProductWindow.close();
});

ipcMain.on('preview:pdf', (e, data) => {
    createPreview(data);
    if(newClientInfoWindow)
        newClientInfoWindow.close();
    shoppingCartController.clearAllShoppingCart();
    mainWindow.reload();
});

ipcMain.on('wood:edit',async (e, woodEdit)=> {
    await editWoodWindow(woodEdit);
});

ipcMain.on('wood:delete',async (e, productToDelete, typeOfProduct)=> {
    const productsController = new ProductsController();
    console.log(productToDelete);
    console.log(typeOfProduct);
    await productsController.deleteProduct(productToDelete, typeOfProduct);
    mainWindow.reload();
});

ipcMain.on('print-to-pdf', event => {
    const pdfPath = path.join(os.tmpdir(), 'Recibo-MOA.pdf');
    const win = BrowserWindow.fromWebContents(event.sender);
  
    win.webContents.printToPDF({}, (error, data) => {
      if (error) return console.log(error.message);
  
      fs.writeFile(pdfPath, data, err => {
        if (err) return console.log(err.message);
        shell.openExternal('file://' + pdfPath);
        event.sender.send('wrote-pdf', pdfPath);
      })
      
    })
});
const templateMainMenu = [
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
                label: 'Descargar Maderas',        
                async click(){                   
                   createProductDownloadWindow('wood');            
                }
            },
            {
                label: 'Descargar Ferreteria',        
                async click(){                   
                   createProductDownloadWindow('ironmongery');            
                }
            }, 
            {
                label: 'Descargar Calaminas',        
                async click(){                   
                   createProductDownloadWindow('calamina');            
                }
            }, 
            {
                label: 'Imprimir',        
                async click(){                   
                   ipc          
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