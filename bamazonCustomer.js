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


function readProducts()
{
    connection.query("SELECT * FROM products", function(error,res)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            const placeholderArray=[res];
            var productArray = [];
            //console.log(res);
            for(var i=0; i < res.length; i++)
            {            
                //placeholderArray.push(res[i]);
                productArray.push(res[i]);
                delete productArray[i].department_name;
                delete productArray[i].stock_quantity;
                delete productArray[i].product_sales;
            }
            console.log(placeholderArray[0]);
            cTable.getTable([productArray]);
            console.table(productArray);
            inquiry(placeholderArray);
        }
    })
}

function inquiry(product)
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
        console.log(i);
        console.log(product[i]);
        if(answers.quantity <= product[i].stock_quantity)
        {
            var totalPrice = parsedQuantity * product[i].price;
            product[i].product_sales += totalPrice;  
            console.log(product[i].product_sales);          
        }
        else console.log("Sorry we don't have enough stock for that purchase.");
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
        //insertSongs('sweatpants', 'childish gambino', 'rap');
        readProducts();
    }
})