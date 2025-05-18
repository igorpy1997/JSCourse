const colorChangeButton = () => {
    const selectedText = document.querySelector(".selected-text");
    selectedText.classList.toggle('red');
}

const changeColorButton = document.querySelector(".change-color-button");
changeColorButton.addEventListener("click", colorChangeButton);