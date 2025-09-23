const mongoose=require('mongoose');
const { Schema, Types, model } = mongoose; 
const DoctorSchema=new mongoose.Schema({
name:{type:String, required:true},
email:
    {
        type:String,
        required:true,
        match: /.+\@.+\..+/
    },
phno:
    { 
        type: String, 
        required:true,
        match:/^[0-9]{10}$/
    },
spec:{type:String, required:true},
dept:
    {
        type: Types.ObjectId,
        required:true
        },
exp:{type:String, required:true},
qual:{type:String,required:true},
status:
    {
        type:String,
        enum:['Active','Inactive']
    }            
});
module.exports = mongoose.model('Doctor', DoctorSchema);