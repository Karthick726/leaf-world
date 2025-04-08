const mongoose = require("mongoose");

const userContactSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{   
        type:String,
        required:true
    },
    ordernumber:{
        type:String,
        required:true
    },

    subject:{
        type:String,
        required:true,
        enum: ["Order Issue", "Payment Issue", "Product Inquiry", "Shipping Delay", "Other"]
    },

    message:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model("userContacts", userContactSchema);