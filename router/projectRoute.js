var express = require('express');
 var router   =express.Router();
 var url=require("url");
 var project = require('../model/project');


 
 router.get('/',(req,res)=>{
     project.find({}).then((data)=>{
        res.render('project.ejs',{datas:data});

     }).catch((err)=>{
         console.log(err);
     })
     })
router.post('/',async function(req,res){
    // var pathname = url.parse(req.body.pdflink);
    // var len = req.body.image.length;                    ///////to create downloadble link for pdf on dropbox 
    // var image = req.body.image.substr(0,len-1);
    // image=image+'1';
    
   
    
    
    
 
try{
  var data  = await project.create({
      title:req.body.title,
      image:image,
      brief:req.body.brief,
      pdflink:req.body.pdflink       /////// using pdflink tag for youtube link videos..
  })
  res.redirect('/post');
    
}catch(err){
    console.log(err);
}
})
 module.exports= router;
