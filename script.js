const estimateButton = document.getElementById("estimate-btn");
const pricesButton = document.getElementById("prices-btn");

const aluminiumButton = document.getElementById("aluminium-btn");
const windowsButton = document.getElementById("windows-btn");
const slidingWindowButton = document.getElementById("sliding-window-btn");
const addSizeButton = document.getElementById("add-size-btn");

const mainMenu = document.getElementById("main-menu");
const professionMenu = document.getElementById("profession-menu");
const aluminiumMenu = document.getElementById("aluminium-menu");
const windowMenu = document.getElementById("window-menu");
const slidingWindowMenu = document.getElementById("sliding-window-menu");
const pricesMenu = document.getElementById("prices-menu");

const windowSizeList = document.getElementById("window-size-list");


estimateButton.addEventListener("click", function() {
    mainMenu.style.display = "none";
    professionMenu.style.display = "block";
});


pricesButton.addEventListener("click", function() {
    mainMenu.style.display = "none";
    pricesMenu.style.display = "block";
});


aluminiumButton.addEventListener("click", function() {
    professionMenu.style.display = "none";
    aluminiumMenu.style.display = "block";
});


windowsButton.addEventListener("click", function() {
    aluminiumMenu.style.display = "none";
    windowMenu.style.display = "block";
});


slidingWindowButton.addEventListener("click", function() {
    windowMenu.style.display = "none";
    slidingWindowMenu.style.display = "block";
});


addSizeButton.addEventListener("click", function() {

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>
            <input type="number" placeholder="Width">
        </td>

        <td>
            <input type="number" placeholder="Height">
        </td>

        <td>
            <input type="number" placeholder="Qty" min="1" value="1">
        </td>
    `;

    windowSizeList.appendChild(newRow);
});
