const express = require("express");
const inquirer = require('inquirer');
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
      // MySQL username,
      user: "root",
      // TODO: Add MySQL password here
      password: "B0Rivera6966",
      database: "company_db",
    },
    console.log(`Connected to  company_db`)
  );

  
function questions()
{
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: "choose a following option.",
        choices: ["View all departments.","View all roles.","View all employees.", "Add a department.","Add a role.","Add an employee.","Update an employee role."]
      },
    ])
    .then(answers => {
      let action = answers.action;
      switch (action) 
      {
        case "View all departments.":
          db.query("SELECT * FROM department", function (err, results) {
            console.log(results);
            questions();
          });
          break;
        case  "View all roles.":
          db.query("SELECT * FROM role", function (err, results) {
            console.log(results);
            questions();
          });
          break;
        case  "View all employees.":
          db.query("SELECT * FROM employee", function (err, results) {
            console.log(results);
            questions();
          });
          break;
        case "Add a department.":
          console.log(action);
          // start new inquierer, that creates an object for a post request for department
          break;
        case "Add a role.":
          console.log(action);
          //starters new inquierer, that creates an object for a post request for role
          break;
        case "Add an employee.":
          console.log(action);
          //starts new inquirer, that creates an object for a post request for employee
          break;
        case "Update an employee role.":
          console.log(action);
          //starts a new inquirer, that creats an object for a put request for employee
      }
    })
};


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  questions()
});
//REFERENCES

// db.query("SELECT * FROM course_names", function (err, results) {
//   console.log(results);
// });
//POST
// app.post("/api/new-movie", ({ body }, res) => {
//   const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
//   const params = [body.movie_name];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//     });
//   });
// });

//GET
// app.get("/api/movies", (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

//DELETE
// app.delete("/api/movie/:id", (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Movie not found",
//       });
//     } else {
//       res.json({
//         message: "deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });

//UPDATE
// app.put("/api/review/:id", (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Movie not found",
//       });
//     } else {
//       res.json({
//         message: "success",
//         data: req.body,
//         changes: result.affectedRows,
//       });
//     }
//   });
// });