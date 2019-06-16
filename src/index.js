const { app , BrowserWindow, Menu, ipcMain} = require('electron');

const url = require ('url'); 
const path = require ('path');

let fs = require('fs');

let courrentProduct = "woods";

const os = require('os');
const electron = require('electron')
const shell = electron.shell;

const Datastore = require('nedb');


// const dbWoods = new Datastore({ filename: 'data/WOODS_DETAILS', autoload: true });
// const dbCalimnas = new Datastore({ filename: 'data/CALAMINAS_DETAILS', autoload: true });
// const dbIronmongery = new Datastore({ filename: 'data/IRONMONGERY_DETAILS', autoload: true });

function chargeCounterInDataBase() {
    dbWoods.insert({"flag":"counter","counter":"20","_id":"1"});
    dbCalimnas.insert({"flag":"counter","counter":"20","_id":"1"});
    dbIronmongery.insert({"flag":"counter","counter":"20","_id":"1"});
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
    }))

    newProductWindow.on('closed', ()=> {
        newProductWindow = null;
    })
}

ipcMain.on('product:form',()=> {
    createNewProductWindow();
});

ipcMain.on('calamina:form',()=> {
    createNewCalaminaWindow();
});

ipcMain.on('ironmongery:form',()=> {
    createNewIronmongeryWindow();
});

ipcMain.on('product:new', (e, newProduct) => {
    mainWindow.reload();
    newProductWindow.close();
});
ipcMain.on('print-to-pdf', event => {
    const pdfPath = path.join(os.tmpdir(), 'some-ducking-pdf.pdf');
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

// chargeCounterInDataBase();


const ProductsController = require('./JS/ProductsController');

const productsController = new ProductsController();
const productsController2 = new ProductsController();
const productsController3 = new ProductsController();
const productsController4 = new ProductsController();

const product = {
    descriptionProduct: "zxcas asd",
    quantity: "22",
    sale_price: "4532"
};

async function obtenerCalaminas() {
  console.log(await productsController.getAllProducts("wood"));
}

async function obtenerCalaminas2() {
    console.log(await productsController2.getAllProducts("wood"));
}
 
async function obtenerCalaminas3() {
    console.log(await productsController3.getAllProducts("wood"));
}

async function obtenerCalaminas4() {
    console.log(await productsController4.getAllProducts("wood"));
}

obtenerCalaminas();
obtenerCalaminas2();
obtenerCalaminas3();
obtenerCalaminas4();