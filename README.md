**Instructions**
This is a simple Application using Node.js and MySQL
The function of this app is to simulate a sales application with Customer, Manager and Supervisor view.
This is terminal interactive CLI App requiring NPM installs with inquirer and mysql.  
Basically an inventory system, developed using mySQL database - bamazon. This database has two tables producs and product_sales. Uses JOIN, GROUP BY and SUM with PRIMARY and FOREIGN keys.
Products table containes all the available products and product_sales table contains all teh departments the products belong to.
The app has three options
1. Customer View
    This has one options- 
        -Purchase- Option list all available items and ask for Item code and quantity. Upo successful purchase a bill is displayed showing item and total amount. App provides user input validations.

        <!-- Images -->
        ![Images showing the actual process flow]()

2. Manager View
    This has four options-
        -View Products for Sale- The option list all products available for sale.
        -View Low Inventory - This option list all products that are due to replenish when the stock level falls below the threshold value.
        -Add to Inventory - This option lets the Manager update teh inventory level.
        -Add New Product - This option lets the manager add a new item in to the system.

3. Supervisor View
    This has two options- Necessary user input validations are provided.
        -View Product Sale by Department- This gives a report of all the departments Total Sales and Profit for each department. 
        -Create new department- This option allws the supervisor to add a new department (line of product) to the system.



- Future enhancements
    - Some integrity constraints can be amended- Such as when a new item is added, check if the department that item belongs is already in the system.
