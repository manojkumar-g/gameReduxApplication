

const router = (app,passport) => {
    app.post('/signup',
                (req,res,next) => {
                    console.log('trying to signup',req.body.username);
                    next();
                    },
                (req,res,next) =>{
                    return passport.authenticate('local-signup',
                    err =>{
                        if (err) {
                            if (err.name === 'MongoError' && err.code === 11000) {
                            // the 11000 Mongo code is for a duplication email error
                            // the 409 HTTP status code is for conflict error
                            return res.status(409).json({
                              success: false,
                              message: 'Check the form for errors.',
                              errors: {
                                email: 'This email is already taken.'
                              }
                            });
                          }

                          return res.status(400).json({
                            success: false,
                            message: 'Could not process the form.'
                          });
                        }
                        return res.status(200).json({
                          success: true,
                          message: 'You have successfully signed up! Now you should be able to log in.'
                        });
                    }


                )(req,res,next);
            }
        );
}


export default router;
