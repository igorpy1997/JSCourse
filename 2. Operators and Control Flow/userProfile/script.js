const yearOfBirth = prompt('What is your year of birth?', "2000");
if (yearOfBirth === null) {
    alert(`Unfortunately you didn't want to provide your year of birth`);
}

const city = prompt('What is your city?', "London");

if (city === null) {
    alert(`Unfortunately you didn't want to provide your city`);
}

const sport = prompt('What kind of sports do you prefer?', "Football");

if (sport === null) {
    alert(`Unfortunately you didn't want to provide your sport`);
}
const currentYear = new Date().getFullYear();


const capitals = {
    "київ": "столиці України",
    "вашингтон": "столиці США",
    "лондон": "столиці Великобританії"
};

const sportAndChampion = {
    "football": "Leo Messi",
    "basketball": "Michael Jordan",
    "Box": "Oleksandr Usyk"
}

alert(`Your age is ${yearOfBirth != null ? currentYear - yearOfBirth : 'undefined'}
${city != null ? `You live in ${capitals[city.toLowerCase()] || `the city of ${city}`}` : 'Place of residence: undefined'}
${sport != null ? `You do ${sport}. Great! ${sportAndChampion[sport.toLowerCase()] ? `Want to be like ${sportAndChampion[sport.toLowerCase()]}?` : ''}` : 'Sport: undefined'}
`);


