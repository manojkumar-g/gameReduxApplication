import{Strategy as LocalStrategy} from 'passport-local';
import User from '../../db/models/User.js';
import jwt from 'jsonwebtoken';
import config from '../../../../config';

export const localSignUp = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },(req,email,password,done) => {
      User.findOne({email},(err,user)=>{
                                  if(err)
                                    return done(err);
                                  if(user){
                                    const error = new Error('User already Exists');
                                    error.message = 'User already Exists';
                                    return done(error);
                                  }
                                  else{
                                    var newUser = new User({
                                      email,
                                      password,
                                      firstName : req.body.firstName,
                                      LastName : req.body.LastName
                                    });

                                    console.log(newUser);
                                    newUser.save(err => {
                                      if(err)
                                        throw err;
                                      console.log(newUser);
                                      return done(null,newUser);
                                    });
                                  }
                                });

    }
);

export const localLogin = new LocalStrategy(
  {usernameField : 'email',
  passwordField :'password'},
  (email,password,done) => {
    User.findOne({email},
      (err,user) =>{
        if(err)
          return done(err);
        console.log(user);
        if(user) {
          user.validatePassword(password.trim() ,
            (err,isMatch) => {
              if(err)
                return done(err);
              if(isMatch) {
                const payload = {
                                  sub: user._id
                                };
                console.log(config.jwtSecret);
                let token = jwt.sign(payload,config.jwtSecret);
                let data = {
                  name : user.firstName
                }
                return done(null,token,data);
              }
              else{
                const error = new Error('Invalid Credentials');
                error.message = 'Check your password';
                return done(error);
              }
            }
          );
        }
        else{
          const error = new Error('Invalid Credentials');
          error.message = 'Check your UserName';
          return done(error);
        }
      }
    )
  }
);
