const mongoose =require('mongoose')

const customerSchema = new mongoose.Schema({
    
      fname:{
        type:String,
        required:true
      },
        lname:{
            type:String,
            required:false
        }, 
          email:{
               type:String,
               required:true
          },
          passsword:{
            type:String,
            required:true
          }

      







})

module.exports=mongoose.model("customer",customerSchema)