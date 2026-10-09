const estimateButton = document.getElementById("estimate-btn");
const pricesButton = document.getElementById("prices-btn");

const aluminiumButton = document.getElementById("aluminium-btn");
const windowsButton = document.getElementById("windows-btn");
const slidingWindowButton = document.getElementById("sliding-window-btn");
const addSizeButton = document.getElementById("add-size-btn");
const windowMaterialsButton = document.getElementById("window-materials-btn");
const dividerQuantityInput = document.getElementById("divider-quantity");
const calculateWindowButton = document.getElementById("calculate-window-btn");
const calculationResultsMenu = document.getElementById("calculation-results-menu");
const calculationResults = document.getElementById("calculation-results");
const backToMainButton = document.getElementById("back-to-main-btn");
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
    { name: "Aluminium Interlock", referencePrice: 0 },
    { name: "Glass", referencePrice: 0 },
    { name: "11:32 Profile", referencePrice: 0 },
    { name: "Net", referencePrice: 0 },
    { name: "Divider", referencePrice: 0 },
    { name: "Latch Keys", referencePrice: 0 },
    { name: "Door Rollers", referencePrice: 0 },
    { name: "Coupling Screws", referencePrice: 0 },
    { name: "0'1 Glass Rubber", referencePrice: 0 },
    { name: "11:32 Angle", referencePrice: 0 },
    { name: "4 mm Frame-Coupling Screws", referencePrice: 0 }
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
confirmEstimatePricesButton.addEventListener("click", function() {
    estimatePricesMenu.style.display = "none";

    if (calculationResults.innerHTML.trim() !== "") {
        calculationResultsMenu.style.display = "block";
    } else {
        windowMaterialsMenu.style.display = "block";
    }
});
// SLIDING WINDOW CALCULATION ENGINE

calculateWindowButton.addEventListener("click", function() {

    const rows = windowSizeList.querySelectorAll("tr");
    const windows = [];

    // Read all entered window sizes
    for (const row of rows) {

        const inputs = row.querySelectorAll("input");

        const width = Number(inputs[0].value);
        const height = Number(inputs[1].value);
        const quantity = Number(inputs[2].value);

        if (
            !Number.isFinite(width) ||
            !Number.isFinite(height) ||
            !Number.isInteger(quantity) ||
            width <= 166 ||
            height <= 90 ||
            quantity < 1
        ) {
            alert(
                "Enter a valid width greater than 166 mm, " +
                "height greater than 90 mm, and quantity of at least 1."
            );
            return;
        }

        windows.push({ width, height, quantity });
    }

    const totals = {};

    function addMaterial(name, length, piecesPerWindow, quantity) {

        if (!totals[name]) {
            totals[name] = [];
        }

        totals[name].push({
            length: length,
            pieces: piecesPerWindow * quantity
        });
    }

    // Calculate each window size
    windows.forEach(function(window) {

        const width = window.width;
        const height = window.height;
        const quantity = window.quantity;

        const top = (width - 166) / 2;
        const bottom = top;
        const lock = height - 30;
        const interlock = lock;

        const glassWidth = top + 16;
        const glassHeight = lock - 90;

        addMaterial("Aluminium Track", width, 2, quantity);
        addMaterial("Aluminium Jamb", height, 2, quantity);
        addMaterial("Aluminium Top", top, 2, quantity);
        addMaterial("Aluminium Bottom", bottom, 2, quantity);
        addMaterial("Aluminium Lock", lock, 2, quantity);
        addMaterial("Aluminium Interlock", interlock, 2, quantity);
        addMaterial("11:32 Profile", width, 4, quantity);
    const dividerPieces = Number(dividerQuantityInput.value);

if (
    !Number.isInteger(dividerPieces) ||
    dividerPieces < 0
) {
    alert("Enter a valid divider quantity (0 or more).");
    return;
}

addMaterial("Divider", top, dividerPieces, quantity);

        if (!totals["Glass"]) {
            totals["Glass"] = [];
        }

        for (let i = 0; i < quantity * 2; i++) {
            totals["Glass"].push({
                length: glassWidth,
                height: glassHeight,
                pieces: 1
            });
        }

        if (!totals["Net"]) {
            totals["Net"] = [];
        }

        for (let i = 0; i < quantity; i++) {
            totals["Net"].push({
                length: width,
                height: height,
                pieces: 1
            });
        }
    });

    // Display the calculated materials
    let html = "";

    html += "<h3>Required Materials</h3>";

    Object.keys(totals).forEach(function(name) {

        html += "<h4>" + name + "</h4>";

        if (name === "Glass" || name === "Net") {

            const sizes = {};

            totals[name].forEach(function(item) {
                const key = item.length + " × " + item.height + " mm";
                sizes[key] = (sizes[key] || 0) + item.pieces;
            });

            Object.keys(sizes).forEach(function(size) {
                html += "<p>" + size + " — " + sizes[size] + " piece(s)</p>";
            });

        } else {

            const sizes = {};

            totals[name].forEach(function(item) {
                const key = item.length + " mm";
                sizes[key] = (sizes[key] || 0) + item.pieces;
            });

            Object.keys(sizes).forEach(function(size) {
                html += "<p>" + size + " — " + sizes[size] + " piece(s)</p>";
            });
        }

    });

    // Accessories
    const totalWindows = windows.reduce(function(sum, window) {
        return sum + window.quantity;
    }, 0);

    html += "<h3>Accessories</h3>";
    html += "<p>Latch keys: " + totalWindows + " pair(s)</p>";
    html += "<p>Door rollers: " + (totalWindows * 2) + " pair(s)</p>";
    html += "<p>Coupling screws: " + (totalWindows * 4) + " piece(s)</p>";
    html += "<p>0'1 glass rubber: " + (totalWindows * 2) + " roll(s)</p>";
    html += "<p>11:32 angles: " + (totalWindows * 4) + " piece(s)</p>";
    html += "<p>4 mm frame-coupling screws: " + (totalWindows * 8) + " piece(s)</p>";

    calculationResults.innerHTML = html;

    slidingWindowMenu.style.display = "none";
    calculationResultsMenu.style.display = "block";

});

backToMainButton.addEventListener("click", function() {

    calculationResultsMenu.style.display = "none";
    mainMenu.style.display = "block";

});
