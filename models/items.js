const mongoose=require('mongoose');
const itemSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    contents:{
        type:[String],
        default:[],
    }
}) 

const items=mongoose.model('items',itemSchema);
module.exports=items;