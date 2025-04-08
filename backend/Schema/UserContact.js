const mongoose = require("mongoose");

const userContactSchema = new mongoose.Schema({
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
    message:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model("userContacts", userContactSchema);