const mongoose=require('mongoose');
const Joi=require('@hapi/joi');
const tagSchema = new mongoose.Schema({
  tag:{
          type:String,
          required:true,
          unique:true
  },
  date:{
      type:Date,
      default:Date.now
  }
 
});
      
tag = mongoose.model('tag', tagSchema);

// exports.TagSchema =tagSchema;
module.exports = tag