const mongoose=require('mongoose')

const signupSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  
  email: {
    required: true,
    type: String,
  },
});


const signupModel = mongoose.model("signups", signupSchema);

module.exports=signupModel;