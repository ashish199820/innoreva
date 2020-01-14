var mongoose = require('mongoose');
const userSchema =new mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  }
});
var projects = mongoose.model('user',userSchema);
module.exports =projects;