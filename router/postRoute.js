var express = require('express');
 var router   =express.Router();
var url=require("url");

router.get('/',function(req,res){
    res.render('form.ejs');
})
router.post('/',async function(req,res){
    var url =url(req.body.url,true);
    try{
    
    var data = await gallery.create({
        url:req.body.url,
        id:url.params.id,
        tag:req.body.tag,
    })
    res.status(200).render('form.ejs');
}catch(err){
    console.log(err);
    res.send("unable to create db");
}

})


module.exports=router;
