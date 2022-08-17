const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

db.connect(function(err) {
    if (err) throw err;

    console.log(`
    ================
    EMPLOYEE TRACKER
    ================
    `);

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
            choices: [
                {
                name:'On-Air Talent', 
                value: 1 
                },
                {
                name: 'Sound Engineer', 
                value: 2
                }, 
                {
                name: 'Promotions Director',
                value: 3, 
                },
                {
                name: 'Promotions Coordinator',
                value: 4
                },
                {
                name: 'Director of Sales',
                value: 5
                },
                {   
                name: 'Account Executive',
                value: 6
                },
                { 
                name: 'Program Director',
                value: 7
                },
                {
                name:'On-Site Engineer',
                value: 8 
            }]
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: [
                {
                name: 'Duane Dohery',
                value: 1
                },
                {
                name: 'Tracy Martin',
                value: 2
                },
                { 
                name: 'Melissa Weishaupt',
                value: 3
                },
                {
                name: 'Anthony Schnurr',
                value: 4
                }, 
                {
                name: 'None',
                value: 5
            }]
        }
    ])
    .then(answers => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`;
        const params = [answers.first_name, answers.last_name, answers.employee_role, answers.manager];

        db.query(sql, params, (err, res) => {
            if (err) {
               console.log(err, 'Error updating employee.');
               return;
            }
            console.table('Employee added successfully!');
            promptUser();
            });

        });       
};

const updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: [
                {
                name: 'Duane Dohery',
                value: 1
                },
                {
                name: 'Tracy Martin',
                value: 2
                },
                { 
                name: 'Melissa Weishaupt',
                value: 3
                },
                {
                name: 'Anthony Schnurr',
                value: 4
                }, 
                {
                name: 'None',
                value: 5
                }]
        },
        {
            type: 'list',
            name: 'title',
            message: 'What role would you like to assign the employee to?',
            choices: [
                {
                name:'On-Air Talent', 
                value: 1 
                },
                {
                name: 'Sound Engineer', 
                value: 2
                }, 
                {
                name: 'Promotions Director',
                value: 3, 
                },
                {
                name: 'Promotions Coordinator',
                value: 4
                },
                {
                name: 'Director of Sales',
                value: 5
                },
                {   
                name: 'Account Executive',
                value: 6
                },
                { 
                name: 'Program Director',
                value: 7
                },
                {
                name:'On-Site Engineer',
                value: 8 
                }]
        }
    ])
    .then((answers) => {
        db.query(`UPDATE employee
                  SET role_id = ?
                  WHERE id = ?;`,

                [answers.employee, answers.title],

                function (err, res) {
                    if (err) throw err;

                    console.log('Employee updated');
                    promptUser();
                })
            });
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
            choices: [
                {
                name: 'Programming',
                value: 1
                },
                {
                name: 'Sales',
                value: 2
                },
                {
                name: 'Marketing',
                value: 3
                }, 
                {
                name: 'Engineering',
                value: 4
                }]
        }
    ])
    .then(answers => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`;
        const params = [answers.newRole, answers.salary, answers.department];

        db.query(sql, params, (err, res) => {
            if (err) {
               console.log(err, 'Error updating employee role.');
               return;
            }
            console.log('Title added successfully!');
            promptUser();
            });
        });
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
    .then(answers => {
        const sql = `INSERT INTO department (department_name) VALUES(?)`;
        const params = [answers.newDept];

        db.query(sql, params, (err, res) => {
            if (err) {
               console.log(err, 'Error updating department.');
               return;
            }
            console.table('Department added successfully!');
            promptUser();
            });
        });
};

const quit = () => {
    process.exit(0);
};