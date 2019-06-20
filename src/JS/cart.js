const { ipcRenderer } = require('electron');
const form = document.querySelector('form');
const path = require('path');
const fs = require('fs');
const ShoppingCartController = require('../JS/ShoppingCartController');
const shoppingCartController = new ShoppingCartController();
const ReceiptController = require('../JS/ReceiptController');
const receiptController = new ReceiptController();
form.addEventListener('submit', async event => {
    event.preventDefault();
    const cli = document.getElementById("cli").value;
    const dir = document.getElementById("dir").value;
    const tel = document.getElementById("tel").value;
    let uni = new Date();
    let unique = uni.valueOf();

    const head = {
    client: cli,
    direction: dir,
    phone: tel,
    unique: unique
    };
    
    const prods = await shoppingCartController.getAllProducts();
    const recibo = {
        head: head,
        prods: prods
    }

    await receiptController.saveReceipt(recibo);
    ipcRenderer.send('preview:pdf', recibo);
});