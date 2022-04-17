const mongoose=require('mongoose');
const { Schema } = mongoose;
const userSchema=new Schema(
    {
        name:{type:'string',required:true},
        username:{type:'string',required:true,unique:true},
        password:{type:'string',required:true},
        mobile:{type:'string',required:true,unique:true},
        address:{type:'string',required:true}
    }
)
const user=mongoose.model('user',userSchema);
module.exports=user;