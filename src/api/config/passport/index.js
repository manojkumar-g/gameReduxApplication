import {localSignUp,localLogin} from './local';

export default function(passport) {

  //use the following strategies
  passport.use('local-signup',localSignUp);
  passport.use('local-login',localLogin);
};
