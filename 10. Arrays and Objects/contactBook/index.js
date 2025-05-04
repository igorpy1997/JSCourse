class ContactBook {
    constructor() {
        this.contacts = [];
    }

    addContact(name, phone, email) {
        this.contacts.push({ name, phone, email });
    }

    findContactByName(name) {
        return this.contacts.filter(contact => contact.name.toLowerCase() === name.toLowerCase());
    }
}

const myContactBook = new ContactBook();
myContactBook.addContact('John Doe', '+123456789', 'john.doe@example.com');
myContactBook.addContact('Alice Smith', '+987654321', 'alice.smith@example.com');
myContactBook.addContact('Johnathan Doe', '+112233445', 'johnathan.doe@example.com');

console.log(myContactBook.findContactByName('John Doe'));
console.log(myContactBook.findContactByName('alice smith'));
console.log(myContactBook.findContactByName('Oleh'));
