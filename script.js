//inputsPan
const inputName = document.getElementById('panName');
const inputQuantity = document.getElementById("quantity");
const inputDiscount = document.getElementById('discount-percentage');

//inputsClientInfo 
const clientsName = document.getElementById('client-name');
const phoneNumber = document.getElementById('phone');
const clientsAddress =document.getElementById('address');

//buttons 
const btnAddItem = document.getElementById("btn-add-item");
const btnAddClient = document.getElementById("add-client-info") 

//Dom manipulation
const itemsTable = document.getElementById("items-table");
const totalTable = document.getElementById("total-table");
const clientInfoTable = document.getElementById("client-info-table");

//Factory function to create pan types
const pan = (name, price) => {
    let quantity = 0;

    const getTotal = () => (quantity * price).toFixed(2);    
    const setQuantity = (newQuantity) => quantity = newQuantity; 
    const getQuantity = () => quantity;

    return { name, price, getTotal, setQuantity, getQuantity};
};

//Creating different pan types
const blanco = pan('blanco', 1.52);
const mantequilla = pan('mantequilla', 2);
const integral = pan('integral', 1,70);
const avena = pan('avena', 1.70);
const chia = pan('chia y linaza', 1.70);
const pasas = pan('pasas', 2.00);

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
    if (!checkItemInList(inputName.value)) {
        addedItems.push(availableItems[inputName.value]);
    }

    availableItems[inputName.value].setQuantity(inputQuantity.value)
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
    totalTable.innerHTML = `<tr>
        <td>$${subTotal}</td>
        <td>$${iva}</td>
        <td>$${total}</td>
    </tr>`;
}


function displayItems() {
    itemsTable.innerHTML = '';
    let items = []
    let firstRow = document.createElement('tr');
    firstRow.innerHTML = `<th scope="col">Tipo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Total</th>`

    items.push(firstRow);

    for (let i = 0; i < addedItems.length; i++) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `<td scope="row">Pan ${addedItems[i].name}</td>
                            <td>${addedItems[i].getQuantity()}</td>
                            <td>$${addedItems[i].price}</td>
                            <td>$${addedItems[i].getTotal()}</td>`
        items.push(newRow)
    }
    items.forEach(item => {
        itemsTable.appendChild(item);
    });
    inputQuantity.value = ''
}

function displayClientInfo() {
    clientInfoTable.innerHTML = `
    <tr>
        <td>Nombre: ${clientsName.value}</td>
        <td>Tlf: ${phoneNumber.value}</td>
        <td>Dirección: ${clientsAddress.value}</td>
    </tr>`
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