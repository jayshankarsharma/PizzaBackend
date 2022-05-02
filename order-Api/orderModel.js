const mongoose=require('mongoose');
const { Schema } = mongoose;
const orderSchema=new Schema(
    {
        name:{type:'string',required:true},
        username:{type:'string',required:true},
        uid:{type:'string',required:true},
        pizzaType:{type:'string',required:true},
        pizzaSize:{type:'string',required:true},
        ingrediants:{type:['string'] },
        price:{type:'string',required:true},
        
    }
)
const orders=mongoose.model('order',orderSchema);
module.exports=orders;