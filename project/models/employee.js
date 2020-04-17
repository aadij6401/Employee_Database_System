var mongoose=require('mongoose');

var employeeSchema=new mongoose.Schema({
    name:String,
    designation:String,
    salary:Number
})


module.exports=mongoose.model('Employee',employeeSchema);
