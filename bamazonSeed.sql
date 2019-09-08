
--Create database with mock data with the following Query.
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE IF NOT EXISTS bamazon;
USE bamazon;

CREATE TABLE IF NOT EXISTS `bamazon`.`products` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `department_name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `stock_quantity` INT NOT NULL,
  `product_sales` INT NULL,
  PRIMARY KEY (`item_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bamazon`.`departments` (
  `department_id` INT NOT NULL AUTO_INCREMENT,
  `department_name` VARCHAR(45) NOT NULL,
  `over_head_costs` INT NOT NULL,
  PRIMARY KEY (`department_id`))
ENGINE = InnoDB;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Nintendo Switch', 'Electronics', '399', '10');

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('iPad Pro', 'Electronics', '899','5');

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('iPhone XR', 'Electronics', '799', '2');

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Mac Pro', 'Electronics', '5999', '50');

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Pro Display XDR', 'Electronics', '4999', '50');

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('XDR Display Stand', 'Electronics', '999', '50');

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Refridgerator', 'Appliances', '899', '6');

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Dish Washer', 'Appliances', '366', '3');

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Washer Machine', 'Appliances', '549', '3');

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Microwave', 'Appliances', '249' , '20');



INSERT INTO departments(department_name, over_head_costs)
VALUES('Electronics', '25000');

INSERT INTO departments(department_name, over_head_costs)
VALUES('Appliances', '6000');