const express = require('express');
const mysql = require('mysql2');
//const cTable = require('console.table');
const figlet = require("figlet");



figlet("Employee Manager",{
    whitespaceBreak: true,
    width: 50,
    horizontalLayout: "default",
    verticalLayout: "default",
}, 
function (err, data) {
    console.log('-------------------------------------------------');
    console.log(data);
    console.log('-------------------------------------------------');
    Table();
});


function Table(){
console.table([
    {
      name: 'foo',
      age: 10
    }, 
    {
      name: 'bar',
      age: 20
    }
  ])
};



