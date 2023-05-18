//Inputs
const inputName = document.getElementById('panName');
const inputQuantity = document.getElementById("quantity");

//buttons 
const btnAddItem = document.getElementById("btn-add-item");

//Dom manipulation
const itemsTable = document.getElementById("items-table");

//Factory function to create pan types
const pan = (name, price) => {
    let quantity = 0;
    const getTotal = () => {
        return (quantity * price).toFixed(2);
    }
    const setQuantity = (newQuantity) => {
        quantity = newQuantity;
    } 
    const getQuantity = () => {
        return quantity;
    }

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
    if (checkItemInList(inputName.value)) {
        availableItems[inputName.value].setQuantity(inputQuantity.value)
        displayItems()
        return
    }

    addedItems.push(availableItems[inputName.value]);
    availableItems[inputName.value].setQuantity(inputQuantity.value)
    displayItems()
}

function checkItemInList(item) {
    if (addedItems.length === 0) {
        return false
    }
    return addedItems.every((pan) =>  item == pan.name) 
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

btnAddItem.addEventListener("click", addItems);

function checkInputs() {
    if (inputQuantity.value.length === 0 || isNaN(inputQuantity.value)) {
        return false;
    }
    if (inputQuantity.value <= 0) {
        return false;
    }

    return true;
}