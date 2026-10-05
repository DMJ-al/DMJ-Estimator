const aluminiumButton = document.getElementById("aluminium-btn");
const windowsButton = document.getElementById("windows-btn");
const slidingWindowButton = document.getElementById("sliding-window-btn");

const professionMenu = document.getElementById("profession-menu");
const aluminiumMenu = document.getElementById("aluminium-menu");
const windowMenu = document.getElementById("window-menu");
const slidingWindowMenu = document.getElementById("sliding-window-menu");

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
