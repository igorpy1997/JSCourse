function sumSalaries(department) {
    if (Array.isArray(department)) {
        return department.reduce((sum, employee) => sum + employee.salary, 0);
    } else {
        let sum = 0;
        Object.values(department).forEach(subDept => {
            sum += sumSalaries(subDept);
        });
        return sum;
    }
}


const company = {
    sales: [
        { name: 'John', salary: 1000 },
        { name: 'Alice', salary: 600 }
    ],
    development: {
        web: [
            { name: 'Peter', salary: 2000 },
            { name: 'Alex', salary: 1800 }
        ],
        internals: [
            { name: 'Jack', salary: 1300 }
        ]
    }
};


let total = sumSalaries(company);
console.log(`Total amount of salaries in the company is ${total}`);


