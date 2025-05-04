const isThreeDigit = (number) => {
    return 100 <= number <= 999
}

const isAllDigitsAreEqual = (number) => {
    const numStr = String(number);
    const firstDigit = numStr[0];
    return numStr.split('').every(digit => digit === firstDigit);
}

function isContainsEqualDigits(number) {
    const numStr = String(number);
    const seenDigits = new Set();
    for (let digit of numStr) {
        if (seenDigits.has(digit)) {
            return true;
        }
        seenDigits.add(digit);
    }
    return false;
}

const userInputNumber = prompt('Enter your number', '111');

if (!isThreeDigit(userInputNumber)) {
    alert(`You need to enter a three digit number`);
}
else {
    if (isAllDigitsAreEqual(userInputNumber)) {
        alert(`All digits in number ${userInputNumber} are equal`);
    }
    else if (isContainsEqualDigits(userInputNumber)) {
        alert(`There are at least two equal digits in ${userInputNumber}`);
    }
    else {
        alert(`All different digits in ${userInputNumber}`);
    }

}