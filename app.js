var express =require("express");
var dotenv = require("dotenv");
var app =express();
var bodyParser=require("body-parser")
//var request= require("request");
dotenv.config();
var ejs= require("ejs");
var galleryRoute = require('./router/galleryRoute');
var postRoute = require('./router/postRoute')

//app.use("/gallery",galleryRoute);
app.set("view engine","ejs");   ///set template engine to ejs
app.use("bodyParser.urlencoded{extended:true");
//////it will have two routes 1. search 2. result
app.use("/public",express.static(__dirname+'/public'));
app.use('/gallery',galleryRoute);
app.use('/post',post);


app.get("/",function(req,res)
{
   // var data = JSON.parse(req.body);
    res.render("index");
    //res.send("hey there");
})

app.listen(process.env.PORT||3000,function(){
    console.log("started!!!");
})
