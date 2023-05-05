const mysql = require('mysql2');
const figlet = require("figlet");
const cTable = require('console.table');
const inquirer = require('inquirer');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'management_db'
  }
);

//Display Banner with 1st run
function banner(){
  console.log('');
  console.log('-------------------------------------------------');
  console.log(figlet.textSync('Employee Manager', {whitespaceBreak: true, width: 50}));
  console.log('-------------------------------------------------');
  init();
};

//Displays department, role or employee information based on the input
function View(info){
  if(info === 'Departments'){
    db.promise().query(`SELECT * FROM department`) 
    .then((result) => { 
      const table = cTable.getTable(result[0]);
      console.log(table);
      init();
    })
    .catch(console.log)
  }
  else if(info === 'Roles'){
    db.promise().query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`) 
    .then((result) => { 
      const table = cTable.getTable(result[0]);
      console.log(table);
      init();
    })
    .catch(console.log)
  }
  else{
    db.promise().query(
    `SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, CONCAT(mng.first_name, ' ',mng.last_name) AS manager
     FROM employee emp
     INNER JOIN role ON role.id = emp.role_id
     INNER JOIN department ON department.id = role.department_id
     LEFT JOIN employee mng ON emp.manager_id = mng.id`)
    .then((result) => { 
      const table = cTable.getTable(result[0]);
      console.log(table);
      init();
    })
    .catch(console.log)
}};

function Add(info){

  if(info === 'Department'){
    inquirer.prompt(Prompt2).then((answer) => {
      db.query(`INSERT INTO department (name) VALUES ("${answer.Prompt2}")`)
      console.log('Added', answer.Prompt2, 'department to the database');
      init()
    })
  }
  else if(info === 'Role'){
    db.promise().query(`SELECT * FROM department`) 
    .then((result) => { 
      result[0].forEach(element => { choice3.push(element.name) });
      return result[0]  
    })
    .then((roles) => { 
      let depID;
      inquirer.prompt(Prompt3).then((answer) => {
        roles.forEach(element => { if(element.name === answer.Prompt3_3){depID = element.id} });
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.Prompt3_1}", ${answer.Prompt3_2}, ${depID})`); 
        console.log(`Added', answer.Prompt3_1, 'role to the database`);
        init()
      })
    })
    .catch(console.log);
  }
  else{
    let roleID;
    let managerID;

    db.promise().query(`SELECT id, title FROM role`) 
    .then((result) => { 
      result[0].forEach(element => { choice4_1.push(element.title) });
      roleID = result[0];
    })
    .then(() => { 
      db.promise().query(`SELECT id, CONCAT(first_name, ' ', last_name) AS manager  FROM employee`) 
      .then((result) => { 
        result[0].forEach(element => { choice4_2.push(element.manager) });
        managerID = result[0]
      })
      .catch(console.log)
    })
    .then(() => {

      inquirer.prompt(Prompt4).then((answer) => {      
        roleID.forEach(element => { if(element.title === answer.Prompt4_3){ roleID = element.id } }); 
        if(answer.Prompt4_4 === 'None'){managerID = null}
        else{managerID.forEach(element => { if(element.manager === answer.Prompt4_4){ managerID = element.id } })};

        db.promise().query(`INSERT INTO employee (last_name, first_name, role_id) VALUES ("${answer.Prompt4_2}", "${answer.Prompt4_1}", ${roleID})`) 
        .then((result) => {
          db.query(`UPDATE employee SET manager_id = ${managerID} WHERE id = ${result[0].insertId}`);
          init()})
        .catch(console.log)
        console.log('Added', answer.Prompt4_1, answer.Prompt4_2, 'employee to the database');
      })
    })
    .catch(console.log); 
  };
};



//Selects action to be taken based on user input
function AnswerCheck(answer){
  let action1 = answer.Prompt1.split(' ')[0];
  let data1 = answer.Prompt1.split(' ').pop();

  if(action1 === 'View'){ View(data1) }
  else if(action1 === 'Add'){ Add(data1) }
  else{ console.log(answer.Prompt1)};
};

const Prompt1 = [
  { type: 'list', name: 'Prompt1', message: 'Make a selection:', choices: [
    'View All Departments', 
    'View All Roles',	 
    'View All Employees', 
    'Add Department', 
    'Add Role', 
    'Add Employee', 
    'Update Employee Role'
  ] },
];

const Prompt2 = [
  { type: 'input', name: 'Prompt2', message: 'What is the name of the department?' }
];

let choice3 = [];
const Prompt3 = [
  { type: 'input', name: 'Prompt3_1', message: 'What is the name of the role?' },
  { type: 'input', name: 'Prompt3_2', message: 'What is the salary of the role?' },
  { type: 'list', name: 'Prompt3_3', message: 'Whish department does the role belong to?', choices: choice3}
];

let choice4_1 = [];
let choice4_2 = ['None'];
const Prompt4 = [
  { type: 'input', name: 'Prompt4_1', message: "What is the employee's first name?" },
  { type: 'input', name: 'Prompt4_2', message: "What is the employee's last name?" },
  { type: 'list', name: 'Prompt4_3', message: "What is the employee's role?", choices: choice4_1},
  { type: 'list', name: 'Prompt4_4', message: "Who is the employee's manager?", choices: choice4_2}
];

let choice5_1 = [];
let choice5_2 = [];
const Prompt5 = [
  { type: 'list', name: 'Prompt5_1', message: "Which employee's role do you want to update?", choices: choice5_1},
  { type: 'list', name: 'Prompt5_2', message: "Which role do you want to assign the selected employee?", choices: choice5_2}
];


//Asks first set of questions and sends answer for a check
function init(){
  console.log('');
  inquirer.prompt(Prompt1).then((answer) => {
    console.log('');
    AnswerCheck(answer);
  })
};

banner();