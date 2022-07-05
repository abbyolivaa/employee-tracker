const db = require('./config/functions');
const inquirer = require('inquirer');


// Question for employers choice
const employeeUpdate = () => {
    inquirer.prompt([
        {
            type: 'list', 
            name: 'employeeChoice',
            message: 'Where would you like to start?',
            choices: [
                'View Departments',
                'View Roles',
                'View All Employees',
                'View Employees by Manager',
                'View Employees by Department',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                "Update an Employee's Role",
                'Exit'
            ]
        }
    ]) .then((answer) => {
        switch(answer.employeeChoice){
            case 'View Departments': viewDepartments();
            break;

            case 'View Roles': viewRoles();
            break;

            case 'View All Employees' : viewEmployees();
            break;

            case 'View Employees by Manager' : viewEmployeesByMgr();
            break;

            case 'View Employees by Department' : viewEmployeesByDept();
            break;

            case 'Add a Department': addDepartment();
            break;

            case 'Add a Role': addRole();
            break;

            case 'Add an Employee': addEmployee();
            break;

            case "Update an Employee's Role": updateRole();
            break;

        }
    })
};

// view departments function
function viewDepartments() {
    db.viewDepartments()
}
// view roles function
function viewRoles() {
    db.viewRoles()
}
// view all employees function
function viewEmployees() {
    db.viewEmployees()
}
// view employees by manager function
function viewEmployeesByMgr() {
    db.viewEmployeesByMgr()
}
// view employees by department function
function viewEmployeesByDept() {
    db.viewEmployeesByDept()
}
// add a department function
function addDepartment() {
    db.addDepartment()
}
// add a role function
function addRole() {
    db.addRole()
}
// add an employee function
function addEmployee() {
    db.addEmployee()
}
// update an employee's role function
function updateRole() {
    db.updateRole()
}

employeeUpdate()