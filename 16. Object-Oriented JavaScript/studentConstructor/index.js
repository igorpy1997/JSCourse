function Student(firstName, lastName, birthYear, grades) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.grades = grades || [];
    this.attendance = new Array(25);
    this.attendanceCount = 0;
}

Student.prototype.getAge = function() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
};

Student.prototype.getAverageGrade = function() {
    if (this.grades.length === 0) return 0;
    const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return Math.round((sum / this.grades.length) * 100) / 100;
};

Student.prototype.present = function() {
    if (this.attendanceCount < 25) {
        this.attendance[this.attendanceCount] = true;
        this.attendanceCount++;
        logToConsole(`${this.firstName} ${this.lastName} відмічений як присутній`);
    } else {
        logToConsole(`Не можна додати більше 25 записів для ${this.firstName} ${this.lastName}`);
    }
};

Student.prototype.absent = function() {
    if (this.attendanceCount < 25) {
        this.attendance[this.attendanceCount] = false;
        this.attendanceCount++;
        logToConsole(`${this.firstName} ${this.lastName} відмічений як відсутній`);
    } else {
        logToConsole(`Не можна додати більше 25 записів для ${this.firstName} ${this.lastName}`);
    }
};

Student.prototype.getAttendanceRate = function() {
    if (this.attendanceCount === 0) return 0;
    const presentCount = this.attendance.slice(0, this.attendanceCount).filter(Boolean).length;
    return presentCount / this.attendanceCount;
};

Student.prototype.summary = function() {
    const avgGrade = this.getAverageGrade();
    const attendanceRate = this.getAttendanceRate();

    if (avgGrade > 90 && attendanceRate > 0.9) {
        return "Молодець!";
    } else if (avgGrade > 90 || attendanceRate > 0.9) {
        return "Добре, але можна краще";
    } else {
        return "Редиска!";
    }
};

const alex = new Student("Олександр", "Петренко", 2002, [95, 87, 92, 88, 96]);
const maria = new Student("Марія", "Іваненко", 2001, [78, 85, 79, 82, 88]);
const dmitro = new Student("Дмитро", "Коваленко", 2003, [65, 70, 68, 72, 69]);

const students = {
    student1: alex,
    student2: maria,
    student3: dmitro
};

function logToConsole(message) {
    const consoleDiv = document.getElementById('console');
    const p = document.createElement('p');
    p.textContent = new Date().toLocaleTimeString() + ': ' + message;
    consoleDiv.appendChild(p);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

function clearConsole() {
    document.getElementById('console').innerHTML = '';
}

function markPresent(studentId) {
    students[studentId].present();
    updateInfo(studentId);
}

function markAbsent(studentId) {
    students[studentId].absent();
    updateInfo(studentId);
}

function updateInfo(studentId) {
    const student = students[studentId];
    const card = document.getElementById(studentId);

    card.querySelector('.age').textContent = student.getAge();
    card.querySelector('.avg-grade').textContent = student.getAverageGrade();
    card.querySelector('.attendance').textContent =
        `${Math.round(student.getAttendanceRate() * 100)}% (${student.attendanceCount}/25)`;

    const summaryElement = card.querySelector('.summary');
    const summaryText = student.summary();
    summaryElement.textContent = summaryText;

    summaryElement.className = 'summary';
    if (summaryText === "Молодець!") {
        summaryElement.classList.add('excellent');
    } else if (summaryText === "Добре, але можна краще") {
        summaryElement.classList.add('good');
    } else {
        summaryElement.classList.add('poor');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateInfo('student1');
    updateInfo('student2');
    updateInfo('student3');

    alex.present();
    alex.present();
    alex.absent();
    alex.present();
    alex.present();

    maria.present();
    maria.present();
    maria.present();
    maria.absent();
    maria.present();
    maria.present();
    maria.present();

    dmitro.present();
    dmitro.absent();
    dmitro.absent();
    dmitro.present();
    dmitro.absent();

    updateInfo('student1');
    updateInfo('student2');
    updateInfo('student3');

    logToConsole("Система керування студентами ініціалізована");
    logToConsole("Додана початкова відвідуваність для демонстрації");
});

