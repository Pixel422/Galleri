const hamburger = document.querySelector(".ham");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

const imageInput = document.querySelector("#image-input");
var uploadedImage = "";

imageInput.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadedImage = reader.result;
        document.querySelector(".card").style.backgroundImage = `url(${uploadedImage})`;
    });
    reader.readAsDataURL(this.files[0]);
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
document.querySelector(".upload-label").onmouseover = event => {
    let iterations = 0;

    const interval = setInterval(() => {
    event.target.innerText = event.target.innerText.split("")
    .map((letter, index) => {
    if(index < iterations) {
        return event.target.dataset.value[index];
    }
    
    return letters[Math.floor(Math.random() * 26)]
    })
    .join("");
    if (iterations === event.target.dataset.value.length) clearInterval(interval);
    iterations += 1 / 2;
}, 30);
}