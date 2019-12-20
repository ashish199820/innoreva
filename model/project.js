var mongoose = require('mongoose');
const projectSchema =new mongoose.Schema({
  title:{
      type:String,
      required:true
  },
  image:{
      type:String,
      required:true
  },
  brief:{
      type:String,
      required:true
  },
  pdflink:{
      type:String
  }
});
var projects = mongoose.model('project',projectSchema);
module.exports =projects;