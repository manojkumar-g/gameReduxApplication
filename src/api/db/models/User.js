import mongoose from 'mongoose';
//bcrypt  for hassing the password cause we should not store password as it is as for
//security constraints
import bcrypt from 'bcrypt-nodejs';
var User = mongoose.Schema({
  email: {type:String,unique:true},
  firstName : String,
  LastName : String,
  password:String
});

//a method for validting a password with generated hassed password
User.methods.validatePassword = function(passwd,cb){
  let thisPassword = this.password;
  bcrypt.compare(passwd,this.password,(err,isMatch) =>{
    if(err)
      return cb(err);
    cb(null,isMatch);
  });
};

// writting a middleware for persisting password as hash using bcrypt
User.pre('save',function(next) {
  const user = this;
  bcrypt.genSalt(10,(err,salt) =>{
    if(err)
      return next(err);
    bcrypt.hash(user.password,salt,null,(err,hash)=>{
      if(err)
        return next(err);
      user.password = hash;
      next();
    });
  });
});

export default mongoose.model('user',User);
