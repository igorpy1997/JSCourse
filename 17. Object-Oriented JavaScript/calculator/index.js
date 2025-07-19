class Calculator {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            throw new Error("Ділення на нуль неможливе!");
        }
        return a / b;
    }
}

const calc = new Calculator();

function logToConsole(message, isResult = false) {
    const consoleDiv = document.getElementById('console');
    const p = document.createElement('p');

    if (isResult) {
        p.className = 'result-line';
    } else {
        p.className = 'method-call';
    }

    p.textContent = new Date().toLocaleTimeString() + ': ' + message;
    consoleDiv.appendChild(p);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

function clearConsole() {
    document.getElementById('console').innerHTML = '';
}

function performOperation(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    if (isNaN(num1) || isNaN(num2)) {
        alert('Будь ласка, введіть правильні числа!');
        return;
    }

    let result;
    let methodCall;

    try {
        switch(operation) {
            case 'add':
                result = calc.add(num1, num2);
                methodCall = `calc.add(${num1}, ${num2})`;
                break;
            case 'subtract':
                result = calc.subtract(num1, num2);
                methodCall = `calc.subtract(${num1}, ${num2})`;
                break;
            case 'multiply':
                result = calc.multiply(num1, num2);
                methodCall = `calc.multiply(${num1}, ${num2})`;
                break;
            case 'divide':
                result = calc.divide(num1, num2);
                methodCall = `calc.divide(${num1}, ${num2})`;
                break;
            default:
                throw new Error('Невідома операція');
        }

        if (result % 1 !== 0) {
            result = Math.round(result * 1000000) / 1000000;
        }

        document.getElementById('result-value').textContent = result;

        logToConsole(methodCall);
        logToConsole(`Результат: ${result}`, true);

    } catch (error) {
        alert(error.message);
        logToConsole(`Помилка: ${error.message}`, true);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    logToConsole('Calculator клас створено');
    logToConsole('Система готова до роботи');

    console.log('=== Calculator Class Demo ===');
    console.log(calc.add(5, 3)); // 8
    console.log(calc.subtract(10, 4)); // 6
    console.log(calc.multiply(3, 6)); // 18
    console.log(calc.divide(8, 2)); // 4

    logToConsole('=== Демонстрація з завдання ===');
    logToConsole('console.log(calc.add(5, 3))');
    logToConsole('// 8', true);
    logToConsole('console.log(calc.subtract(10, 4))');
    logToConsole('// 6', true);
    logToConsole('console.log(calc.multiply(3, 6))');
    logToConsole('// 18', true);
    logToConsole('console.log(calc.divide(8, 2))');
    logToConsole('// 4', true);
});

document.getElementById('num1').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performOperation('add');
    }
});

document.getElementById('num2').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performOperation('add');
    }
});