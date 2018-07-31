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

         On Terminal, type node bamazonCustomer. App displays all the items to purchase on the terminal. Also prompt for Item code. A valid item from the list and quantity of the item to be purchased should be entered. Upo msuccesssful processing, a message indicating that "Your order is process" and the Item name, quantity and total purchase value will be displayed.
        <!-- Images -->
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Customer-1.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Customer-2.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Customer-3.PNG)]

        If incorrect Item code is entered a validation message will be displayed
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Customer-4.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Customer-5.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Customer-5.PNG)]

2. Manager View
    This has four options-
        -View Products for Sale- The option list all products available for sale.
        -View Low Inventory - This option list all products that are due to replenish when the stock level falls below the threshold value.
        -Add to Inventory - This option lets the Manager update teh inventory level.
        -Add New Product - This option lets the manager add a new item in to the system.

        On Terminal type Node bamazonManager. App displays four selection options. 
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-1.PNG)]

        Select the first option - View Products for Sale - Lists all the items available for sale.
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-2.PNG)]

        Select second option-View Low Inventory- from the list. This list all items with quantity fall below a specific value- For this app currently set as 5.
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-3.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-4.PNG)]

        Select the third option-Add to Inventory- This will help the manager update the inventory levels for a given item. Upon successful update Inventory levels will be updated with existing stock + new stock value. 
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-5.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-6.PNG)]

        If an invalid Item code is entered, a user validation message will be displayed. If invalid Item code or qty is entered or no value is inputted, a validation message will be displayed.
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-7.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-8.PNG)]

        Select fourth option-Add a New Product- This will let the manager add a new item of an existing department/product line. App prompts for Item code, name, department, price. Upon successful addition, new item will be listed under items available for purchase.
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-9.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-10.PNG)]

        If attempted to enter an existing item, then a user validation message will be displayed. If any entry is invalid a user validation message will be displayed.
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-11.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-12.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Manager-13.PNG)]



3. Supervisor View
    This has two options- Necessary user input validations are provided.
        -View Product Sale by Department- This gives a report of all the departments Total Sales and Profit for each department. 
        -Create new department- This option allws the supervisor to add a new department (line of product) to the system.

    On Terminal, type Node bamazonSupervisor. This gives two  to choose from. First option list a Product sales report by department.
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Supervisor-1.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Supervisor-2.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Supervisor-3.PNG)]

        Second option lets the supervisor add a new department/line of products. This prompts for details such as Department code, name, overhead cost. Upon successful addition, new department will be listed in the sales report.
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Supervisor-4.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Supervisor-5.PNG)]

        If invalid input is entered, a user validation message will be displayed.
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Supervisor-6.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Supervisor-7.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Supervisor-8.PNG)]
        ![(https://github.com/JPillai2018/NodeJSMySQL/blob/master/assets/images/Supervisor-9.PNG)]
        

- Future enhancements
    - Some integrity constraints can be amended- Such as when a new item is added, check if the department that item belongs is already in the system.
