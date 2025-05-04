function getAverageOfNumbers(elementsList = []) {
    const numbersOnly = elementsList.filter(item => typeof item === 'number' && !isNaN(item));

    if (numbersOnly.length === 0) {
        return 0;
    }

    return numbersOnly.reduce((sum, current) => sum + current, 0) / numbersOnly.length;
}

console.log(getAverageOfNumbers([1, 2, 3, 4, 5]));
console.log(getAverageOfNumbers([1, '2', 3, null, 5]));
console.log(getAverageOfNumbers(['text', null, undefined, {}, []]));