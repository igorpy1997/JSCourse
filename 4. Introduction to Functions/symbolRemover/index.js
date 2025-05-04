function removeSymbols(inputText = '', symbolsToRemove = []) {
    if (symbolsToRemove.length === 0) return inputText;

    const escapedSymbols = symbolsToRemove.map(symbol =>
        symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );

    const regex = new RegExp(escapedSymbols.join('|'), 'g');
    return inputText.replace(regex, '');
}

console.log(removeSymbols('Aren\'t we lovely people?', ['!', 'l', 'y']));

console.log(removeSymbols('Hello, world! How are you?', [',', '!', '?']));

console.log(removeSymbols('Testing 1.2.3', ['.']));
