const doc = document;
const menuOpen = doc.querySelector(".menu");
const menuClose = doc.querySelector(".close");
const overlay = doc.querySelector(".overlay");

menuOpen.addEventListener("click", () => {
    overlay.classList.add("overlay--active");
});

menuClose.addEventListener("click", () => {
    overlay.classList.remove("overlay--active");
});


const contOpen = document.getElementById("mobile__contactOpen");
const contClose = document.getElementById("mobile__contactClose");
const contoverlay = document.getElementById("mobile__contact");

contOpen.addEventListener("click", () => {
    contoverlay.classList.add("overlay--active");
});

contClose.addEventListener("click", () => {
    contoverlay.classList.remove("overlay--active");
});