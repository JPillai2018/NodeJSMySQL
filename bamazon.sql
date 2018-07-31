

DROP database IF EXISTS bamazon;

CREATE DATABASE bamazon;

Use bamazon;

Create Table products (
    item_id char(5) not null UNIQUE,
	product_Name VARCHAR(30) ,
    department_name varchar(25),
    price decimal(10,2) ,
    stock_quantity int(10),
    primary key(item_id)
);

Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK001", "First Day Jitters", "Books", 5.39, 120);
Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK002", "Welcome Little One", "Books", 4.47, 100);
Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK003", "A long Walk to Water", "Books", 5.49, 50);
Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK004", "Mail order Bride", "Books", 9.49, 80);
Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK005", "Owl Diaries", "Books", 3.99, 250);
Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK006", "Dragon Masters", "Books", 11.99, 250);
Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK007", "Are you My Mother", "Books", 15.99, 250);
Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK008", "Goodnight Gorilla", "Books", 23.99, 123);
Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK009", "I Prayed for You", "Books", 13.99, 120);
Insert into products (item_id, product_Name, department_name, price, stock_quantity)
values ("BK010", "Baby Baluga", "Books", 06.99, 111);
select * from products
