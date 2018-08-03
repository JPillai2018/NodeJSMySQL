// ========================================================================
// Load the NPM Package inquirer
var itemCode = "";
var itemQuantity = 0;
var selectionValid = false;
var mysql = require("mysql");
var inquirer = require("inquirer");
//Creating Database Connection
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "ilmb719803",
  database: "bamazon"
});

//Connect to the Database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  //createProduct();
  menuSelection();
});

function menuSelection(){
  // Created a series of questions
  inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: "Which of the choices below would you like to select?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    },
  ]).then(function(user) {
  switch(user.choices){
      case "View Products for Sale":
          viewProductsForSale();
          break;
      case "View Low Inventory":
          viewLowInventory();
          break;
      case "Add to Inventory":
          addToInventory();
          break;
      case "Add New Product":
          addNewProduct();
          break;
      default: console.log("\n" + "Make a valid selection" + "\n" );
      connection.end();
  }
});

}

function viewProductsForSale(){
// List Iventory
  //console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var i = 0;
    //console.log(res);
    console.log("\n" + "================================================================================================="); 
    console.log("\n" + "                                   View Products For Sale"                                        ); 
    console.log("\n" + "================================================================================================="); 
    console.log("\n" + "Item ID                Product Name                              Price       Quantity"); 
    console.log("\n" + "================================================================================================="); 
    for (var i = 0; i< res.length; i++){
      var itemId = res[i].item_id;
      var prodName = res[i].product_Name;
      prodName = padS(prodName, 35, "R");
      var prodPrice = res[i].price;
      prodPrice = padS(prodPrice,5, "L");
      var stockQty = res[i].stock_quantity;
      stockQty = padS(stockQty,5, "L");
      console.log("\n" + itemId + "       " +  prodName + "                  "  + prodPrice + "          " + stockQty); 
    }
    console.log("\n" + "================================================================================================="); 
    connection.end();
  });
}

function viewLowInventory(){
  //console.log("Selecting all products...\n");
  connection.query("SELECT *  FROM products WHERE stock_quantity < 200", function(err, res) {
    if (err) throw err;
    var i = 0;
 
    if (res[0].item_id === null){
      console.log("We have Sufficient Stock on all Items!!!");
    }
    else
    {
      console.log("\n" + "========================================================================================"); 
      console.log("\n" + "                      Low Inventory Report (Reorder Level  200 Items)                   "); 
      console.log("\n" + "========================================================================================"); 
      console.log("\n" + "Item ID     Product Name                                          Price    Quantity"); 
      console.log("\n" + "========================================================================================"); 
      for (var i = 0; i< res.length; i++){
        var itemId = res[i].item_id;
        var prodName = res[i].product_Name;
        prodName = padS(prodName, 35, "R");
        var price = parseFloat(res[i].price);
        price = padS(price, 6, "L");
        var qty = res[i].stock_quantity;
        qty = padS(qty, 6, "L");
        console.log("\n" + itemId + "       " +  prodName + "                  "  + price + "      " + qty); 
      }
      console.log("\n" + "========================================================================================"); 
    }
    connection.end();
  });

}

function addToInventory(){
  var inquirer = require("inquirer");
  // Created a series of questions
  inquirer.prompt([
    {
      type: "input",
      name: "itemCode",
      message: "Enter the Item code to Update Inventory Level: "
    },
    {
      type: "input",
      name: "itemQuantity",
      message: "Enter the quantity to add to Inventory: "
    },
    ]).then(function(user) {
      // console.log(user);
      itemCode = user.itemCode;
      if (user.itemCode > " "){
        selectionValid = true;
      }
      itemQuantity = user.itemQuantity;
      if ((itemQuantity === 0) || (itemQuantity === "") || (itemQuantity === " ")){
        selectionValid = false;
      }
      else{
        itemQuantity = parseInt(user.itemQuantity);
        selectionValid = true;
      }
      if (selectionValid){
        //console.log("Code = " + itemCode + " Qnty = " + itemQuantity);
        updateInventory(itemCode, itemQuantity);
      }
      else
      {
        console.log("Please Enter valid item Code or Quantity!!!")
        connection.end();
      }
    });
}

function updateInventory(itemCode, itemQuantiry){
  var query =   connection.query("SELECT *  FROM products WHERE ?",
    {
      item_id:  itemCode
    },
    function (err, res){
      if(err) 
      {   
        throw err;
      }
      else
      {
        if (res.length > 0){
          var currentQuantity =  res[0].stock_quantity;
          var newQuantity =  parseInt(currentQuantity) + parseInt(itemQuantity);
          console.log("---------------------------------------------------------------------------------------------------");
          console.log("Item Available. Please wait while we process")
          console.log("Updated Qnty = " + newQuantity);
          console.log("---------------------------------------------------------------------------------------------------");
          var query = connection.query("UPDATE  products SET ? WHERE ?",
          [
            {
              stock_quantity: parseInt(newQuantity)
            },
            {
              item_id: itemCode
            }
          ], function(err, res){
            if (err) throw err;
            console.log("---------------------------------------------------------------------------------------------------");
            console.log("Inventory Replenished. New level is " + newQuantity );
            console.log("---------------------------------------------------------------------------------------------------");
            connection.end();
          }
        )
        }
        else{
          console.log("--------------------------------------------------------------------------------");
          console.log("Item you are trying to update Inventory is not available. Please add the Item!!!");
          console.log("--------------------------------------------------------------------------------");
          connection.end();
        }
      }
    }
  )
}

function addNewProduct(){
  var inquirer = require("inquirer");
  // Created a series of questions
  inquirer.prompt([
    {
      type: "input",
      name: "itemCode",
      message: "Enter the Item code: "
    },
    {
      type: "input",
      name: "itemName",
      message: "Enter the Item Name: "
    },
    {
      type: "input",
      name: "departmentName",
      message: "Enter the Product Line: "
    },
    {
      type: "input",
      name: "itemPrice",
      message: "Enter the Price: "
    },
    {
      type: "input",
      name: "itemQuantity",
      message: "Enter the Quantity: "
    }
    ]).then(function(user) {
      //console.log(user);
      itemCode = user.itemCode;
      itemName = user.itemName;
      itemDepartment = user.departmentName;
      var itemprice = user.itemPrice;
      if (itemprice.trim() != ""){
        itemPrice = parseFloat(user.itemPrice);
      }
      else
      {
        itemPrice = itemprice;
      }
      var itemquantity = user.itemQuantity;
      if (itemquantity.trim() != ""){
        itemQuantity = parseFloat(user.itemQuantity);
      }
      else
      {
        itemQuantity = itemquantity;
      }


      if ((itemCode.trim() === "") || (itemCode === " ") || (itemName.trim()  === "") || (itemDepartment.trim()  === " ") || (itemPrice  === 0) || (itemPrice  === "") || (itemQuantity  === 0) || (itemQuantity  === "")){
        selectionValid = false;
        console.log("Invalid Input. Please Re-enter!!!");
        console.log("---------------------------------");
        connection.end();
      }
      else
      {
        var query =   connection.query("SELECT *  FROM products WHERE ?",
        {
          item_id:  itemCode
        },
        function (err, res){
          if(err) 
          {   
            throw err;
          }
          else
          {
            if (res.length > 0)
            {
              console.log("Item you are entering already exists. Please try updating the Inventory or Add another Item Code!!!");
              console.log("---------------------------------------------------------------------------------------------------");
              connection.end();
            }
            else
            {
              console.log("Item not in Database. Adding !!!");
              var query = connection.query("INSERT INTO products (item_id, product_Name, department_name, price, stock_quantity) VALUES ( ?, ?,  ?,  ?,  ?)" ,
              [
                itemCode,
                itemName,
                itemDepartment,
                itemPrice,
                itemQuantity
              ]
              , function(err, res){
                if (err) throw err;
                console.log("---------------------------------------------------------------------------------------------------");
                console.log("Item " + itemCode + "(" + itemDepartment + "-" + itemName + " Added!!!");
                console.log("---------------------------------------------------------------------------------------------------");
                connection.end();
                }
              )
            }
          }
        })
      }
    })
  }

// Function to Padd a character to the left or right of a string
function padS(strng, maxLength, R){
  //console.log("Padding Side=" + strng + "-" + maxLength + "-" + R);
  strng = strng.toString();
  var strngLength = strng.length;
  if (!strng || strngLength >= maxLength){
    return strng;
  }
  var maxL = (parseInt(maxLength) - strngLength);
  for (var i = 0; i < maxL; i++){
    if (R === "R"){
      strng = strng + " ";
    }
    else
    {
      strng = " " + strng;
    }
  }
  return strng;
}