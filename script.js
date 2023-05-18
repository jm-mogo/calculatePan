
//Factory function to create pan types
const pan = (name, price) => {
    let quantity = 0;
    const getTotal = () => {
        return quantity * price;
    }
    const setQuantity = (newQuantity) => {
        quantity = newQuantity;
    } 
    return { name, price, getTotal, setQuantity};
};

//Creating different pan types
const blanco = pan('blanco', 1.52);
const mantequilla = pan('mantequilla', 2);
const integral = pan('integral', 1,70);
const avena = pan('avena', 1.70);
const chia = pan('chia y linaza', 1.70);
const pasas = pan('pasas', 2.00);

const addedItems = [blanco, mantequilla];

function addItems(item) {
    addedItems.push(item);
}
