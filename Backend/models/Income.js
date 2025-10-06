const moongoose = require('mongoose');
const IncomeSchema = new moongoose.Schema({
    userId : { type : moongoose.Schema.Types.ObjectId ,  ref :"User" , required : true},
    icon :  {type :String},
    source :{type:String , required:true},
    amount : {type:Number , required:true},
    date : {type:Date , default : Date.now},
} , {timestame :true});

module.exports = moongoose.model("Income" , IncomeSchema);