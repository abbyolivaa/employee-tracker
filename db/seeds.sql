USE tracker_db;
INSERT INTO departments
(name)
VALUES
( 'Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles
(title, salary, department_id)
VALUES
('Account Manager', 50000, 3),
('Accountant', 50000, 3),
('Lawyer', 150000, 4),
('Legal Team Lead', 80000, 4),
('Lead Engineer', 100000, 2 ),
('Salesperson', 60000, 1),
('Software Engineer', 100000, 2);

INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('Anna', 'Joy', 1, NULL),
('Carl', 'Smith', 1, 1),
('Destiny', 'Cruz', 2, NULL),
('Justin', 'Rock', 2, 3),
('Gale', 'Ryan', 3, NULL),
('Pat', 'Stone',3, 5),
('Gene', 'Hernandez', 1, 1);


