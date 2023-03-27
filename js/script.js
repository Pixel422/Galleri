const hamburger = document.querySelector(".ham");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// document.querySelector(".nav-link").onmouseover = event => {
//     let iterations = 0;

//     const interval = setInterval(() => {
//     event.target.innerText = event.target.innerText.split("").map((letter, index) => {
//         if(index < iterations){
//             return event.target.dataset.value[index];
//         }
        
//         return letters[Math.floor(Math.random() * 26)]
//     })
//         .join("");
    
//     if(iterations === event.target.dataset.value.length) clearInterval(interval);

//     iterations += 1 / 4;
//     }, 30);
// }