class User {
    constructor(name = '', age = 0, gender = '', residence = '', personalID = '', phoneNumber = '') {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.residence = residence;
        this.personalID = personalID;
        this.phoneNumber = phoneNumber;
    }

    showInfo() {
        console.log(`Інформація про користувача:`);
        console.log(`Ім'я: ${this.name}`);
        console.log(`Вік: ${this.age}`);
        console.log(`Стать: ${this.gender}`);
        console.log(`Місце проживання: ${this.residence}`);
        console.log(`Ідентифікаційний номер: ${this.personalID}`);
        console.log(`Номер телефону: ${this.phoneNumber}`);
    }

    getInfo() {
        return {
            name: this.name,
            age: this.age,
            gender: this.gender,
            residence: this.residence,
            personalID: this.personalID,
            phoneNumber: this.phoneNumber
        };
    }
}

const user1 = new User('Іван', 30, 'чоловік', 'Київ', '123456789', '+380501234567');
user1.showInfo();

const info = user1.getInfo();
console.log(info);
