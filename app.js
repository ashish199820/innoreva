var express =require("express");
var dotenv = require("dotenv");
var app =express();
var bodyParser=require("body-parser");
var mongoose = require('mongoose');
var jwt = module.exports = require("jsonwebtoken");
dotenv.config();
var ejs= require("ejs");
var galleryRoute = require('./router/galleryRoute');
var postRoute = require('./router/postRoute');
var projectRoute = require('./router/projectRoute');
var loginRoute = require('./router/loginRoute');
var signupRoute = require('./router/signupRoute');
mongoose.connect("mongodb://localhost/innoreva",{useNewUrlParser:true}).then(()=>{
    console.log("db connected");
});


app.set("view engine","ejs");   ///set template engine to ejs

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//it will have two routes 1. search 2. result
app.use("/public",express.static(__dirname+'/public'));
app.use('/gallery',galleryRoute);
app.use('/post',postRoute);
app.use('/projects',projectRoute);
app.use('/Login',loginRoute);
app.use('/Signup',signupRoute);

app.get("/",function(req,res)
{
   // var data = JSON.parse(req.body);
    res.render("index");
    //res.send("hey there");
})

app.get("/team",function(req,res){
    res.render("team");
})

app.listen(process.env.PORT||3000,function(){
    console.log("started!!!");
})
