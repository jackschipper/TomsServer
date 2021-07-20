


//var test = require('mysql');
//import{ db } from './server';


// var sql = "CREATE TABLE MyTables(id int AUTO_INCREMENT, coordx VARCHAR(255), coordy VARCHAR(255), PRIMARY KEY(id))"
// db.query(sql, err => {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log("MyTables table created");
//     }
//   });


//context menu

$(document).ready(function() {

});

var imageList = [];
var counter = 0;
var svg = new SVGimg();

// var bord = new Borders();
// bord.drawBar();
// bord.drawOutline();

function buttonFunc() {
    var button = document.createElement("button");
    document.body.appendChild(button);
    button.innerHTML - "Submit";
    button.type = "submit";
    button.name = "myButton";
    console.log(button);
}

function addTable4Top() {

    console.log("in function");
    var htmlDoc = document.getElementById("svgHolder");
    svg.draw4Top(htmlDoc);
    imageList.push(svg);
    counter = counter+1;
    return imageList;

}

function addTable6Top() {

    console.log("in function");
    var htmlDoc = document.getElementById("svgHolder");
    svg.draw6Top(htmlDoc);
    imageList.push(svg);
    counter = counter+1;
    return imageList;

}


function addTable2Top() {
    console.log("in function");
    var htmlDoc = document.getElementById("svgHolder");
    svg.draw2Top(htmlDoc);
    imageList.push(svg);
    counter = counter+1;
    return imageList;
}

function addTable1Top() {
    console.log("in function");
    var htmlDoc = document.getElementById("svgHolder");
    svg.drawBarStool(htmlDoc);

    imageList.push(svg);
    counter = counter+1;
    return imageList;
}


function ctxMenu(elm) {


    console.log("in contextMenu table funtion");
    console.log("ID", elm);

    if (elm == "deleting") {
        svg.ctx();
    }


}




//buttonFunc();
//buttonFunc();
