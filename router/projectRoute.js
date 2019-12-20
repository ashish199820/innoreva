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
    var pathname = url.parse(req.body.pdflink);
    var len = req.body.image.length;
    var image = req.body.image.substr(0,len-1);
    image=image+'1';
    console.log(image);
   
    
    console.log(image[len-1]);
    
 
try{
  var data  = await project.create({
      title:req.body.title,
      image:image,
      brief:req.body.brief,
      pdflink:'http://www.dl.dropboxusercontent.com'+pathname.path
  })
  res.redirect('/post');
    
}catch(err){
    console.log(err);
}
})
 module.exports= router;
