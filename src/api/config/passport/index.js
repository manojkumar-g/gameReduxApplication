import {localSignUp,localLogin} from './local';

export default function(passport) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    console.log('serialize')
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser')
    done(null, user);

  });

  //use the following strategies
  passport.use('local-signup',localSignUp);
  passport.use('local-login',localLogin);
};
