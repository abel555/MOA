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
function chargeListInTable(woodsList){
    const tableBody = document.getElementById("table-body");
    for(i = 0; i < woodsList.length; i++) {
      
        if(woodsList[i].counter)
            continue;
        let content = `
        <tr class="dbl-click">
            <td class="clickable" onclick="showModal(${i})">${woodsList[i].idProduct}</td>
            <td id="dbl-menu" class="dbl-click">${woodsList[i].name_product}</td>
            <div id="${i}" class="dropdown-content">
                <a href="#">Editar</a>
                <a href="#" onclick="renderSaleW(${i})">Agregar a venta</a>
            </div>
            <td>${woodsList[i].provider}</td>
            <td>${woodsList[i].descriptionProduct}</td>
            <td>${woodsList[i].quantity}</td>
            <td>${woodsList[i].quantity_sold}</td>
            <td>${woodsList[i].purchase_price}</td>
            <td>${woodsList[i].sale_price}</td>
            <td>${woodsList[i].purchased_total}</td>
            <td>${woodsList[i].total_sold}</td>
            <td>${woodsList[i].reaminingAmount}</td>
        </tr>
        `;
        tableBody.insertAdjacentHTML('beforeEnd',content);
    }
}
const tp = document.getElementById("to-print");
tp.addEventListener('click', event => {
    ipcRenderer.send('print-to-pdf', product);
});