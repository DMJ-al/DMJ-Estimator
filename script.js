const estimateButton = document.getElementById("estimate-btn");
const pricesButton = document.getElementById("prices-btn");

const aluminiumButton = document.getElementById("aluminium-btn");
const windowsButton = document.getElementById("windows-btn");
const slidingWindowButton = document.getElementById("sliding-window-btn");
const addSizeButton = document.getElementById("add-size-btn");
const windowMaterialsButton = document.getElementById("window-materials-btn");
const checkPricesButton = document.getElementById("check-prices-btn");
const mainMenu = document.getElementById("main-menu");
const professionMenu = document.getElementById("profession-menu");
const aluminiumMenu = document.getElementById("aluminium-menu");
const windowMenu = document.getElementById("window-menu");
const slidingWindowMenu = document.getElementById("sliding-window-menu");
const windowMaterialsMenu = document.getElementById("window-materials-menu");
const pricesMenu = document.getElementById("prices-menu");

const windowSizeList = document.getElementById("window-size-list");

const materialSearch = document.getElementById("material-search");
const priceList = document.getElementById("price-list");
const estimatePricesMenu = document.getElementById("estimate-prices-menu");
const estimatePriceList = document.getElementById("estimate-price-list");
const confirmEstimatePricesButton = document.getElementById("confirm-estimate-prices-btn");

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
windowMaterialsButton.addEventListener("click", function() {

    slidingWindowMenu.style.display = "none";
    windowMaterialsMenu.style.display = "block";

});


checkPricesButton.addEventListener("click", function() {

    const selectedMaterials = [];

    const checkboxes = windowMaterialsMenu.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    checkboxes.forEach(function(checkbox) {
        selectedMaterials.push(checkbox.value);
    });

    if (selectedMaterials.length === 0) {
        alert("Please select at least one material.");
        return;
    }

    estimatePricesMenu.style.display = "block";
    windowMaterialsMenu.style.display = "none";

    estimatePriceList.innerHTML = "";

    selectedMaterials.forEach(function(materialName) {

        const material = materials.find(function(item) {
            return item.name === materialName;
        });

        if (!material) {
            return;
        }

        const myPrice = getMyPrice(material.name);

        const item = document.createElement("div");

        item.innerHTML = `
            <strong>${material.name}</strong>

            <p>
                Reference Price:
                ₦${material.referencePrice}
            </p>

            <p>
                My Price:
                ₦${myPrice || "Not set"}
            </p>

            <label>
                Price for this estimate:
                <input
                    type="number"
                    class="estimate-price-input"
                    data-material="${material.name}"
                    value="${myPrice || material.referencePrice}"
                    min="0"
                >
            </label>

            <hr>
        `;

        estimatePriceList.appendChild(item);

    });

});

const materials = [
    { name: "Aluminium Track", referencePrice: 0 },
    { name: "Aluminium Jamb", referencePrice: 0 },
    { name: "Aluminium Top", referencePrice: 0 },
    { name: "Aluminium Bottom", referencePrice: 0 },
    { name: "Aluminium Lock", referencePrice: 0 },
    { name: "Aluminium Interlock", referencePrice: 0 }
];


function getMyPrice(materialName) {
    return localStorage.getItem("myPrice_" + materialName);
}


function saveMyPrice(materialName, price) {
    localStorage.setItem("myPrice_" + materialName, price);
}


function displayMaterials(searchTerm = "") {

    priceList.innerHTML = "";

    const filteredMaterials = materials.filter(function(material) {
        return material.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });


    filteredMaterials.forEach(function(material) {

        const myPrice = getMyPrice(material.name);

        const item = document.createElement("div");

        item.innerHTML = `
            <div>
                <strong>${material.name}</strong>

                <p>
                    Reference price:
                    ₦${material.referencePrice}
                </p>

                <p>
                    My price:
                    ₦${myPrice || "Not set"}
                </p>

                <input
                    type="number"
                    id="price-${material.name}"
                    placeholder="Enter your price"
                    min="0"
                >

                <button onclick="savePrice('${material.name}')">
                    Save My Price
                </button>

                <hr>
            </div>
        `;

        priceList.appendChild(item);
    });
}


function savePrice(materialName) {

    const input = document.getElementById("price-" + materialName);

    const price = input.value;

    if (price === "") {
        alert("Please enter a price.");
        return;
    }

    saveMyPrice(materialName, price);

    displayMaterials(materialSearch.value);
}


displayMaterials();


materialSearch.addEventListener("input", function() {

    displayMaterials(materialSearch.value);

});
