INSERT INTO departments
(name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles
(title, salary, dept_id)
VALUES
('Account Manager', 50000, 1),
('Accountant', 50000, 2),
('Lawyer', 150000, 3),
('Legal Team Lead', 80000, 4),
('Lead Engineer', 100000, 5 ),
('Salesperson', 60000, 6),
('Software Engineer', 100000, 7);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Anna', 'Joy', 7, 1),
('Carl', 'Smith', 6, 2),
('Destiny' 'Cruz', 5, 1),
('Justin', 'Rock', 4, 2),
('Gale', 'Ryan', 3, 1),
('Pat', 'Stone', 2, 2),
('Gene', 'Hernandez', 1, 1);

SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
FROM employee 

LEFT JOIN employee manager ON manager.id = employee.manager_id

INNER JOIN employee_Role ON employee.role_id = employee_Role.id
INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id;

SELECT dept_name FROM employee_Dept;

SELECT title FROM employee_Role