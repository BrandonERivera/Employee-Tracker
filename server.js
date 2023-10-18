const express = require("express");
const inquirer = require('inquirer');
const path = require('path');
const mysql = require("mysql2");
const { clog } = require('./middleware/clog');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(clog);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "B0Rivera6966",
      database: "company_db",
    },
    console.log(`Connected to  company_db`)
  );

  
const questions = () =>
{
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: "choose a following action.",
        choices: ["View all departments.","View all roles.","View all employees.", "Add a department.","Add a role.","Add an employee.","Update an employee role."]
      },
    ])
    .then(answers => {
      let action = answers.action;
      switch (action) 
      {
        case "View all departments.":
          db.query("SELECT id AS department_id, name AS department_name FROM department", function (err, results) {
            console.log(results);
            questions();
          });
          break;
        case  "View all roles.":
          db.query("SELECT role.id AS role_id, title, salary, department.name AS Department_name FROM role JOIN department ON role.department_id = department.id", function (err, results) {
            console.log(results);
            questions();
          });
          break;
        case  "View all employees.":
          db.query("SELECT employee.id AS Employee_id, CONCAT(employee.first_name, employee.last_name) AS Employee_NAME, role.title AS Role, role.salary AS Salary, department.name AS Department, CONCAT(employee.manager_id) AS Manager_Id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;", function (err, results) {
            console.log(results);
            questions();
          });
          break;
        case "Add a department.":
          inquirer
            .prompt([
              {
                name: "name",
               type: "input",
                message: "What is the department Name?",
              }
            ])
            .then(answers => {
                let sql = `INSERT INTO department (name) VALUES (?)`;
                let params = [answers.name];
                db.query(sql, params, (err, result) => {
                console.log(result);
                questions();
              });
            });
          break;
        case "Add a role.":
          inquirer
            .prompt([
              {
                name: "department_id",
                type: "input",
                message: "What is the department id this role belongs to?",
              },
              {
                name: "rolename",
                type: "input",
                message: "What is the roles name?",
              },
              {
                name: "rolesalary",
                type: "input",
                message: "What is the roles salary?",
              }
            ])
            .then(answers => {
                let sql = `INSERT INTO role(department_id, title, salary) VALUES (?,?,?)`;
                let params = [answers.department_id, answers.rolename, answers.rolesalary];
                console.log(params);
                db.query(sql, params, (err, result) => {
                console.log(result);
                questions();
              });
            });
          break;
        case "Add an employee.":
          inquirer
          .prompt([
            {
              name: "firstname",
              type: "input",
              message: "What is the employee first name?",
            },
            {
              name: "lastname",
              type: "input",
              message: "What is the employee last name?",
            },
            {
              name: "role_id",
              type: "input",
              message: "What is the role id?",
            },
            {
              name: "manager_id",
              type: "input",
              message: "What is the manager id #?",
            }
          ])
          .then(answers => {
              const sql = `INSERT INTO employee(role_id, first_name, last_name, manager_id) VALUES (?,?,?,?)`;
              const params = [answers.role_id, answers.firstname, answers.lastname, answers.manager_id]
              console.log(params)
              db.query(sql, params, (err, result) => {
              console.log(result);
              questions();
            });
          });
          break;
        case "Update an employee role.":
          inquirer
            .prompt([
            {
              name: "id",
              type: "input",
              message: "What is the employees id?",
            },
            {
              name: "role_id",
              type: "input",
              message: "What is the role id?",
            },
          ])
          .then(answers =>{
          let sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
          let params = [answers.role_id, answers.id];
          db.query(sql, params,(err, result) => {
            console.log(result)
            questions();
          });
        });
      };
    })
};

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  questions()
});