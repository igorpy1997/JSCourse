const table = document.querySelector('.table-modern')


const thead = document.createElement('thead');
const headerRow = document.createElement('tr');

const emptyHeader = document.createElement('th');
headerRow.appendChild(emptyHeader);

for (let i = 1; i <= 10; i++) {
    const th = document.createElement('th');
    th.textContent = i;
    headerRow.appendChild(th);
}

thead.appendChild(headerRow);
table.appendChild(thead);

const tbody = document.createElement('tbody');

for (let i = 1; i <= 10; i++) {
    const row = document.createElement('tr');

    const rowHeader = document.createElement('th');
    rowHeader.textContent = i;
    row.appendChild(rowHeader);

    for (let j = 1; j <= 10; j++) {
        const td = document.createElement('td');
        td.textContent = i * j;
        row.appendChild(td);
    }

    tbody.appendChild(row);
}

table.appendChild(tbody);