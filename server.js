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
        choices: ["Add", "View", "Update", "Exit"]
      }
    ]).then((answers) =>{
        console.log(answers.action)
        if(answers.action === "Add"){
            addToData();
        }else if (answers.action === "View"){
            viewData();
        }else if (answers.action === "Update"){
            updateData();
        }else if (answers.action === "Exit"){
            connection.end();
        }
        
    })
    
};

function addToData(){
    inquirer.prompt([
        {
        name: 'addTarget',
        type: 'list',
        message: 'Would you like to add the departments, the roles or the employees?',
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

function viewData(){
    inquirer.prompt([
        {
        name: 'viewTarget',
        type: 'list',
        message: 'Would you like to view the departments, the roles or the employees?',
        choices: ["Department", "Role", "Employee"]
        }
    ]).then((answers) => {
        console.log(answers.viewTarget)
        if(answers.viewTarget === "Department"){
            viewDepartment();

        }else if (answers.viewTarget === "Role"){
            viewRole();
            
        }else if (answers.viewTarget === "Employee"){
            viewEmployee();
            
        }
        
    })
}

function viewDepartment(){
    connection.query("SELECT * FROM department", (err, res) => {
        if(err) throw err;
        console.table(res);
        initPrompt();
    })
}

function viewRole(){
    connection.query("SELECT * FROM role", (err, res) => {
        if(err) throw err;
        console.table(res);
        initPrompt();
    })
}

function viewEmployee(){
    connection.query("SELECT * FROM employee", (err, res) => {
        if(err) throw err;
        console.table(res);
        initPrompt();
    })
}

function addDepartment(){
    inquirer
      .prompt([
        {
          name: 'deptName',
          type: 'input',
          message: 'What is the name of the department you would like to add?'
        }
      ])
      .then((answers) => {
        connection.query("INSERT INTO department (name) VALUES (?)", [answers.deptName], (err, res) => {
            if(err) throw err;
            console.log("Sucessfully added department!")
            initPrompt();
        })
      })
}

function addRole(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, role.roleID, department.name, department.departmentID FROM employee INNER JOIN role ON employee.role_id = role.roleID INNER JOIN department ON role.department_id = department.departmentID", (err, res) => {
        if (err) throw err
        deptArray = []
        for(let i = 0; i < res.length; i++){
            deptArray.push(res[i].departmentID + " " + res[i].name)
        }

    inquirer
      .prompt([
        {
          name: 'roleName',
          type: 'input',
          message: 'What is the name of the role you would like to add?'
        },
        {
          name: 'roleSalary',
          type: 'input',
          message: 'What is the expected salary of the role being added?'
        },
        {
          name: 'deptID',
          type: 'list',
          message: 'What is the department of the role being added?',
          choices: deptArray
        }
      ])
      .then((answers) => {
        const idAndName = answers.deptID.split(" ")
        let chosenDeptID = idAndName[0]
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.roleName, answers.roleSalary, chosenDeptID], (err, res) => {
            if(err) throw err;
            console.log("Sucessfully added role!")
            initPrompt();
        })
      })
    })
}


function addEmployee(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, role.roleID, department.name, department.departmentID FROM employee INNER JOIN role ON employee.role_id = role.roleID INNER JOIN department ON role.department_id = department.departmentID", (err, res) => {
        if (err) throw err
    roleArray = []
        for(let i = 0; i < res.length; i++){
            roleArray.push(res[i].roleID + " " + res[i].title)

        }
    inquirer
      .prompt([
        {
          name: 'employeeFirst',
          type: 'input',
          message: 'What is the first name of the employee you would like to add?'
        },
        {
          name: 'employeeLast',
          type: 'input',
          message: 'What is the last name of the employee being added?'
        },
        {
          name: 'roleID',
          type: 'list',
          message: 'What is the role of the employee?',
          choices: roleArray
        },
        {
          name: 'managerID',
          type: 'input',
          message: 'What is the employee ID for the manager of the employee?'
        },
      ])
      .then((answers) => {
        const idAndName = answers.roleID.split(" ")
        let chosenRoleID = idAndName[0]
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.employeeFirst, answers.employeeLast, chosenRoleID, answers.managerID], (err, res) => {
            if(err) throw err;
            console.log("Sucessfully added employee!")
            initPrompt();
        })
      })
    })
}

function updateData(){
    connection.query("SELECT employee.first_name, employee.last_name, employee.id, role.title, role.salary, role.roleID, department.name, department.departmentID FROM employee INNER JOIN role ON employee.role_id = role.roleID INNER JOIN department ON role.department_id = department.departmentID", (err, res) => {
        if(err) throw err;
        employeeNameArray = []
        roleArray = []
        for(let i = 0; i < res.length; i++){
            employeeNameArray.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name)
            roleArray.push(res[i].roleID + " " + res[i].title)
        }
        inquirer.prompt([
        {
          name: 'employeeName',
          type: 'list',
          message: 'What is the name of the employee you would like to update?',
          choices: employeeNameArray
        },
        {
          name: 'desiredRole',
          type: 'list',
          message: 'What is the role that you would like to set to the employee?',
          choices: roleArray
        }
      ]).then((answers) => {
          const idAndName = answers.employeeName.split(" ")
          let chosenEmployeeID = idAndName[0]
          const idAndRole = answers.desiredRole.split(" ")
          let chosenRoleID = idAndRole[0]
        console.log(chosenEmployeeID)
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [chosenRoleID, chosenEmployeeID], (err, res) => {
            if(err) throw err;
            console.log("Sucessfully updated the role of " + idAndName[1] + " " + idAndName[2])
            initPrompt();
        })

        })
      })

    
}
