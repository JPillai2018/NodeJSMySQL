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
  port: 3306,
  user: "root",
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
      choices: ["View Product Sale By Department", "Create New Department"]
    },
  ]).then(function(user) {
  switch(user.choices){
      case "View Product Sale By Department":
          viewProductSaleByDepartment();
          break;
      case "Create New Department":
          createNewDepartment();
          break;
      default: console.log("\n" + "Make a valid selection" + "\n" );
      connection.end();
  }
});
}


// List Departments
function viewProductSaleByDepartment(){

  //console.log("Selecting all products...\n");
  connection.query("SELECT t1.department_id, t1.department_name, t1.over_head_cost, SUM(t2.product_sales) AS sumSales FROM product_sales AS t1 LEFT JOIN products AS t2 ON t1.department_name = t2.department_name GROUP BY t1.department_name", function(err, res) {
    if (err) throw err;
    var i = 0;
    //console.log(res);

    function Sales(departmentId, departmentName, overheadCost){
      this.departmentId = departmentId,
      this.departmentName = departmentName,
      this.overheadCost = overheadCost
    }
    var sales = {};
    var row = "";
    console.log("\n" + "============================================================================================================================"); 
    console.log("\n" + "                                                  Sales - Profit Report                                                     "); 
    console.log("\n" + "============================================================================================================================"); 
    console.log("\n" + "Department ID             Department Name                  Overhead Cost      Product Sales       Total Profit"); 
    console.log("\n" + "============================================================================================================================"); 
    for (var i = 0; i< res.length; i++){
      var dataT = [];
      var deptId = res[i].department_id;
      deptId = padS(deptId, 13, "R"); 
      var deptName = res[i].department_name;
      deptName = padS(deptName, 38, "R"); 
      var overheadCost = res[i].over_head_cost;
      overheadCost1 = padS(overheadCost, 13, "L");
      var productSales = res[i].sumSales;
      if (productSales === null){
        productSales = 0;
      }
      productSales = padS(productSales, 13, "L");
      var totProfit = parseFloat(productSales) - parseFloat(overheadCost);
      totProfit = padS(totProfit, 13, "L");
      console.log("\n" + deptId + " " +  deptName + " "  + overheadCost1 + "         " + productSales + "       " + totProfit); 

      var data = "id:" + deptId + ", name:" + deptName + ", cost:"  + overheadCost1 + ", sales:" + productSales + ", profit:" + totProfit;
      row = row + i;
      var row = new Sales(deptId,deptName,overheadCost1);
      dataT.push(row);
    }
    console.log("\n" + "============================================================================================================================"); 

    connection.end();
  });
}

function createNewDepartment(){
  var inquirer = require("inquirer");
  // Created a series of questions
  inquirer.prompt([
    {
      type: "input",
      name: "deptCode",
      message: "Enter the Department Code: "
    },
    {
      type: "input",
      name: "deptName",
      message: "Enter the Department Name: "
    },
    {
      type: "input",
      name: "overHeadCost",
      message: "Enter the Overhead Cost: "
    }
    ]).then(function(user) {
      //console.log(user);
      deptCode = user.deptCode;
      deptName = user.deptName;
      overheadCost = user.overHeadCost;
      if (isNaN(overheadCost)){
        overheadCost = " ";
      }

      if ((deptCode === "") || (deptCode === " ") || (deptName  === " ") || (overheadCost  === " ") ){
        selectionValid = false;
        console.log("Invalid Input. Please Re-enter!!!");
        console.log("---------------------------------");
        connection.end();
      }
      else
      {
        var query =   connection.query("SELECT *  FROM product_sales WHERE ?",
        {
          department_id:  deptCode
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
              console.log("Department you are entering already exists. Please Add another Department Info!!!");
              console.log("---------------------------------------------------------------------------------");
              connection.end();
            }
            else
            {
              console.log("Item not in Database. Adding !!!");
              var query = connection.query("INSERT INTO product_sales (department_id, department_name, over_head_cost) VALUES ( ?, ?,  ?)" ,
              [
                deptCode,
                deptName,
                overheadCost
              ]
              , function(err, res){
                if (err) throw err;
                console.log("------------------------------------------");
                console.log("Department Code " + deptCode + "(" + deptName + ") Added!!!");
                console.log("------------------------------------------");
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