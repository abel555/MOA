const { ipcRenderer } = require('electron');
const form = document.querySelector('form');

form.addEventListener('submit', event => {
    
    event.preventDefault();
    
    const nameProduct = document.querySelector('#name').value;
    const priceProduct = document.querySelector('#price').value;
    const descProduct = document.querySelector('#description').value;
    
    const newProduct = {
        id: 0,
        name: nameProduct,
        type: descProduct,
        quantity: -1,
        sale_price: priceProduct,
        purchase_price: 10,
    };
    
    ipcRenderer.send('product:new', newProduct);
});

