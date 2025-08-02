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
git sparse-checkout set "variablesAndType/typesList"

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
</details>

<details>
<summary><b>21. EcmaScript and Babel</b></summary>

Twenty-first topic covering modern JavaScript features, EcmaScript standards, Babel transpiler setup, advanced object methods, optional chaining, and browser compatibility solutions.

### babelOptimization
- Optimize previous homework assignment using Babel transpiler
- Set up Babel configuration with npm for browser compatibility
- Use modern ES6+ features (destructuring, arrow functions, async/await)
- Configure Babel presets and plugins for legacy browser support
- Practice with modern JavaScript syntax while maintaining compatibility
</details>

<details>
<summary><b>22. Code Optimization with Modern Tools</b></summary>

Twenty-second topic covering build tools like Webpack and Gulp, npm package management, project configuration, loaders, plugins, and development vs production optimization.

### webpackBuild
- Create Webpack build configuration for previous project
- Implement JavaScript optimization, concatenation, and minification
- Set up SCSS to CSS compilation with minification
- Configure file watcher for automatic rebuilds
- Optional features:
  - Development server setup
  - Image optimization with image-minimizer-webpack-plugin
- Practice with webpack.config.js and build automation
</details>

<details>
<summary><b>23. Node.js Overview</b></summary>

Twenty-third topic covering Node.js fundamentals, backend development with Express, REST API implementation, and database integration.

### todoApiServer
- Create TODO list API using Node.js and Express
- Implement CRUD operations (Create, Read, Update, Delete)
- Set up CORS configuration for cross-origin requests
- Integrate MongoDB database for data persistence
- Create separate frontend folder to interact with API
- Practice with RESTful endpoints and HTTP methods
</details>

<details>
<summary><b>24. Introduction to React and Virtual DOM</b></summary>

Twenty-fourth topic covering React fundamentals, Virtual DOM concepts, JSX syntax, and component-based architecture.

### firstReactApp
- Generate your first React application using Create React App or Vite
- Create interface for SWAPI (Star Wars API) - UI only, no request logic or events
- Use Bootstrap library integration
- Add custom CSS files for additional styling if needed
</details>

<details>
<summary><b>25. Class Components, States, Props and Component Lifecycle</b></summary>

Twenty-fifth topic covering React class components, state management with setState, props handling, and component lifecycle methods.

### emojiVoting
- Create emoji voting application using class components
- Display list of emojis with click counters for each
- Add "Show Results" button that displays winning emoji based on vote count
- Store voting data in localStorage for persistence
- Include "Clear Results" button to reset all votes
- Practice with component lifecycle methods (componentDidMount, componentWillUnmount)
- Implement state management using setState method
</details>

<details>
<summary><b>26. Function Components, Hooks and Memoization in React</b></summary>

Twenty-sixth topic covering React functional components, hooks (useState, useEffect, useCallback, useRef), and performance optimization through memoization.

### emojiVotingHooks
- Refactor previous emoji voting application to use functional components
- Implement state management using useState hook
- Use useEffect for side effects and lifecycle equivalent methods
- Practice with useCallback for function memoization
- Apply useRef for DOM element references
- Optimize component performance with proper hook usage
</details>

<details>
<summary><b>27. Context, Routing and Error Handling</b></summary>

Twenty-seventh topic covering React Context API, routing with React Router, and error handling with Error Boundaries for building robust Single Page Applications.

### spaApplication
- Create a Single Page Application (SPA) using Vite
- Implement navigation header with links to: "Home", "Contacts", "About Me"
- Add TODO list form on the home page
- Implement dark/light theme toggle using React Context
- Fill "Contacts" and "About Me" pages with custom content
- Add Error Boundaries for proper error handling
- Practice with React Router for client-side routing
- Use useContext hook for global state management (theme switching)
</details>

<details>
<summary><b>28. Working with Forms</b></summary>

Twenty-eighth topic covering form handling in React, including controlled and uncontrolled components, form validation, and integration with popular form libraries like Formik and React Hook Form.

The lesson emphasizes the importance of regular practice and applying acquired skills in React and JavaScript development. Students learn about creating forms, submitting data to servers, handling events, and validating inputs. The topic covers controlled vs uncontrolled components, and introduces popular form libraries such as React Final Form and Hook Form for creating dynamic forms with proper validation.

### todoListFormik
- Create a TODO list application using Formik library
- Implement form validation with minimum input length requirement (at least 5 characters)
- Practice with Formik's form handling patterns and validation schemas
- Demonstrate proper form state management and error handling
</details>

<details>
<summary><b>29. Redux</b></summary>

Twenty-ninth topic covering Redux state management library and its integration with React applications. Students learn about the "single source of truth" concept, creating stores and reducers, and implementing clean functions for reliable Redux operation.

The lesson covers Redux fundamentals including store creation, reducer functions, action standards, and practical examples of implementing a counter using Redux. Students practice integrating Redux into their projects and learn about code structure and state management approaches.

### reduxCounter
- Implement a counter application using Redux
- Create store, actions, and reducers following Redux patterns
- Practice with Redux state management and action dispatch
- Integrate Redux with React components using connect or hooks
</details>

<details>
<summary><b>30. Introduction to Middleware with Redux-Thunk</b></summary>

Thirtieth topic covering Redux Toolkit for state management in large projects and implementing middleware for complex asynchronous operations such as server requests. Students learn to organize code by structurally separating request logic from components.

The lesson demonstrates creating asynchronous actions with Redux Toolkit that can be directly integrated into React components. Also covers the importance of unique keys in lists for optimizing React rendering performance.

### swapiReduxThunk
- Create a SWAPI (Star Wars API) application using redux-thunk
- Implement asynchronous data fetching with proper loading states
- Add a footer button that clears TODO data
- Practice with middleware patterns and async action creators
- Follow the provided interface example for consistent UI design
</details>

<details>
<summary><b>31. Iterators, Generators and Redux-Saga</b></summary>

Thirty-first topic covering JavaScript iterators, generators, and Redux-Saga middleware for handling complex asynchronous flows. Students learn about symbols as unique primitives, iterators for traversing collections, and generators that can pause and resume execution.

The lesson focuses on understanding generators as a foundation for working effectively with Redux-Saga library. Students learn to use Redux-Saga for handling asynchronous requests, subscribing to actions, launching workers, and processing server requests.

### todoReduxSaga
- Implement TODO list functionality using Redux-Saga
- Create sagas for handling asynchronous operations:
  - Adding and loading items
  - Deletion
  - Completion toggling
  - Editing
  - Clearing all items
- Practice with generator functions and saga patterns
- Implement proper error handling and loading states
</details>

<details>
<summary><b>32. Component Styling</b></summary>

Thirty-second topic covering component styling in React using various libraries and technologies such as CSS modules, Emotion, and SASS. Students learn proper project structure organization where each component has its own folder and styles, emphasizing the importance of modularity.

The lesson focuses on dynamic styling and methodology for writing styles that help avoid class conflicts. Students explore popular styling libraries like Material-UI for quick and efficient UI element creation, and learn about dynamic style management using props for greater flexibility.

### resumeWebsite
- Create a personal resume website using Material-UI or Ant Design
- Implement the following pages and features:
  - Header with navigation menu
  - Main page resembling a resume with skills description
  - TODO list page
  - SWAPI page
  - Footer with contact information
- Practice with component styling and UI library integration
- Demonstrate responsive design and modern styling approaches
</details>

<details>
<summary><b>33. Testing</b></summary>

Thirty-third topic covering the importance of software testing, focusing on unit testing and integration testing in React development context. Students learn that testing is crucial for developers as it helps identify bugs in early stages and ensures application stability.

The lesson emphasizes understanding the difference between developer-perspective testing (unit testing) and user-perspective testing (integration testing), enabling the creation of quality code. Students explore various testing libraries such as Jest and Testing Library, and learn how to create and run tests. They gain practical skills in writing tests for their components and learn to work with mocks, allowing them to test individual code parts without dependencies on other components.

### todoAppTesting
- Add a minimum of 5 tests to your TODO application
- Test examples to implement:
  - Verify that the page has a TODO title
  - Test that the text input field accepts both numbers and letters
  - Verify that clicking "Add" button without text displays an error
  - Test that after entering text and clicking "Add", a new list item appears with the correct text
  - Create additional creative tests for thorough coverage
- Practice with Jest and Testing Library
- Implement unit tests and integration tests
- Learn to work with mocks and test component behavior
- Demonstrate testing best practices and patterns
</details>