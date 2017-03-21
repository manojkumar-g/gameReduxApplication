import mongoose from 'mongoose';
//plug in promise cause mongo db doesn't suport promise by default

mongoose.Promise = global.Promise;

var Game = mongoose.Schema({
  title : String,
  platform : String,
  score : String,
  genre : String,
  editors_choice : Boolean
});

export default mongoose.model('games',Game);
