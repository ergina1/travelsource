const menus = document.querySelector("nav ul");
const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
    menus.classList.add("display");
});

closeBtn.addEventListener("click", () => {
    menus.classList.remove("display");
});

// scroll sticky navbar
window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 500) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}); 

// static numbers


// Select all counter elements
const countersEL = document.querySelectorAll(".numbers");

// Initialize all counters to zero
countersEL.forEach((counter) => {
    counter.textContent = 0;
});

// Start incrementing each counter
countersEL.forEach((counter) => {
    incrementCounter(counter);
});

function incrementCounter(counter) {
    let currentNum = +counter.textContent;
    const dataCeil = counter.getAttribute("data-ceil");
    
    const increment = dataCeil / 25;
    
    currentNum = Math.ceil(currentNum + increment);
    
    if (currentNum < dataCeil) {
        counter.textContent = currentNum;
        setTimeout(() => incrementCounter(counter), 70);
    } else {
        counter.textContent = dataCeil;
    }
}
