// ========================================================================
// Load the NPM Package inquirer
var itemCode = "";
var itemQuantity = 0;
var selectionValid = false;
var mysql = require("mysql");

//Creating Database Connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ilmb719803",
  database: "bamazon"
});

//Connect to the Database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  listAllItems();
  //buyItems();
});


// List Iventory
function listAllItems(){
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var i = 0;
    console.log("\n" + "===================================================================================="); 
    console.log("\n" + "                                Products For Sale"); 
    console.log("\n" + "===================================================================================="); 
    console.log("\n" + "Item ID     Product Name                                         Price     Quantity"); 
    console.log("\n" + "===================================================================================="); 
    for (var i = 0; i< res.length; i++){
      var itemId = res[i].item_id;
      var prodName = res[i].product_Name;
      prodName = padS(prodName, 35, "R");
      var price = res[i].price;
      price = padS(price, 6, "L");
      var qty = res[i].stock_quantity;
      qty = padS(qty, 6, "L");
      console.log("\n" + itemId + "       " +  prodName + "                  "  + price + "      " + qty); 
    };
    console.log("\n" + "===================================================================================="); 
    buyItems();
  });
}

// Item Purchase Inquiry
function buyItems(){
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
      name: "itemQuantity",
      message: "Enter the quantity: "
    },
    ]).then(function(user) {
      itemCode = user.itemCode;
      if (user.itemCode.trim() === ""){
        selectionValid = false;
      }
      else{
        selectionValid = true;
      }
      itemQuantity = user.itemQuantity;
      if (isNaN(itemQuantity)){
        itemQuantity = 0;
        selectionValid = false;
      }
      else{
        itemQuantity = parseInt(itemQuantity);
      }

      if ((itemQuantity >= 0) && (selectionValid)){
        selectionValid = true;
      }
      else{
        selectionValid = false;
      }

      if (selectionValid){
        purchaseItem(itemCode, itemQuantity);
      }
      else
      {
        console.log("Please Enter valid item Code or Quantity!!!")
        connection.end();
      }
    });
  };

  function purchaseItem(itemCode, itemQuantity){
    var query =   connection.query("SELECT *  FROM products WHERE ?",
      {
        item_id:  itemCode
      },
      function (err, res){
        if (err) throw err; 
        if (res.length > 0){
          if (res[0].stock_quantity >= parseInt(itemQuantity)){
            var currTotalPrice = parseFloat(res[0].product_sales);
            console.log("Item Available. Please wait while we process")
            console.log("\n" + "===================================================================================="); 
            var updateQnty = parseInt(res[0].stock_quantity - itemQuantity);
            var itemName = res[0].product_Name;
            var itemCat = res[0].department_name;
            var itemPrice = parseFloat(res[0].price);
            var totPrice = parseFloat(itemPrice) * parseFloat(itemQuantity);
            totPrice = totPrice + currTotalPrice;
  
            var query = connection.query("UPDATE  products SET ? WHERE ?",
            [
              {
                stock_quantity: parseInt(updateQnty),
                product_sales: parseInt(totPrice)
              },
              {
                item_id: itemCode
              }
            ], function(err, res){
              if (err) throw err;
              var totPrice = parseFloat(itemPrice) * parseFloat(itemQuantity);
              console.log("\n" + "===================================================================================="); 
              console.log("\n    Your order is successfully completed.")
              console.log("\n" + "===================================================================================="); 
              console.log("Total Price for " + itemQuantity + " " + itemCat + "(" + itemCode + "-" + itemName +  ")" + " is $" + totPrice);
              console.log("\n" + "===================================================================================="); 
              connection.end();
            }
          )
          }
          else
          {
            console.log("Insufficient Quanity!!!. Please check back later!!!!");
            connection.end();
          }
        }
        else
        {
          console.log("Item not Found!!!. Please try again!!!!");
          connection.end();
        }
      }
    )
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