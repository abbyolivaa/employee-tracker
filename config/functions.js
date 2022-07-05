const connection = require('./connection');
const inquirer = require('inquirer');
const cTable = require('console.table')

class DB {
    constructor(connection) {
        this.connection = connection
    }

    viewDepartments = () => {
        const sql = `SELECT departments.id AS ID, departments.name AS Department from departments;`
        connection.query(sql, (err, res) => {
            if (err) {
                return;
            }
            console.table(res)
        });
    }

    viewRoles = () => {
        const sql =`SELECT roles.id, roles.title, departments.name as departments, roles.salary FROM roles 
        LEFT JOIN departments ON roles.department_id = departments.id;`
        connection.query(sql, (err, res) => {
            if (err) {
                return;
            }
            console.table(res)
        });
    }

    viewEmployees = () => {
        const sql = `SELECT employees.id AS ID, employees.first_name AS First, employees.last_name AS Last, roles.title AS Role, departments.id AS Dept_ID, roles.salary AS Salary, CONCAT(manager.id, '. ', manager.first_name,' ', manager.last_name) AS Manager
        FROM employees
        LEFT JOIN employees manager ON manager.id = employees.manager_id
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN departments ON departments.id = roles.department_id;`
        connection.query(sql, (err, res) => {
            if (err) {
                return;
            }
            console.table(res)
        });

    }

    viewEmployeesByMgr = () => {
        const sql = `SELECT employees.id AS Emp_ID, employees.manager_id AS Manager, employees.first_name as First, employees.last_name AS Last, roles.title AS Title, roles.salary AS Salary FROM employees INNER JOIN roles ON employees.role_id = roles.id ORDER BY employees.manager_id;`
        connection.query(sql, (err, res) => {
            if (err) {
                return;
            }
            console.table(res)
        });
    }

    viewEmployeesByDept = () => {
        const sql = `SELECT departments.name AS Dept, employees.id AS Emp_ID, employees.first_name as First, employees.last_name AS Last, roles.title AS Title, roles.salary AS Salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ORDER BY departments.name;`
        connection.query(sql, (err, res) => {
            if (err) {
                return;
            }
            console.table(res)
        });
    }

    addDepartment = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'deptName',
                message: 'What would you like to name the department?',
            }
        ])
            .then(data => {
                console.log(data)
                const sql =`INSERT INTO departments (name) VALUES (?)` 
                const params = data.deptName
                connection.query(sql, params, (err, res) => {
                    if (err) {
                        return
                    }
                    else{
                        console.log('Department was added! Go to "View Departments" to verify.')
                    }
                });
            })
        
    }

    addRole = () => {
        const sql = `SELECT * FROM departments`
        const deptArray = []
        connection.query(sql, (err, data) => {
            data.forEach(departments => {
                let deptData = {
                    name: departments.name,
                    value: departments.id
                }
                deptArray.push(deptData);
            });
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roles',
                    message: 'What would you like to name the role?',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is this role's salary?",
                },
                {
                    type: 'list',
                    name: 'departments',
                    message: 'What department does this role belong to?',
                    choices: deptArray
                }
            ])
                .then(data => {
                    console.log(data)

                    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                    const params = [data.roles, data.salary, data.departments]
                    connection.query(sql, params, (err, res) => {
                        if (err) {
                            return
                        }
                        else{
                            console.log('Role was added! Go to "View Roles" to verify.')
                        }

                    });
                })
        })

    }

    addEmployee = () => {
        const sqlRole = `SELECT * FROM roles`
        const sqlMgr = `SELECT * FROM employees`
        const roleArray = []
        const mgrArray = []
        connection.query(sqlMgr, (err, empData) => {
            empData.forEach(employees => {
                let employeeData = {
                    name: employees.firstName + employees.lastName,
                    value: employees.id
                }
                mgrArray.push(employeeData)
            })
        })
        connection.query(sqlRole, (err, data) => {
            data.forEach(roles => {
                let roleData = {
                    name: roles.title,
                    value: roles.id,
                    salary: roles.salary,
                    roleDept: roles.department
                }
                roleArray.push(roleData);
            });
    
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'First name of new employee',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Last name of new employee',
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Role of new employee',
                    choices: roleArray
                },
                {
                    type: 'list',
                    name: 'confirmMgr',
                    message: 'Does this employee have a manager?',
                    choices: ['Yes', 'No']
                },
                {
                    type: 'list',
                    name: 'employeeMgr',
                    message: `Please enter Manager's ID`,
                    choices: mgrArray,
                    when: (input) => input.confirmMgr === 'Yes'
                }
            ])
                .then(data => {
                    console.log(data)
                    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                    const params = [data.firstName, data.lastName, data.employeeRole, data.employeeMgr]
                    connection.query(sql, params, (err, res) => {
                        if (err) {
                            return
                        }
                        else{
                            console.log('Employee was added! Go to "View All Employees" to verify.')
                        }
                    });
                })
        })
    }

    updateRole = () => {
        const sqlRole = `SELECT * FROM roles`
        const sqlEmp = `SELECT * FROM employees`
        const roleArray = []
        const employeeArray = []
        connection.query(sqlEmp, (err, empData) => {
            empData.forEach(employees => {
                let employeeData = {
                    name: employees.firstName,
                    value: employees.id
                }
                employeeArray.push(employeeData)
            })
        })
        connection.query(sqlRole, (err, data) => {
            data.forEach(roles => {
                let roleData = {
                    name: roles.title,
                    value: roles.id,
                    salary: roles.salary,
                    roleDept: roles.department
                }
            roleArray.push(roleData);
        });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'updateEmp',
                    message: 'Select the employee ID you would like to update',
                    choices: employeeArray
                },
                {
                    type: 'list',
                    name: 'updateRole',
                    message: 'What would you like to change their role to?',
                    choices: roleArray
                }
            ])
                .then(data => {
                    console.log(data)
                    const sql = `UPDATE employees SET employees.role_id = ? WHERE employees.id = ?`;
                    const params = [data.updateRole, data.updateEmp]
                    connection.query(sql, params, (err, res) => {
                        if (err) {
                            return
                        }
                        else{
                            console.log('Employee was updated! Go to "View All Employees" to verify.')
                        }
                    });
                })
        })
    }
}

module.exports = new DB(connection)