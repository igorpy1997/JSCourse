let translatePosition = -100; // Стартуем с первого настоящего слайда

function slideMove(direction = "Next") {
    const sliderWrapper = document.getElementById('sliderWrapper');

    if (direction === "Next") {
        translatePosition -= 100;
        sliderWrapper.style.transform = `translateX(${translatePosition}%)`;

        // Если дошли до клона первого слайда (-400%), телепортируемся к настоящему первому
        if (translatePosition <= -400) {
            setTimeout(() => {
                sliderWrapper.style.transition = 'none';
                translatePosition = -100; // позиция настоящего первого слайда
                sliderWrapper.style.transform = `translateX(${translatePosition}%)`;

                setTimeout(() => {
                    sliderWrapper.style.transition = 'transform 0.3s ease';
                }, 50);
            }, 300);
        }

    } else {
        translatePosition += 100;
        sliderWrapper.style.transform = `translateX(${translatePosition}%)`;

        // Если дошли до клона последнего слайда (0%), телепортируемся к настоящему последнему
        if (translatePosition >= 0) {
            setTimeout(() => {
                sliderWrapper.style.transition = 'none';
                translatePosition = -300; // позиция настоящего третьего слайда
                sliderWrapper.style.transform = `translateX(${translatePosition}%)`;

                setTimeout(() => {
                    sliderWrapper.style.transition = 'transform 0.3s ease';
                }, 50);
            }, 300);
        }
    }
}

const nextButton = document.getElementById('nextBtn');
const prevButton = document.getElementById('prevBtn');

nextButton.addEventListener('click', () => slideMove("Next"));
prevButton.addEventListener('click', () => slideMove("Prev"));