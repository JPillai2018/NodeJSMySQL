

DROP database IF EXISTS bamazon;

CREATE DATABASE bamazon;

Use bamazon;

Create Table products (
    item_id char(5) not null UNIQUE,
	product_Name CHAR(30) ,
    department_name char(15),
    price decimal(10,2) ,
    stock_quantity int(10),
    product_sales DECIMAL(10,2),
    primary key(item_id)
    
);

Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK001", "First Day Jitters             ", "Books", 5.39, 120, 330.00);
Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK002", "Welcome Little One            ", "Books", 4.47, 100, 340.00);
Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK003", "A long Walk to Water          ", "Books", 5.49, 50, 670.00);
Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK004", "Mail order Bride              ", "Books", 9.49, 80, 456.00);
Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK005", "Owl Diaries                   ", "Books", 3.99, 250, 800.00);
Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK006", "Dragon Masters                ", "Books", 11.99, 250, 900.00);
Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK007", "Are you My Mother             ", "Books", 15.99, 250, 130.00);
Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK008", "Goodnight Gorilla             ", "Books", 23.99, 123, 450.00);
Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK009", "I Prayed for You              ", "Books", 13.99, 120, 0.00);
Insert into products (item_id, product_Name, department_name, price, stock_quantity, product_sales)
values ("BK010", "Baby Baluga                   ", "Books", 06.99, 111, 0.00);
select * from products;

Create Table product_sales (
    department_id char(5) NOT NULL UNIQUE,
    department_name char(15) NOT NULL,
    over_head_cost DECIMAL(10,2),
    primary key(department_id)
);

Insert into product_sales (department_id, department_name, over_head_cost)
values ("D0001", "Books", 600.00);
Insert into product_sales (department_id, department_name, over_head_cost)
values ("D0002", "Toys", 900.00);
Insert into product_sales (department_id, department_name, over_head_cost)
values ("D0003", "Electronics", 5600.00);
Insert into product_sales (department_id, department_name, over_head_cost)
values ("D0004", "Computers", 4500.00);
Insert into product_sales (department_id, department_name, over_head_cost)
values ("D0005", "Games", 600.00);
