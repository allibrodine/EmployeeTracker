INSERT INTO departments (id, name) 
VALUES
    (1, 'Programming'),
    (2, 'Sales'),
    (3, 'Marketing'),
    (4, 'Engineering');

INSERT INTO roles (id, title, salary, department_id)
VALUES
    (1, 'On-Air Talent', 80000, 1),
    (2, 'Sound Engineer', 65000, 4),
    (3, 'Promotions Director', 70000, 3),
    (4, 'Promotions Coordinator', 50000, 3),
    (5, 'Director of Sales', 90000, 2),
    (6, 'Account Executive', 70000, 2),
    (7, 'Program Director', 95000, 1),
    (8, 'On-Site Engineer', 55000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  
    (1, 'Duane', 'Doherty', 7, NULL),
    (2, 'Alan', 'Ayo', 1, 1),
    (3, 'Melissa', 'Weishaupt', 3, 1),
    (4, 'Alli', 'Brodine', 4, 3),
    (5, 'Tracy', 'Taylor', 5, NULL),
    (6, 'Liz', 'Nelson', 6, 5),
    (7, 'Anthony', 'Schnurr', 2, 1),
    (8, 'Chris', 'Spinks', 8, 7);