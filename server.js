const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

db.connect(function(err) {
    if (err) throw err;
    promptUser();
});

const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        },
        ]
    )
    .then((response) => {
        switch(response.choice) {
            case 'View All Employees': viewEmployees();
            break;
            case "Add Employee": addEmployee();
            break;
            case "Update Employee Role": updateEmployee();
            break;
            case "View All Roles": viewRoles();
            break;
            case "Add Role": addRole();
            break;
            case "View All Departments": viewDept();
            break;
            case "Add Department": addDept();
            break;
            case "Quit": quit();
        };
    });
};

const viewEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name,
            CONCAT (e.first_name, " ", e.last_name) AS manager FROM employee
            INNER JOIN role ON role.id = employee.role_id
            INNER JOIN department ON department.id = role.department_id
            LEFT JOIN employee e on employee.manager_id = e.id;`,
                 
            function (err, res) {
                if (err) throw err; 

                console.table(res);
                promptUser();                
        });
};  


const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'employee_role',
            message: "What is the employee's title?",
            choices: ['On-Air Talent', 'Sound Engineer', 'Promotions Director', 'Promotions Coordinator', 'Director of Sales', 'Account Executive', 'Program Director', 'On-Site Engineer']
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: ['Duane Dohery', 'Tracy Martin', 'Melissa Weishaupt', 'Anthony Schnurr', 'None']
        }
    ])
    // .then(answers => {
    //     const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`;
    //     const params = [answers.first_name, answers.last_name, answers.employee_role, answers.manager];

    //     db.query(sql, params, (err, res) => {
    //         if (err) {
    //             res.status(400).json({ error: err.message });
    //             return;
    //         }
    //         res.json({
    //             message: 'Added employee to database.',
    //             data: answers
    //         });
    //     });
    // });
};

const updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: ['Duane Doherty', 'Alan Ayo', 'Melissa Weishaupt', 'Alli Brodine', 'Tracy Taylor', 'Liz Nelson', 'Anthony Schnurr', 'Chris Spinks']
        },
        {
            type: 'list',
            name: 'title',
            message: 'What role would you like to assign the employee to?',
            choices: ['On-Air Talent', 'Sound Engineer', 'Promotions Director', 'Promotions Coordinator', 'Director of Sales', 'Account Executive', 'Program Director', 'On-Site Engineer']
        }
    ])
    // .then(
    //     db.query(`ALTER TABLE employee
    //               MODIFY role_id;`,
                
    //             function (err, res) {
    //                 if (err) throw err;

    //                 console.table(res);
    //                 promptUser();
    //             })
    // );
};

const viewRoles = () => {
    db.query(`SELECT * FROM role
              INNER JOIN department ON department.id = role.department_id;`,
                 
            function (err, res) {
                if (err) throw err; 

                console.table(res);
                promptUser();                
        });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the new role?'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the new role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does this role belong to?',
            choices: ['Programming', 'Sales', 'Marketing', 'Engineering']
        }
    ])
    .then();
    //promptUser();
};

const viewDept = () => {
    db.query(`SELECT * FROM department`,
    
        function (err, res) {
            if (err) throw err;

            console.table(res);
            promptUser();
        });
};

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the new department?'
        }
    ])
    .then()
    //promptUser();
};

const quit = () => {
    
};