document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer');
    const notification = document.getElementById('notification');
    const message = document.getElementById('message');
    const okButton = document.getElementById('okButton');

    buttonContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn')) {
            showNotification(event.target.textContent);
        }
    });

    okButton.addEventListener('click', function() {
        hideNotification();
    });

    function showNotification(buttonText) {
        message.textContent = `Clicked on button: ${buttonText}`;
        notification.style.display = 'block';
    }

    function hideNotification() {
        notification.style.display = 'none';
    }
});