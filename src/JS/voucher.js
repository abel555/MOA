const ipc = require('electron').ipcRenderer;
const { ipcRenderer } = require('electron');

let product;
ipc.on('message', function(event, message){
    //console.log(message); // logs out "Hello second window!"
    product = message;
    
    console.log(product);
});
const { remote } = require('electron');
const { Menu, MenuItem } = remote;

const menu = new Menu();
menu.append(new MenuItem({
    label: 'Print',
    accelerator: 'CmdOrCtrl+P',
    click() { 
        console.log('time to print stuff');
        ipcRenderer.send('print-to-pdf', product);
    }
}));

const tp = document.getElementById("to-print");
tp.addEventListener('click', event => {
    ipcRenderer.send('print-to-pdf', product);
});