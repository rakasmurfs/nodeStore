const cTable = require('console.table');
var inquirer = require('inquirer');
var mysql=require("mysql");
var connection=mysql.createConnection(
{
    host:"localhost",
    port:"8889",
    user:"root",
    password:"root",
    database:"bamazon"
});



function inquiry()
{
    inquirer
    .prompt(
    [
        {
        type: "list",
        choices:[1, 2, 3, 4, 5],
        name: "numberSelected"
        },   
    ])
    .then(function(inquirerResponse) {});
}


connection.connect(function(error){
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("You have successfully connected");
        
    }
})