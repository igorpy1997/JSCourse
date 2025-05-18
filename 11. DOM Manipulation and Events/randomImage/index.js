document.addEventListener('DOMContentLoaded', function() {
    const imageElement = document.getElementById('randomImage');
    const changeButton = document.getElementById('changeImageBtn');

    const imageFiles = [
        'image 1.jpeg',
        'image 2.jpeg',
        'image 3.jpeg',
        'image 4.jpeg',
        'image 5.jpeg',
        'image 6.jpeg',
        'image 7.jpeg',
        'image 8.jpeg',
        'image 9.jpeg'
    ];

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * imageFiles.length);
        return 'images/' + imageFiles[randomIndex];
    }

    changeButton.addEventListener('click', function() {
        imageElement.classList.add('fade-out');

        setTimeout(function() {
            imageElement.src = getRandomImage();
            imageElement.classList.remove('fade-out');
        }, 300);
    });

    const style = document.createElement('style');
    style.textContent = `
        #randomImage {
            transition: opacity 0.3s ease;
        }
        
        .fade-out {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
});