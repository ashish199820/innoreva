var express =require("express");
var app =express();
//var request= require("request");
var ejs= require("ejs");
var galleryRoute = require('./router/galleryRoute');

//app.use("/gallery",galleryRoute);
app.set("view engine","ejs");   ///set template engine to ejs
//app.use("bodyParser.urlencoded{extended:true");
//////it will have two routes 1. search 2. result
app.use("/public",express.static(__dirname+'/public'));
app.use('/gallery',galleryRoute);


app.get("/",function(req,res)
{
   // var data = JSON.parse(req.body);
    res.render("index");
    //res.send("hey there");
})

app.listen(3000,function(){
    console.log("started!!!");
})
