const mongoose=require("mongoose")
const userschema  = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        phone:{
            type:Number,
            required:true,
        },
        password:{
               type:String,
               required:true,
        },
        token:{
            type:String
        }
        
    });
module.exports =  mongoose.model("User",userschema);    
