const routes = (app,passport) =>{
  app.post('/signup',
          (req,res,next) =>{
            console.log('checking authentication');
            console.log(req.body.email);
            next();
          },
          (req,res,next) =>{
            return passport.authenticate('local-signup', {session : false},(err) => {
                    if (err) {
                      console.log(err.message);


                      return res.status(400).json({
                        success: false,
                        message: err.message
                      });
                    }

                    return res.status(200).json({
                      success: true,
                      message: 'You have successfully signed up! Now you should be able to log in.'
                    });
                  })(req, res, next);

          }

);
app.post('/login',
    (req,res,next) => {
      console.log('trying to login as', req.body.email);
      console.log(req.session);
      next();
    },
    (req,res,next) =>
    passport.authenticate('local-login',
      {session : false},
      (err,token,userData) => {
        if (err) {
          return res.status(400).json({message : err.message,success:false})
        }
        return res.status(200).json({
          success : true,
          userData ,
          token,
          message:'Successfully Logged in as '+userData.name,
        })

      }
    )(req,res,next)
);
}

export default routes;
