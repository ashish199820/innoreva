var express = require('express');
var router  = express.Router();

router.get('/',async function(req,res){
    try{
        res.render('login.ejs');
    }catch(err){
        res.send(err);
    }
})


module.exports=router;
