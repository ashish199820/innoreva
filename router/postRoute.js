var express = require('express');
var router = express.Router(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("../model/user");

var urls = require("url");
var jwt = require("../app");
var Gallery = require("../model/gallery");
var Tag = require("../model/tag");
// mongoose.connect('mongodb://localhost:27017/innoreva', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("db connected in post route");
// });

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
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', isLoggedIn, async function (req, res) {
    try {
        Tag.find({}, (err, data) => {
            if (err) {
                console.log("error in finding Tags!");
            }
            else {
                console.log("Rendering FORM.EJS");
                res.render('form.ejs', { tags: data });
                // console.log("rendered")
                // res.send();
                // !!DANGER!!  !!DANGER!! note the above doesn't displays the post page but the index.ejs ajax sucess document.write() does, be carefull while debugging.
            }
        })
    }

    catch (err) {
        console.log(err);
        res.send("unable to set jwt on post route!!");
    }
});


router.post('/image', isLoggedIn, function (req, res) {
     // var pathname = url.parse(req.body.pdflink);
    var len = req.body.url.length;                    ///////to create downloadble link for pdf on dropbox 
    var image = req.body.url.substr(0,len-1);
    image=image+'1';
    req.body.url= image;
    try {
        img_data = new Gallery(req.body);
        console.log(img_data);
        img_data.save((err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
            }
        });
        res.redirect('/post');
    }
    catch (err) {
        console.log(err);
        res.send("unable to save to db");
    }

});

router.post('/tag', isLoggedIn, async function (req, res) {
    console.log(req.body);
    try {
        var tag_data = await Tag.create({
            tag: req.body.tag
        });
        console.log(tag_data);
        res.redirect('/post');
    } catch (err) {
        console.log(err);
        res.send("data should be unique");
    }
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("User Authenticated" + req.body.username);
        return next();
    }
    res.redirect("/login");
}


// function verifyToken(req, res, next) {
//     console.log("Token not lost: "); console.log(req.body);
//     var token = req.body.token;
//     const bearerHeader = req.headers['auhtorization']
//     if (typeof (bearerHeader) !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         console.log("Token Recieved at backend");
//         console.log(req.token);
//         jwt.verify(bearerToken, "Innoreva@SecretKy3786", (err, authData) => {
//             if (err) {
//                 console.log("Middleware denied access");
//                 res.sendStatus(403);
//             }
//             else {
//                 req.authData = authData;
//                 console.log("Usre filing request"+authData)
//                 next();
//             }
//         });
//     }
//     else {
//         console.log("token lost at middleware check!")
//         res.sendStatus(403);
//     }
// }


module.exports = router;
