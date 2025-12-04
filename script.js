const slides = document.getElementById('slides');
const images = slides.querySelectorAll('img');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;
const slideWidth = 1200;
let autoSlideInterval;

function updateSlide() {
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
}

function nextSlide() {
    index = (index + 1) % images.length;
    updateSlide();
}

function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    updateSlide();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

startAutoSlide();
