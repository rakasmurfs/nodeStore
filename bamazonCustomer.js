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

function displayTable()
{
    connection.query("SELECT item_id AS 'ID', product_name AS 'Product', price AS 'price' FROM products", function(error,res)
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

function purchaseProducts()
{
    connection.query("SELECT * FROM products", function(error,product)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            inquirer
            .prompt([
                {
                type: "input",
                message: "Please enter the ID of the item you would like to buy.",
                name: "idSelected"
                },
                {
                    type: "input",
                    message: "How many would you like to purchase?",
                    name: "quantity"
                }   
            ])
            .then(answers => 
                {
                    var parsedID = parseInt(answers.idSelected);
                    var parsedQuantity = parseInt(answers.quantity);
                    let i = parsedID - 1;
                    if(answers.quantity <= product[i].stock_quantity)
                    {
                        var currentOrder = parsedQuantity * product[i].price;
                        product[i].product_sales += currentOrder;
                        product[i].stock_quantity -= parsedQuantity;  
                        console.log(product[i].product_sales);
                        //console.log(product[i]);          
                        updateDatabase(parsedID, product[i].stock_quantity, product[i].product_sales, currentOrder);
                    }
                    else console.log("Sorry we don't have enough stock for that purchase.");
                });            
        }
    })
}

function updateDatabase(itemID, quantity, productSales, currentOrder)
{
    connection.query("UPDATE products SET stock_quantity = (?), product_sales = (?) WHERE item_id = (?)", [quantity, productSales, itemID], function(error,res)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log("You spent: " + currentOrder + "\nDatabase updated.");
        }
    })
}





connection.connect(function(error){
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("You have successfully connected");
        displayTable();
        purchaseProducts();
    }
})