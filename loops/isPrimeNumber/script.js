const number = parseInt(prompt("Enter an integer:"));

if (isNaN(number) || number <= 1) {
    alert("Please enter an integer greater than 1.");
} else {
    let isPrime = true;

    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        alert(number + " is a prime number.");
    } else {
        alert(number + " is not a prime number.");
    }
}