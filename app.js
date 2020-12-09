var express = require("express");
var dotenv = require("dotenv");
var app = express();
var cors =require('cors');
var bodyParser = require("body-parser");
var mongoose = require('mongoose'),
    passport = require("passport");
app.use(cors());
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./model/user");
var jwt = module.exports = require("jsonwebtoken");
dotenv.config();
var ejs = require("ejs");
var galleryRoute = require('./router/galleryRoute');
var postRoute = require('./router/postRoute');
var projectRoute = require('./router/projectRoute');
var loginRoute = require('./router/loginRoute');
var signupRoute = require('./router/signupRoute');

mongoose.connect(process.env.REMOTEDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("db connected");///use process.env.LOCALDB to connect to local mmongoDB server
});

app.use(require("express-session")({
    secret:"secret!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");   ///set template engine to ejs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//it will have two routes 1. search 2. result
app.use("/public", express.static(__dirname + '/public'));
app.use('/gallery', galleryRoute);
app.use('/post', postRoute);
app.use('/projects', projectRoute);
app.use('/Login', loginRoute);
app.use('/Signup', signupRoute);

app.get('/contacts', (req, res) => {
    res.render('contact');
})

app.get("/", function (req, res) {
    // var data = JSON.parse(req.body);
    res.render("index");
    //res.send("hey there");
})

app.get("/team", function (req, res) {
    res.render("team");
})

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("started!!!");
})
