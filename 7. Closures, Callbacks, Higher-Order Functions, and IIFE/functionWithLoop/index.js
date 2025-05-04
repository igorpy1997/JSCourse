function askNumberGreaterThan100() {
    let input = null;

    for (let i = 0; i < 10; i++) {
        input = prompt(`Введіть число більше за 100(спроба ${i+1}):`);

        if (input === null) {
            alert("Введення скасовано.");
            return;
        }

        input = Number(input);

        if (isNaN(input)) {
            alert("Це не число! Спробуйте ще раз.");
            continue;
        }

        if (input > 100) {
            alert(`Дякую за число більше 100. Ви ввели число ${input}`);
            return;
        }
    }

    alert(`Спроби закінчилися`);
}

askNumberGreaterThan100()
