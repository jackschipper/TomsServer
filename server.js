

// Create the DB when server starts or create it prior in MYSQL UI

// How to transfer over db object to other .js files

// module?

// when i try to create DB in code, if i include database in 'createConnection'
// i get 'Unknown Database'

// if DB already exists, and I comment out creating the DB in code, the creating
// tables works fine. It needs the 'database: tomsdb' to know where to put data.
// how do i get around this?


const http = require("http"),
url  = require("url"),
path = require("path"),
fs   = require("fs"),
express = require("express"),
readline = require("readline");
prompt = require('prompt-sync')();
mysql = require('mysql');

var app = express();

const server = http.createServer(function (req, res) {

var pathname=__dirname+url.parse(req.url).pathname;
if (path.extname(pathname)=="") {
    pathname+="/";
}

if (pathname.charAt(pathname.length-1)=="/"){
    if (pathname.charAt(pathname.length-2 == "/")) {
        console.log("HIT");
        pathname = pathname.substring(0, pathname.length - 1);
    }
    pathname+="index.html";
    console.log(pathname);
}

fs.exists(pathname,function(exists){
    if(exists){
        switch(path.extname(pathname)){
            case ".html":
                res.writeHead(200, {"Content-Type": "text/html"});
                break;
            case ".js":
                res.writeHead(200, {"Content-Type": "text/javascript"});
                break;
            case ".css":
                res.writeHead(200, {"Content-Type": "text/css"});
                break;
            case ".gif":
                res.writeHead(200, {"Content-Type": "image/gif"});
                break;
            case ".jpg":
                res.writeHead(200, {"Content-Type": "image/jpeg"});
                break;
            case ".png":
                res.writeHead(200, {"Content-Type": "image/png"});
                break;
            default:
                res.writeHead(200, {"Content-Type": "application/octet-stream"});
        }
        fs.readFile(pathname,function (err,data){
            res.end(data);
        });
    } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>404 Not Found!!</h1>");
    }
 });

});

server.listen(3001, "127.0.0.1");
console.log("Server running at http://127.0.0.1:3001/");


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'tomsdb'
});

db.connect(err => {
    if (err) {
    console.log('DB ERRORRRRRR', err);
    }
    else {
        console.log("Successfull connection to DataBase");
    }
})


//create database

//
// let sql = "CREATE DATABASE tomsdb"
// db.query(sql, err => {
//
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("Database Created");
//     }
// });

//create tables
//
// sql = "CREATE TABLE MyTables(id int AUTO_INCREMENT, coordx VARCHAR(255), coordy VARCHAR(255), PRIMARY KEY(id))"
// db.query(sql, err => {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log("MyTables table created");
//     }
//   });


//testing data input

var endCase = 0;
console.log('Entering table data...');
  //while (endCase == 0) {
  //  var coordxT = prompt('Enter coordx: ', '\n');
  //  var coordyT = prompt('Enter coordy: ', '\n');
    let post = {coordx: 125, coordy: 150 }
    let sql = "INSERT INTO MyTables SET ?";
    let query = db.query(sql, post, err => {
      if (err) {
        console.log("YOU MESSED UP!");
        throw err;
      }
      console.log('Table added');
      })
      //var  temp = prompt("add another table? (Y/N): ");
      // if (temp == 'Y' || temp == 'y') {
      //   endCase = 0;
      // }
      // else if (temp == 'N' || temp == 'n') {
      //   endCase = 1;
      //   console.log('Exiting table additions...');
      // }
  //}

  // module.exports = {
  //   db: db,
  // };
