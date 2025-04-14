# JavaScript Course Repository

## Course Description

This repository contains practical assignments for the JavaScript course. The course includes an in-depth study of JavaScript from the basics to its frameworks. The repository is organized by topics, with each topic containing multiple lab assignments.

## How to Clone the Repository

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

## Lab Assignments

### 1. Variables and Data Types

First topic covering JavaScript variables and data types fundamentals.

#### typesList
- Create a repository with an index.html file
- Add a small script that displays all known data types in the console using the `typeof` operator and `console.log`

#### numbersAndStrings
- Get three lines from the user and display them in any order with a single command (template strings)

#### fiveDigitParser
- Break down a five-digit number by digits and display it in the output with spaces between digits
- Example: 10369 → 1 0 3 6 9

As the course progresses, more topics and labs will be added to this repository.