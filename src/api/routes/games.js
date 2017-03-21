const express = require('express');

const router = new express.Router();
import mongoose from 'mongoose';
import Game from './../db/models/Game';

router.get('/', (req, res) => {
  Game.find({},function (err,data) {
        if (err) {
          console.error(err);
          res.response(500).send("Error while retreiveing all data");
        }
        if(!data){
          res.status(200).json({"Error":"No records found"});
        }
        else{
          res.status(200).json(data);
        }
      });
});

module.exports = router;
