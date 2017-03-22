import{Strategy as LocalStrategy} from 'passport-local';
import User from '../../db/models/User.js'

export const localSignUp = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },(req,email,password,done) => {
        let newUser = {
            email,
            password,
            firstName : req.body.firstName,
            LastName : req.body.LastName,
        }
        newUser.save(
            if (err) {
                throw err;
            }
            console.log(newUser);
            done(null);
        )

    }
)
