const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }

     viewDepartments = () => {
        const sql = `SELECT departments_name FROM departments;
        SELECT title FROM roles`
    }

    viewRoles = () => {
        const sql =`SELECT roles.id, roles.title, departments.name as departments, roles.salary FROM roles 
        LEFT JOIN departments ON roles.department_id = departments.id;`
    }

    viewEmployees = () => {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.department_id, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN employee manager ON manager.id = employee.manager_id
        INNER JOIN roles ON employee.role_id = roles.id
        INNER JOIN departments ON departments.id = roles.department_id;`

    }

    addDepartment = () => {
        const sql =``
    }

    addRole = () => {
        const sql = ``
    }

    addEmployee = () => {
        const sql = ``
    }

    updateRole = () => {
        const sql = ``
    }


}

module.exports = new DB(connection)