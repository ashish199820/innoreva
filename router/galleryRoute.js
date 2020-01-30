var express = require('express');
var router   =express.Router();
var Gallery = require("../model/gallery");
var Tag = require("../model/tag");


router.get('/',async function(req,res){
    try{
    var tags = await Tag.find({},(err,res)=>{
        console.log(res);
    });
    var img= await Gallery.find({},(err,res)=>{
        console.log(res);
    });
    console.log(tags);
    console.log(img);
        res.render('gallery.ejs',{tags:tags,images:img});
    }catch(err){
        res.send(err);
    }
})


module.exports=router;
