const swiper = new Swiper('.swiper',{
    slidePerView: 1,
    effect: "creative",
    creativeEffect: {
        prev:{
        translate: [0 , 0, -400],
        },
        next: {
        translate: ["100%", 0, 0,]
        },
        },
        loop: true,
        direction:"horizontal",

        autoplay:{
            delay:5000,
        },
        speed:400,
        spaceBetween: 100,

});
const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 3, // Display 3 slides at a time
    spaceBetween: 35, // Space between slides
    slidesPerGroup: 1, // Move 1 slide at a time
    loop: true, // Infinite loop
    centeredSlides: true, // Centers active slide
    grabCursor: true, // Cursor as grabbing hand
    loopFillGroupWithBlank: true, // Avoid empty spaces
    autoplay: {
        delay: 5000, // Auto-slide every 5s
    },
    speed: 400, // Smooth transition



    breakpoints: {
        // When window width is >= 320px
        320: {
            slidesPerView: 1,
            
        },
        // When window width is >= 480px
        480: {
            slidesPerView: 2,
          
        },
        // When window width is >= 768px
        768: {
            slidesPerView: 3,
            
        },
    },
});

const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 1, // Changed to 1 slide per view
    spaceBetween: 0, // Removed space between slides
    slidesPerGroup: 1,
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    loopFillGroupWithBlank: true,
    autoplay: {
        delay: 5000,
    },
    speed: 400,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 1,
        },
    },
});