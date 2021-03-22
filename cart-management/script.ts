var products: Array<{ name: string, cost: number }> = [{ name: "Laptop", cost: 600 }, { name: "Desktop", cost: 1200 }, { name: "Smart Phone", cost: 1000 }, { name: "Flip Phone", cost: 300 }, { name: "Cables", cost: 15 }, { name: "Adapters", cost: 25 }, { name: "RGB Lights", cost: 100 }, { name: "Peripherals", cost: 50 },];
//painful hardcoding

var cart: Array<number> = [];
for (let i: number = 0; i < products.length; i++) {
    cart.push(0); //initialize a list of zeroes representing item quantity
}
//------------------------------UTILITY FUNCTIONS------------------------------//
function getCartSize(): number {
    let size: number = 0;
    for (let i: number = 0; i < cart.length; i++) {
        size += cart[i];
    }
    return size;
}

function getCartCost(): number {
    let cost: number = 0;
    for (let i: number = 0; i < cart.length; i++) {
        cost += cart[i] * products[i].cost;
    }
    return cost;
}

//------------------------------STORAGE FUNCTIONS------------------------------//
function retrieveCart(): void {
    if (localStorage.getItem("myCart") !== null) {
        cart = JSON.parse(localStorage.getItem("myCart"));
    }
}

function storeCart(): void {
    localStorage.setItem("myCart", JSON.stringify(cart));
}

//------------------------------DISPLAY FUNCTIONS------------------------------//
function displayProducts(): void {
    let table: HTMLElement = document.getElementById("productTable");
    table.children[0].innerHTML = "";
    table.children[1].innerHTML = "";
    for (let i: number = 0; i < products.length; i++) {
        let card: HTMLElement = document.createElement("div");
        card.className = "col productCard";
        card.innerHTML = products[i].name + ": $" + products[i].cost + "<br/><button type='button' class='btn btn-primary' onclick='onAddPress(" + i + ")'>Add</button>" + cart[i] +
            "<button type='button' class='btn btn-secondary' onclick='onRemovePress(" + i + ")'>Remove</button>";
        document.getElementById("productRow" + (Math.floor(i / 4) + 1)).appendChild(card);
    }
    document.getElementById("cartSizeDisplay").innerText = String(getCartSize());
}

function displayCart(): void {
    for (let i: number = 0; i < products.length; i++) {
        if (cart[i] > 0) {
            let body: HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
            let newRow = body.insertRow(0);
            newRow.insertCell(0).innerHTML = products[i].name;
            newRow.insertCell(1).innerHTML = "$" + products[i].cost;
            newRow.insertCell(2).innerHTML = String(cart[i]);
            newRow.insertCell(3).innerHTML = "$" + products[i].cost * cart[i];


        }
    }

    document.getElementById("totalCostDisplay").innerText = "Total cost: $" + getCartCost();
}

//------------------------------BUTTON PRESSES------------------------------//
function onAddPress(i: number): void {
    retrieveCart();
    cart[i]++;
    storeCart();
    displayProducts();
}

function onRemovePress(i: number): void {
    retrieveCart();
    if (cart[i] > 0) {
        cart[i]--;
    }
    storeCart();
    displayProducts();
}

