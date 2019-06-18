const currentProductCon2 = new CurrentProductController();

function showSalesTable(){
    woodTable.style.display = 'none';
    saleTable.style.display = 'block';
    receiptTable.style.display = 'none';
}

function showReceiptTable(){
    woodTable.style.display = 'none';
    saleTable.style.display = 'none';
    receiptTable.style.display = 'block';
}
function showProductsTable(){
    woodTable.style.display = 'block';
    saleTable.style.display = 'none';
    receiptTable.style.display = 'none';
}

async function loadTableFromCurrentProduct() {
    let currentProduct = await currentProductCon2.getCurrentProduct();
    switch (currentProduct) {
        case 'receipt':
            showReceiptTable();
            break;
        case 'shoppingCart':
            showSalesTable();
            break;
        default:
            showProductsTable();
            break;
    }
}

loadTableFromCurrentProduct();