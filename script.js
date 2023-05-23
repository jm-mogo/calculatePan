//inputsPan
const inputPanName = document.getElementById('pan-name');
const inputQuantity = document.getElementById("quantity");
const inputDiscount = document.getElementById('discount-percentage');

//inputsClientInfo 
const clientsName = document.getElementById('client-name');
const phoneNumber = document.getElementById('phone');
const clientsAddress =document.getElementById('address');

//buttons 
const btnAddClient = document.getElementById("add-client-info") 
const btnAddItem = document.getElementById("btn-add-item");

//Dom manipulation
const itemsTable = document.getElementById("items-table");
const totalTable = document.getElementById("total-table-result");
const clientInfoBill = document.getElementById("bill-client-info");
const billDate = document.getElementById('bill-date');

//Factory function to create pan types
const pan = (name, price, id) => {
    let quantity = 0;
    const getTotal = () => (quantity * price).toFixed(2);    
    const setQuantity = (newQuantity) => quantity = newQuantity; 
    const getQuantity = () => quantity;
    const getId = () => id;
    return { name, price, getTotal, setQuantity, getQuantity, getId};
};

//Creating different pan types
const blanco = pan('blanco', 1.52, 100);
const mantequilla = pan('mantequilla', 2.00, 101);
const integral = pan('integral', 1.70, 102);
const avena = pan('avena', 1.70, 103);
const chia = pan('chia y linaza', 1.70, 104);
const pasas = pan('pasas', 2.00, 105);

const availableItems = {
    'blanco': blanco,
    'mantequilla': mantequilla,
    'integral': integral,
    'avena' : avena,
    'chia': chia,
    'pasas': pasas
}
const addedItems = [];

function addItems() {
    if (!checkInputs()) {
        return
    }
    if (!checkItemInList(inputPanName.value)) {
        addedItems.push(availableItems[inputPanName.value]);
    }

    availableItems[inputPanName.value].setQuantity(inputQuantity.value)
    let subTotal = (calculateSubTotal(addedItems)).toFixed(2);
    let discountPercentage = getDiscount()
    discountPercentage = calculateIva(subTotal, discountPercentage)
    let total = (subTotal - discountPercentage).toFixed(2)
    displayTotal(subTotal, discountPercentage, total)
    displayItems()
}

function getDiscount() {
    if (inputDiscount.value === "") {
        return 0;
    }
    return inputDiscount.value;
}

function calculateIva(subTotal, discount) {
    return Number(((subTotal * discount) / 100).toFixed(2));
}

function checkItemInList(item) {
    if (addedItems.length === 0) {
        return false
    }
    let count = 0
    addedItems.forEach(pan =>  {
        if (pan.name === item) {
            count++ 
            return
        }
    })
    return (count === 0) ? false : true;
}

function displayTotal(subTotal, iva, total) {
    totalTable.innerHTML = `
                <tr>
                    <th class="number-table" scope="row">SubTotal:</td>
                    <td class="number-table">$${subTotal}</td>
                </tr>
                <tr class="negative">
                    <th class="number-table" scope="row">Descuento (${inputDiscount.value}%):</td>
                    <td class="number-table">- $${iva}</td>
                </tr>
                <tr>
                    <th class="number-table total-total" scope="row" >TOTAL:</td>
                    <td class="number-table total-total">$${total}</td>
                </tr>`;
}


function displayItems() {
    itemsTable.innerHTML = '';
    let items = []
    let firstRow = document.createElement('tr');
    firstRow.innerHTML = `<th scope="col">Item</th>
                        <th scope="col">Cod.</th>
                        <th scope="col">Descripción</th>
                        <th scope="col" class="number-table">Cantidad</th>
                        <th scope="col" class="number-table">Precio unitario</th>
                        <th scope="col" class="number-table">Total Item</th>`

    items.push(firstRow);

    for (let i = 0; i < addedItems.length; i++) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${i + 1}</td>
                            <td >${addedItems[i].getId()}</td>
                            <td scope="row">Pan ${addedItems[i].name}</td>
                            <td class="number-table">${addedItems[i].getQuantity()}</td>
                            <td class="number-table">$${(addedItems[i].price).toFixed(2)}</td>
                            <td class="number-table">$${addedItems[i].getTotal()}</td>`
        items.push(newRow)
    }
    items.forEach(item => {
        itemsTable.appendChild(item);
    });
    inputQuantity.value = ''
}

function displayClientInfo() {
billDate.textContent = getToday()
clientInfoBill.innerHTML = `
                <h4>Cliente:</h4>
                <h3>${clientsName.value}</h3>
                <p>${clientsAddress.value}</p>`
}

function calculateSubTotal(items) {
    let allPrices = 0;
    items.forEach((value) => {
        allPrices += Number(value.getTotal());
    });
    return allPrices;
}

function checkInputs() {
    if (inputQuantity.value.length === 0 || isNaN(inputQuantity.value)) {
        return false;
    }
    if (inputQuantity.value <= 0) {
        return false;
    }

    return true;
}

btnAddClient.addEventListener("click", displayClientInfo)
btnAddItem.addEventListener("click", addItems);

//print

const printBtn = document.getElementById('btn-print');
const printDiv = document.getElementById('print')

function printF() {
    let printWindow = window.open('', '', 'width=800, height=500, toolbar=0, scrollbars=0, status=0');
    printWindow.document.write( "<link rel=\"stylesheet\" href=\"reset.css\" type=\"text/css\" media=\"all\"/>" );
    printWindow.document.write( "<link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\" media=\"all\"/>" );
    printWindow.document.write( "<meta charset=\"UTF-8\">" );
    printWindow.document.write( "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"></meta>" );
    printWindow.document.write(printDiv.innerHTML);
    
    printWindow.focus();
    setTimeout(function(){printWindow.print();},1500);
    printWindow.document.close();
}

printBtn.addEventListener('click', printF)

//Date 
function getToday() {
    const today = new Date();
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    return `${day} de ${monthNames[month]} de ${year}`;
}