const toggleBtn = document.getElementById("allergybtnDis");
const popup = document.getElementById("allergyPop");
const closeBtn = document.getElementById("allergyCloseBtn");

toggleBtn.addEventListener("click", () => {
    popup.style.display = popup.style.display === "block" ? "none" : "block";
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});