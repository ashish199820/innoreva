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
tag= mongoose.model('tag', tagSchema);

// function validateImage(image){
//         const Schema={
//                 url:Joi.string().required(),
//                 tag:Joi.string().required(),
//                 description:Joi.string()
//         }
// }
//exports.validateImage=validateImage;
exports.TagSchema=tagSchema;
exports.Tag=tag