var express = require('express');
var router = express.Router();
var urls = require("url");
var jwt = require("../app");
var Gallery = require("../model/gallery");
var Tag = require("../model/tag");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/innoreva', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("db connected in post route");
});


router.post('/', verifyToken, async function (req, res) {
    try {
        Tag.find({}, (err, data) => {
            if (err) {
                console.log("error in finding Tags!");
            }
            else {
                console.log("Rendering FORM.EJS");
                res.render('form.ejs', { tags: data });
                console.log("rendered")
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


router.post('/image', verifyToken, async function (req, res) {
    try {
        var len = req.body.url.length;
        var image = req.body.url.substr(0, len - 1);
        var url = image + '1';
        var data = await Gallery.create({
            url: url,
            tag: req.body.tag,
            description: req.body.description
        })
        console.log(data);
        res.redirect('/post');
    }
    catch (err) {
        console.log(err);
        res.send("unable to create db");
    }

})
router.post('/tag', verifyToken, async function (req, res) {
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

function verifyToken(req, res, next) {
    console.log("Token not lost: "); console.log(req.body);
    var token = req.body.token;
    const bearerHeader = req.headers['auhtorization']
    if (typeof (bearerHeader) !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log("Token Recieved at backend");
        console.log(req.token);
        jwt.verify(bearerToken, "Innoreva@SecretKy3786", (err, authData) => {
            if (err) {
                console.log("Middleware denied access");
                res.sendStatus(403);
            }
            else {
                req.authData = authData;
                console.log("Usre filing request"+authData)
                next();
            }
        });
    }
    else {
        console.log("token lost at middleware check!")
        res.sendStatus(403);
    }
}


module.exports = router;
