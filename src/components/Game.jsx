import React from 'react';
import data from './../data.js';
const Game = ({game}) =>
  <div className="game">
    <div className="gamesection">
      <img className = 'poster' src ={(() => {
        let {genre} = game;
        let {posters} = data;
        switch (genre) {
          case 'Action':
            return posters.Action;
            break;
          case 'Adventure':
            return posters.Adventure;
            break;
          case 'Platformer':
            return posters.Platformer;
            break;
          case 'Puzzle':
            return posters.Puzzle;
            break;
          case 'Sports':
            return posters.Sports;
            break;
          case 'Strategy':
            return posters.Strategy;
            break;
          case 'Fighting':
            return posters.Fighting;
            break;
          case 'RPG':
            return posters.RPG;
            break;
          case 'Shooter':
            return posters.Shooter;
            break;
          case 'Music':
            return posters.Music;
            break;
          default:
            return posters.Action;
        }
      })()}/>
    </div>
    <div className="describe">
      <h5>{game.title}</h5>
      <ul>
        <li><span>{game.genre}</span></li>
        <li><i className="fa fa-heart" aria-hidden="true"></i>{game.score}</li>
        <li><span>{game.platform}</span></li>
      </ul>
      {
        game.editors_choice && <span className="ec">
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
        </span>
      }

    </div>

  </div>

export default Game;
