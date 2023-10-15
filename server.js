const express = require("express");
const inquirer = require('inquirer');
const mysql = require("mysql2");
const { clog } = require('./middleware/clog');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(clog);

// const db = mysql.createConnection(
//     {
//       host: "localhost",
//       // MySQL username,
//       user: "root",
//       // TODO: Add MySQL password here
//       password: "",
//       database: "",
//     },
//     console.log(`Connected to  -----db`)
//   );

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});