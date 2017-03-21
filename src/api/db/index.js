import mongoose from 'mongoose';
import config from '../../../config';
import game from './models/Game'
const connection = (url) => {
  //plug in promise cause mongo db doesn't suport promise by default
  mongoose.Promise = global.Promise;
  //connection to mongo db using url
  mongoose.connect(url);




  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });
  mongoose.connection.once('open', function() {
    console.log('SuccessFully Connected to DB');
    game.count({},(err,count) => {
      if(count !==0){
        console.log('Data Already Exist in DB so Not reading CSV');
        return;
      }

      var {addData} = require('./addData');
      addData(config.csvFile, game);
    });

});

}


export default connection;
