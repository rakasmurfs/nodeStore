const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql=require("mysql");
const connection=mysql.createConnection(
{
    host:"localhost",
    port:"8889",
    user:"root",
    password:"root",
    database:"bamazon"
});

function restock()
{
    inquirer
    .prompt([
        {
        type: "input",
        message: "Please enter the ID of the item you are restocking.",
        name: "idSelected"
        },
        {
            type: "input",
            message: "Please enter order quantity.",
            name: "quantity"
        }   
    ])
    .then(answers => 
        {
            var parsedID = parseInt(answers.idSelected);
            var parsedQuantity = parseInt(answers.quantity);
            connection.query("UPDATE products SET stock_quantity = stock_quantity + (?) WHERE item_id = (?)",[parsedQuantity, parsedID], function(error,res)
            {
                if(error)
                {
                    console.log(error);
                }
                else
                {
                    inquiry();
                }
            })
        });
};

function viewLowStock()
{
    connection.query("SELECT item_id AS 'ID', product_name AS 'Product', department_name AS 'Department', price AS 'Price', stock_quantity AS 'Current Stock' FROM products WHERE stock_quantity < 5", function(error,res)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            cTable.getTable([res]);
            console.table(res);
            inquiry();
        }
    })
};

function viewProducts()
{
    connection.query("SELECT item_id AS 'ID', product_name AS 'Product', department_name AS 'Deparment', price AS 'Price', stock_quantity AS 'Current Stock' FROM products", function(error,res)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            cTable.getTable([res]);
            console.table(res);
            inquiry();
        }
    })
};

function addNewProduct()
{
    inquirer
    .prompt([
        {
            type: "input",
            message: "Please enter the name of the new product.",
            name: "productName"
        },
        {
            type: "input",
            message: "Please enter the name of the new product's department. \n 'Appliances' or 'Electronics' ",
            name: "productDepartment"
        },
        {
            type: "input",
            message: "Please enter the products price.",
            name: "productPrice"
        },
        {
            type: "input",
            message: "Please enter the product's initial stock amount.",
            name: "initialStock"
        }            
    ])
    .then(answers => 
        {
            let parsedPrice = parseInt(answers.productPrice);
            let parsedQuantity = parseInt(answers.initialStock);
            connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES((?), (?), (?), (?))",[answers.productName, answers.productDepartment, parsedPrice, parsedQuantity], function(error,res)
            {
                if(error)
                {
                    console.log(error);
                }
                else
                {
                    inquiry();
                }
            })
        });
};

function inquiry()
{
    inquirer
    .prompt(
    [
        {
        type: "list",
        choices:["View Products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "action"
        },   
    ])
    .then(function(inquirerResponse) {
        if(inquirerResponse.action === "View Products for sale")
        {
            viewProducts();
        };
        if(inquirerResponse.action === "View Low Inventory")
        {
            viewLowStock();
        };
        if(inquirerResponse.action === "Add to Inventory")
        {
            restock();
        };
        if(inquirerResponse.action === "Add New Product")
        {
           addNewProduct(); 
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