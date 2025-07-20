# JavaScript Course Repository

## Course Description
This repository contains practical assignments for the JavaScript course. The course includes an in-depth study of JavaScript from the basics to its frameworks. The repository is organized by topics, with each topic containing multiple lab assignments.

## How to Clone the Repository
<details>
<summary><b>Instructions for cloning the repository</b></summary>

### Clone the Entire Repository
```bash
git clone https://github.com/igorpy1997/JSCourse.git
cd JSCourse
```

### Clone a Specific Folder (using sparse checkout)
```bash
# Clone repository with minimal depth
git clone --filter=blob:none --sparse https://github.com/igorpy1997/JSCourse.git
cd JSCourse

# Set up sparse-checkout for a specific folder
git sparse-checkout set variablesAndType/typesList

# Update from remote repository
git pull origin main
```
</details>

## Lab Assignments

<details>
<summary><b>1. Variables and Data Types</b></summary>

First topic covering JavaScript variables and data types fundamentals.

### typesList
- Create a repository with an index.html file
- Add a small script that displays all known data types in the console using the typeof operator and console.log

### numbersAndStrings
- Get three lines from the user and display them in any order with a single command (template strings)

### fiveDigitParser
- Break down a five-digit number by digits and display it in the output with spaces between digits
- Example: 10369 → 1 0 3 6 9
</details>

<details>
<summary><b>2. Operators and Control Flow</b></summary>

Second topic covering JavaScript operators, conditional statements, and basic flow control.

### promptWork
- Use prompt to ask for the "user's name"
- Use alert to display "Hello, John! How are you?", where "John" is the name entered by the user

### numberCheck
Given a three-digit number provided by the user, determine:
- Are all digits the same?
- Are there any identical digits?

### userProfile
Create a script that:
- Asks the user for their birth year
- Asks them which city they live in
- Asks for their favorite sport
- When clicking OK, display a window showing:
  - Their age
  - If the user enters Kyiv, Washington, or London, show the message "You live in the capital of..." with the appropriate country
  - Otherwise, show "You live in [city]" where [city] is the entered city

### switchCaseUsage
- Rewrite given code using the switch...case construct
</details>

<details>
<summary><b>3. Loops and Iterations</b></summary>

Third topic covering JavaScript loops, iterations, and number processing.

### numberOutput
- Display numbers from 20 to 30 with a step of 0.5 (20, 20.5, 21, 21.5, ...)

### currencyCalculation
- One dollar costs 26 hryvnias. Display data with the calculated value of 10, 20, 30... 100 dollars

### findNumbers
- Given a whole number N (entered via prompt), display all whole numbers from 1 to 100 whose square does not exceed N

### isPrimeNumber
- Given a whole number (entered via prompt), determine if it is prime (a prime number is greater than 1 and has no divisors other than 1 and itself)
</details>

<details>
<summary><b>4. Introduction to Functions</b></summary>

Fourth topic covering the basics of JavaScript functions, function parameters, and return values.

### symbolRemover
- Create a function that removes a specified number of characters from a string
- The function should take two parameters: the original string and the number of characters to remove
- Return the modified string with the specified number of characters removed

### averageCalculator
- Create a function that calculates the arithmetic mean
- The function should accept multiple numerical arguments
- Return the average value of all provided numbers

### arrayElementRemoval
- Create a function that removes a specific element from an array
- The function should take two parameters: the array and the element to be removed
- Return a new array without the specified element
</details>

<details>
<summary><b>7. Closures, Callbacks, Higher-Order Functions, and IIFE</b></summary>

Seventh topic covering advanced JavaScript functions concepts including closures, currying, callbacks, higher-order functions, and Immediately Invoked Function Expressions (IIFE).

### closure
- Create a closure function that preserves state between calls
- Demonstrate proper scoping and variable access within closures
- Show practical examples of using closures in JavaScript

### currying
- Implement function currying (transforming a function with multiple arguments into a sequence of functions with single arguments)
- Demonstrate the practical application of currying for creating reusable function components
- Show how currying can improve code organization and readability

### functionWithLoop
- Create a higher-order function that works with loops
- Implement an example of using a higher-order function to process an array of data
- Demonstrate how higher-order functions can be used to abstract iteration patterns
</details>

<details>
<summary><b>8. Arrow Functions</b></summary>

Eighth topic covering arrow functions in JavaScript, including their syntax, scope behavior, and practical applications.

### stairs
- Create a "stairs" pattern using arrow functions
- Implement a function that generates a stair pattern of a specified height
- Demonstrate the use of arrow functions for concise code implementation
</details>

<details>
<summary><b>9. Recursion and Introduction to Constructor Functions</b></summary>

Ninth topic covering recursion concepts and an introduction to constructor functions in JavaScript.

### salarySummation
- Create a recursive function to calculate the total salary from a nested structure
- Implement the solution using proper recursion techniques
- Demonstrate how recursion can elegantly solve problems with nested data structures
</details>

<details>
<summary><b>10. Arrays and Objects</b></summary>

Tenth topic covering arrays and objects in JavaScript, their properties, methods, and the Document Object Model (DOM).

### userCard
- Create a user card interface using JavaScript objects
- Implement functionality to display and manipulate user information
- Practice working with object properties and methods

### evenNumbersExtraction
- Create a function that extracts even numbers from an array
- Implement array filtering using methods like filter() or forEach()
- Return a new array containing only the even numbers

### contactBook
- Create a contact book application using objects and arrays
- Implement functionality to add, remove, and search contacts
- Practice manipulating the DOM to display and update the contact list
</details>

<details>
<summary><b>11. DOM Manipulation and Events</b></summary>

Eleventh topic covering DOM manipulation and event handling in JavaScript.

### pythagorasTable
- Create a Pythagoras multiplication table (10×10)
- The table should be dynamically generated
- Display the table on the web page

### colorChangeButton
- Create a text block and a button on the web page
- When the button is clicked, the text should change color
- On the next click, the text should return to its original color

### randomImage
- Place any images named 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg, 7.jpg, 8.jpg, 9.jpg in a folder
- Display a randomly selected image using Math.random()
</details>

<details>
<summary><b>15. Web Storages</b></summary>

Fifteenth topic covering client-side data storage mechanisms including localStorage, sessionStorage, and their practical applications.

### toDoList
- Create a fully functional to-do list application
- Implement task creation, editing, deletion, and completion status toggling
- Use localStorage to persist tasks between browser sessions
- Add features like task filtering (all, active, completed) and bulk operations
- Practice data serialization/deserialization and storage event handling
- Demonstrate persistent state management in web applications
</details>

<details>
<summary><b>16. Object-Oriented JavaScript</b></summary>

Sixteenth topic covering object-oriented programming concepts in JavaScript, including constructor functions, prototypes, and class-based inheritance.

### studentConstructor
Create a constructor function for a "Student" entity with the following requirements:

**Properties:**
- First name (ім'я)
- Last name (прізвище)
- Birth year (рік народження)
- Grades array (масив з оцінками)
- Attendance array (масив відвідуваності) - exactly 25 elements, initially empty

**Methods:**
- `getAge()` - returns the student's current age
- `getAverageGrade()` - calculates and returns the average grade
- `present()` - marks attendance as true for the next available slot (max 25 records)
- `absent()` - marks attendance as false for the next available slot (max 25 records)
- `summary()` - evaluates student performance:
  - If average grade > 90 AND attendance rate > 0.9 (90%): return "Молодець!"
  - If only one condition is met: return "Добре, але можна краще"
  - If both conditions fail: return "Редиска!"

**Implementation requirements:**
- Protect against overflow in the attendance array (maximum 25 records)
- Calculate attendance rate as: number of classes attended / total classes
- Create 2-3 student instances to demonstrate all methods
- Show practical usage examples of the constructor and all methods
</details>

<details>
<summary><b>17. Classes</b></summary>

Seventeenth topic covering ES6 classes in JavaScript, their syntax, differences from constructor functions, and inheritance using `extends` and `super`.

### calculator
- Create a Calculator class with basic mathematical operations
- Implement methods: add(), subtract(), multiply(), divide()

### coach
- Create a Coach class with properties: name, specialization, rating
- Add displayInfo() method to show coach information

### bankAccount
- Create a BankAccount class with balance property
- Implement methods: deposit(), withdraw(), getBalance()
- Handle basic account operations and balance management
</details>

<details>
<summary><b>18. Introduction to Asynchrony, Event Loop and Promises</b></summary>

Eighteenth topic covering asynchronous JavaScript concepts including Event Loop, Promises, private class properties, and asynchronous operations management.

### countdownTimer
- Create a countdown timer with variable start time
- Display time in MM:SS format (01:25)
- Stop timer when countdown reaches zero
- Practice with setInterval, clearInterval, and time formatting
</details>

<details>
<summary><b>19. Ajax and async/await</b></summary>

Nineteenth topic covering advanced asynchronous JavaScript including Ajax requests, async/await syntax, Promise handling, fetch API, HTTP methods, and RESTful architecture principles.

### weatherWidget
- Create a weather widget using OpenWeatherMap API
- Implement fetch requests with proper error handling
- Display current weather data with temperature, humidity, pressure
- Practice with async/await and API response processing
- Add button to update weather data and handle loading states
</details>

<details>
<summary><b>20. Libraries and npm</b></summary>

Twentieth topic covering external libraries usage, npm package manager, jQuery fundamentals, Bootstrap components, and integration of third-party tools in JavaScript projects.

### todoListJquery
- Rebuild existing ToDo list application using jQuery library
- Replace vanilla JavaScript DOM manipulation with jQuery methods
- Practice with jQuery selectors, events, and animations

### todoListModal
- Enhance ToDo list with Bootstrap modal windows
- Create modal popup that displays task details when clicked
- Integrate Bootstrap CSS framework with existing functionality
- Practice with Bootstrap components and jQuery event handling