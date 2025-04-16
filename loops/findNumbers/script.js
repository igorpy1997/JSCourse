const N = parseInt(prompt("Enter an integer N:"));

if (isNaN(N)) {
    alert("You entered an invalid number!");
} else {
    let result = "";

    for (let i = 1; i <= 100; i++) {
        if (i * i <= N) {
            result += i + " ";
        }
    }

    if (result === "") {
        alert("No numbers meet the condition.");
    } else {
        alert("Numbers from 1 to 100 whose square does not exceed " + N + ":\n" + result);
    }
}