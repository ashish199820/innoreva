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
        res.render('login.ejs');
    } catch (err) {
        res.send(err);
    }
})


router.post("/user",passport.authenticate("local",{
    successRedirect:"../post",
    failureRedirect:"/login",
    failureMessage:"failed"
}),(req,res)=>{})

// router.post('/user', (req, res) => {
//     try {
//         var client = req.body;
//         console.log(client.email + " , " + client.password)
//         if (req.body.email == "" || req.body.password == "" || !req.body.password) {
//             res.send("Please Enter Valid Credentials");
//         }
//         else {
//             User.findOne({ 'email': client.email }, (err, user) => {
//                 if (err) {
//                     console.log(err);
//                     res.send("No account available for that email, kindly signUp.")
//                 }
//                 else {
//                     console.log("User Found!!");
//                     jwt.sign(client, "Innoreva@SecretKy3786", { expiresIn: '1h' }, (err, token) => {
//                         if (client.password == user.password) {
//                             console.log(token);
//                             res.cookie('token', token, {
//                                 expires: new Date(Date.now() + expiration),
//                                 secure: false, // set to true if your using https
//                                 httpOnly: true,
//                               });
//                             res.send(token,()=>{
//                                 console.log("User Logged Succesfully!!");
//                             });
//                             console.log("User Logged In Succesfully!!");
//                         }
//                         else {
//                             console.log("JWT signing failed");
//                         }
//                     })
//                 }
//             });
//         }
//     }
//     catch (err) {
//         res.send(err);
//     }
// });


module.exports = router;
