var express = require("express");
var app= express();
var ejs = require("ejs");
//var bodyParser= require("body-parser");


//////////middleware////////////
app.use("view engine","ejs")
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.static("/public"));

app.get("/",function(req,res){
    //res.render("index.ejs");
    res.send("hey there");
});
app.listen(3000,function()
{
    console.log("server satrted");
});
