let currentSlide = 0; // лучше начать с 0

function slideMove(direction = "Next") {
    const slides = document.querySelectorAll('.slide');

    slides[currentSlide].classList.remove('active');

    if (direction === "Next") {
        currentSlide = (currentSlide + 1) % slides.length; // зацикливание
    } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }

    slides[currentSlide].classList.add('active');
}

const nextButton = document.getElementById('nextBtn');
const prevButton = document.getElementById('prevBtn');

nextButton.addEventListener('click', () => slideMove("Next"));
prevButton.addEventListener('click', () => slideMove("Prev"));