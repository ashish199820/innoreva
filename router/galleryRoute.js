var express = require('express');
var router   =express.Router();
var {Gallery} = require("../model/gallery");
var {Tag} = require("../model/tag");


router.get('/',function(req,res){
    Tag.find({}).then((tags)=>{
        res.render('gallery.ejs',{tags:tags});
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })
    
})


module.exports=router;
