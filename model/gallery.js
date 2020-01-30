const mongoose=require('mongoose');
const Joi=require('@hapi/joi');
const ImageSchema = new mongoose.Schema({
  url:{
          type:String,
          required:true,
          
  },
  tag:{
          type:String,
          required:true
  },

  description:{
          type:String
  }
});
Image= mongoose.model('Image', ImageSchema);

// function validateImage(image){
//         const Schema={
//                 url:Joi.string().required(),
//                 tag:Joi.string().required(),
//                 description:Joi.string()
//         }
// }
// exports.validateImage=validateImage;
// exports.ImageSchema=ImageSchema;
// exports.Gallery=Image;

module.exports = Image;
