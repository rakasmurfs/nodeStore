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

//Could not get this function to work the way I wanted, issues with mysql
function departmentSales()
{
    connection.query("SELECT department_id AS 'ID', departments.department_name AS 'Department', over_head_costs AS 'Overhead', product_sales AS 'Sales' FROM departments JOIN products ON products.department_name = departments.department_name", function(error,res)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            cTable.getTable([res]);
            console.table(res);
        }
    })
}


function newDepartment()
{
    inquirer
    .prompt([
        {
            type: "input",
            message: "Please enter the name of the new department.",
            name: "newDepartmentName"
        },
        {
            type: "input",
            message: "Please enter the departments overhead costs.",
            name: "departmentOverhead"
        }
      
    ])
    .then(answers => 
        {
            let departmentOverhead = parseInt(answers.departmentOverhead);
            connection.query("INSERT INTO departments(department_name, over_head_costs) VALUES((?), (?))",[answers.newDepartmentName, departmentOverhead], function(error,res)
            {
                if(error)
                {
                    console.log(error);
                }
                else
                {
                    console.log("New department added to database.");
                    inquiry();
                }
            })
        });
}

function inquiry()
{
    inquirer
    .prompt(
    [
        {
        type: "list",
        choices:["View Product Sales by Department", "Add new department"],
        name: "action"
        },   
    ])
    .then(function(inquirerResponse) {
        if(inquirerResponse.action === "View Product Sales by Department")
        {
            departmentSales();
        };
        if(inquirerResponse.action === "Add new department")
        {
            newDepartment();
        };
    });
};


connection.connect(function(error){
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("You have successfully connected");
        inquiry();
    }
})