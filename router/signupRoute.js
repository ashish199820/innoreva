var express = require('express');
var router = express.Router(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("../model/user");

mongoose.connect('mongodb://localhost:27017/innoreva', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("db connected in signup route");
});

router.use(require("express-session")({
    secret: "secret!",
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// router.set('view engine','ejs');
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', async function (req, res) {
    try {
        res.render('signup.ejs');
    } catch (err) {
        res.send(err);
    }
});

router.post('/new_user', (req, res) => {
    try {
        console.log("hello " + req.body.username);
        User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, function (err, user) {
            if (err) {
                console.log("error in user registering!")
                // console.log(err);
                return res.render("signup");
            }
            passport.authenticate("local")(req, res, () => {
                console.log("User Authenticated")
                res.redirect("/");
            })
        })
        // var client = req.body;
        // new_user = new User(client);
        // // new_user = client;
        // console.log("recieved on server: "+ new_user);
        // new_user.save((err, user) => {
        //     if (err)
        //         console.log("Error a gaya !!");
        //     else if (user._id) {
        //         console.log("Data Successfully Added !!");
        //         res.send(user)
        //     }
        // });
    }
    catch (err) {
        res.send(err);
    }
});


module.exports = router;
