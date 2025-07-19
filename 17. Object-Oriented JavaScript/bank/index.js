class BankAccount {
    constructor(initialBalance) {
        this.balance = initialBalance;
    }

    getBalance() {
        return this.balance;
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Сума поповнення повинна бути більше 0");
        }
        this.balance += amount;
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Сума зняття повинна бути більше 0");
        }
        if (amount > this.balance) {
            throw new Error("Недостатньо коштів на рахунку");
        }
        this.balance -= amount;
    }
}

const account1 = new BankAccount(1000);
const account2 = new BankAccount(500);

let accounts = [account1, account2];

function logToConsole(message, type = 'normal') {
    const consoleDiv = document.getElementById('console');
    const p = document.createElement('p');

    switch(type) {
        case 'method':
            p.className = 'method-call';
            break;
        case 'result':
            p.className = 'result-line';
            break;
        case 'error':
            p.className = 'error-line';
            break;
        default:
            p.className = '';
    }

    p.textContent = new Date().toLocaleTimeString() + ': ' + message;
    consoleDiv.appendChild(p);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

function clearConsole() {
    document.getElementById('console').innerHTML = '';
}

function formatCurrency(amount) {
    return `₴${amount.toFixed(2)}`;
}

function updateAccountDisplay(accountIndex) {
    const account = accounts[accountIndex];
    const accountCard = document.getElementById(`account${accountIndex + 1}`);
    const balanceElement = accountCard.querySelector('.balance-amount');

    balanceElement.textContent = formatCurrency(account.getBalance());
    balanceElement.classList.add('updating');

    setTimeout(() => {
        balanceElement.classList.remove('updating');
    }, 300);
}

function performOperation(accountId, operation) {
    const accountIndex = parseInt(accountId.replace('account', '')) - 1;
    const account = accounts[accountIndex];
    const amountInput = document.getElementById(`amount${accountIndex + 1}`);
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Будь ласка, введіть правильну суму!');
        return;
    }

    try {
        const balanceBefore = account.getBalance();

        if (operation === 'deposit') {
            account.deposit(amount);
            logToConsole(`account${accountIndex + 1}.deposit(${amount})`, 'method');
            logToConsole(`Поповнення на ${formatCurrency(amount)}. Баланс: ${formatCurrency(account.getBalance())}`, 'result');
        } else if (operation === 'withdraw') {
            account.withdraw(amount);
            logToConsole(`account${accountIndex + 1}.withdraw(${amount})`, 'method');
            logToConsole(`Зняття ${formatCurrency(amount)}. Баланс: ${formatCurrency(account.getBalance())}`, 'result');
        }

        updateAccountDisplay(accountIndex);
        amountInput.value = '';

    } catch (error) {
        alert(error.message);
        logToConsole(`Помилка: ${error.message}`, 'error');
    }
}

function createNewAccount() {
    const initialBalance = parseFloat(document.getElementById('initialBalance').value) || 0;
    const accountType = document.getElementById('accountType').value;

    if (initialBalance < 0) {
        alert('Початковий баланс не може бути від\'ємним!');
        return;
    }

    const newAccount = new BankAccount(initialBalance);
    accounts.push(newAccount);

    createAccountCard(newAccount, accounts.length - 1, accountType);

    logToConsole(`new BankAccount(${initialBalance})`, 'method');
    logToConsole(`Створено новий рахунок з балансом ${formatCurrency(initialBalance)}`, 'result');

    document.getElementById('initialBalance').value = '';
}

function createAccountCard(account, index, type) {
    const accountsGrid = document.querySelector('.accounts-grid');

    const accountCard = document.createElement('div');
    accountCard.className = 'account-card';
    accountCard.id = `account${index + 1}`;

    accountCard.innerHTML = `
        <div class="account-header">
            <h2>💳 Рахунок #${index + 1}</h2>
            <div class="account-type">${type}</div>
        </div>
        <div class="balance-display">
            <span class="balance-label">Баланс:</span>
            <span class="balance-amount">${formatCurrency(account.getBalance())}</span>
        </div>
        <div class="account-actions">
            <div class="input-group">
                <input type="number" id="amount${index + 1}" placeholder="Сума" min="0" step="0.01">
            </div>
            <div class="action-buttons">
                <button class="btn deposit-btn" onclick="performOperation('account${index + 1}', 'deposit')">
                    💰 Поповнити
                </button>
                <button class="btn withdraw-btn" onclick="performOperation('account${index + 1}', 'withdraw')">
                    💸 Зняти
                </button>
            </div>
        </div>
    `;

    accountsGrid.appendChild(accountCard);
}

document.addEventListener('DOMContentLoaded', function() {
    updateAccountDisplay(0);
    updateAccountDisplay(1);

    logToConsole('BankAccount клас створено');
    logToConsole('Банківська система готова до роботи');

    console.log('=== BankAccount Class Demo ===');
    console.log(account1.getBalance());
    account1.deposit(500);
    console.log(account1.getBalance());
    account1.withdraw(200);
    console.log(account1.getBalance());

    logToConsole('=== Демонстрація з завдання ===');
    logToConsole('account1.getBalance()');
    logToConsole('// 1000', 'result');
    logToConsole('account1.deposit(500)');
    logToConsole('account1.getBalance()');
    logToConsole('// 1500', 'result');
    logToConsole('account1.withdraw(200)');
    logToConsole('account1.getBalance()');
    logToConsole('// 1300', 'result');
});