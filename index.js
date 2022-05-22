const inquirer = require('inquirer');
const mysql = require('mysql2');

let employeesArr = [];
let rolesArr = [];

// Question for employers choice
const employeeUpdate = ()=> {
    inquirer.prompt([
        {
            type: 'list', 
            name: 'employeeChoice',
            message: 'Where would you like to start?',
            choices: [
                'View Departments',
                'View Roles',
                'View All Employees',
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

            case 'View all Employees' : viewAllEmployees();
            break;

            case 'Add a Department': addDepartment();
            break;

            case 'Add a Role': addRole();
            break;

            case 'Add an Employee': addEmployee();
            break;

            case "Update an Employee's Role": updateEmployeeRole();
            break;

        }
    })
};

// view departments function

// view roles function

// view all employees function

// add a department function

// add a role function

// add an employee function

// function to push into empty array

// update an employee's role function