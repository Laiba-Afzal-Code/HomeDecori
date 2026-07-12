import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:true,
  },


  email:{
    type:String,
    required:true,
    unique:true,
  },


  password:{
    type:String,
    required:true,
    select:false,
  },


  role:{
    type:String,
    enum:["admin","user"],
    default:"user",
  },


  lastLogin:{
    type:Date,
  },


  resetToken:{
    type:String,
  },


  resetTokenExpire:{
    type:Date,
  }

},
{
  timestamps:true
});



// Password Hash
userSchema.pre("save", async function(){

  if(!this.isModified("password")){
    return;
  }

  this.password = await bcrypt.hash(
    this.password,
    10
  );

});



// Compare Password
userSchema.methods.comparePassword = function(password){

  return bcrypt.compare(
    password,
    this.password
  );

};


export default mongoose.model(
  "User",
  userSchema
);