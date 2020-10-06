const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "passwordb1rd",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  initPrompt();
});





function initPrompt() {
    inquirer
    .prompt([
      {
        name: 'action',
        type: 'list',
        message: 'Would you like to view, update or add to your employment team?',
        choices: ["Add", "View", "Update"]
      }
    ]).then((answers) =>{
        console.log(answers.action)
        if(answers.action === "Add"){
            addToData();
        }else if (answers.action === "View"){
            viewData();
        }else if (answers.action === "Update"){
            updateData();
        }
        
    })
    
};



function afterConnection() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        afterAfterConnection();
    });
}

function addToData(){
    inquirer.prompt([
        {
        name: 'addTarget',
        type: 'list',
        message: 'Would you like to add a department, a role or an employee?',
        choices: ["Department", "Role", "Employee"]
        }
    ]).then((answers) => {
        console.log(answers.addTarget)
        if(answers.addTarget === "Department"){
            addDepartment();
        }else if (answers.addTarget === "Role"){
            addRole();
        }else if (answers.addTarget === "Employee"){
            addEmployee();
        }
        
    })
}

