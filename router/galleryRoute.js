var express = require('express');
var router   =express.Router();
var {Gallery} = require("../model/gallery");
var {Tag} = require("../model/tag");


router.get('/',async function(req,res){
    try{
    var tags = await Tag.find({});
    var img= await Gallery.find({});
        res.render('gallery.ejs',{tags:tags,images:img});
    }catch(err){
        res.send(err.details[0].message);
    }
       
       
  
    
})


module.exports=router;
