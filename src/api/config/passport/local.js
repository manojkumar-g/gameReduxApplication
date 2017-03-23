import{Strategy as LocalStrategy} from 'passport-local';
import User from '../../db/models/User.js'

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
                                    console.log('user Already exits');
                                    const error = new Error('User already Exists');
                                    error.name = 'You have already sinned up';
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
)
