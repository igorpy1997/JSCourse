class Coach {
    constructor(name, specialization, rating) {
        this.name = name;
        this.specialization = specialization;
        this.rating = rating;
    }

    displayInfo() {
        return `Coach: ${this.name}, Specialization: ${this.specialization}, Rating: ${this.rating}`;
    }

    getRatingStars() {
        const fullStars = Math.floor(this.rating);
        const hasHalfStar = this.rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        if (hasHalfStar) {
            stars += '☆';
        }
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
            stars += '☆';
        }

        return stars;
    }

    getSpecializationEmoji() {
        const emojiMap = {
            'Fitness': '💪',
            'Yoga': '🧘‍♀️',
            'Boxing': '🥊',
            'Swimming': '🏊‍♀️',
            'Crossfit': '🏋️‍♀️',
            'Pilates': '🤸‍♀️'
        };
        return emojiMap[this.specialization] || '🏃‍♀️';
    }
}

const coach1 = new Coach('John Doe', 'Fitness', 4.7);
const coach2 = new Coach('Alice Smith', 'Yoga', 4.9);

let coaches = [coach1, coach2];

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

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="star filled">★</span>';
    }
    if (hasHalfStar) {
        starsHtml += '<span class="star">☆</span>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        starsHtml += '<span class="star">☆</span>';
    }

    return starsHtml;
}

function showCoachInfo(coachId) {
    const coachIndex = coachId === 'coach1' ? 0 : 1;
    const coach = coaches[coachIndex];

    const info = coach.displayInfo();
    logToConsole(`${coach.name}.displayInfo()`);
    logToConsole(info, true);

    alert(info);
}

function addNewCoach() {
    const name = document.getElementById('coachName').value.trim();
    const specialization = document.getElementById('coachSpecialization').value;
    const rating = parseFloat(document.getElementById('coachRating').value);

    if (!name || !rating || rating < 1 || rating > 5) {
        alert('Будь ласка, заповніть всі поля правильно!');
        return;
    }

    const newCoach = new Coach(name, specialization, rating);
    coaches.push(newCoach);

    createCoachCard(newCoach, coaches.length - 1);

    logToConsole(`new Coach('${name}', '${specialization}', ${rating})`);
    logToConsole(`Тренера ${name} додано до системи`, true);

    document.getElementById('coachName').value = '';
    document.getElementById('coachRating').value = '';
}

function createCoachCard(coach, index) {
    const coachesGrid = document.querySelector('.coaches-grid');

    const coachCard = document.createElement('div');
    coachCard.className = 'coach-card';
    coachCard.id = `coach${index + 1}`;

    coachCard.innerHTML = `
        <div class="coach-avatar">
            <span class="avatar-icon">${coach.getSpecializationEmoji()}</span>
        </div>
        <h2 class="coach-name">${coach.name}</h2>
        <div class="coach-info">
            <p><strong>Спеціалізація:</strong> <span class="specialization">${coach.specialization}</span></p>
            <div class="rating">
                <span class="rating-label">Рейтинг:</span>
                <div class="stars">
                    <span class="rating-value">${coach.rating}</span>
                    <div class="star-display">${renderStars(coach.rating)}</div>
                </div>
            </div>
        </div>
        <button class="btn info-btn" onclick="showCoachInfo('coach${index + 1}')">Показати інформацію</button>
    `;

    coachesGrid.appendChild(coachCard);
}

function updateCoachCards() {
    document.querySelector('#coach1 .star-display').innerHTML = renderStars(coach1.rating);
    document.querySelector('#coach2 .star-display').innerHTML = renderStars(coach2.rating);
}

document.addEventListener('DOMContentLoaded', function() {
    updateCoachCards();

    logToConsole('Coach клас створено');
    logToConsole('Система керування тренерами готова');

    console.log('=== Coach Class Demo ===');
    console.log(coach1.displayInfo());
    console.log(coach2.displayInfo());

    logToConsole('=== Демонстрація з завдання ===');
    logToConsole('coach1.displayInfo()');
    logToConsole(coach1.displayInfo(), true);
    logToConsole('coach2.displayInfo()');
    logToConsole(coach2.displayInfo(), true);
});