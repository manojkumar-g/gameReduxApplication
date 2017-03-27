var path = require('path');
var webpack = require('webpack');
var express = require('express');
import bodyParser from 'body-parser'
//var config = require('./webpack.config');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);
import conf from './config';
import connection from './src/api/db';
import gameRoutes from './src/api/routes/games.js'
import authRoutes from './src/api/routes/authenticate.js'
import passport from 'passport';
var cookieParser = require('cookie-parser');

import passportConfig from './src/api/config/passport';
connection(conf.dbUri);



app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  noInfo : true,
  hot : true
}));

app.use(require('webpack-hot-middleware')(compiler));


app.use(bodyParser.json());
app.use(cookieParser());


app.use(passport.initialize());

passportConfig(passport);

app.use('/getGames',gameRoutes);
authRoutes(app,passport);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(1234, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Magic is Happening at http://localhost:1234/');
})
