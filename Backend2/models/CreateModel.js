const mongoose=require('mongoose');

//mongoose.connect(`mongoose://127.0.0.1:27017/scatch`);
const ProductSchema=mongoose.Schema({
    file:String,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0
    }, 
    bgcolor:String,
    panelcolor:String,
    textcolor:String
    

});

const CreateModel= mongoose.model("product",ProductSchema);
module.exports=CreateModel