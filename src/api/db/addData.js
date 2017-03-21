import fs from 'fs';
import LineInputStream from 'line-input-stream';
import Schema from './models/Game';
import trimEnd from 'lodash/trimEnd';

export const addData = (fileName) => {

  console.log('Reading CSV File and Inserting Into Db');
  var stream = LineInputStream(fs.createReadStream(fileName),{ flags: 'r' });
  stream.setEncoding('UTF8');
  stream.on('error',err => console.log(err.stack));
  var count = 0;
  stream.on('line',(line) => {
       stream.pause();
       if(count ==0){
         count++;
         return;
       }
       var game;
       if(line.indexOf('"') >= 0){
         var temp = line.split('"');
         game = [
               ...trimEnd(temp[0],',').split(','),
               temp[1],
               temp[2]
               ]
       }
       else {
         game = line.split(',');
       }
       var obj = new Schema({
        title : game[0],
        platform : game[1],
        score:game[2]+'',
        genre : game[3],
        editors_choice:game[4]==='Y'
      });
      obj.save(
        err =>{
          if(err){
            console.log(err);
          }
          else{
            stream.resume();
          }
        }
      )


  });
  stream.on('end',() => console.log('SuccessFully inserted Data'))

}
