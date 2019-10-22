import {FillBlank} from './../classes/FillBlank';
import { GuessAuthor } from '../classes/GuessAuthor';

export const loadState = () => {
    console.log("ATTEMPTING TO LOAD STATE");
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      let parsedState = JSON.parse(serializedState);
      console.log(parsedState);
      //need to reconstruct the class instance based on persisted properties
      let gameFromJson;
      if(parsedState.game.curGame.type === 'FillBlank'){
        gameFromJson = FillBlank.fromJSON(parsedState.game.curGame);
      }
      else if(parsedState.game.curGame.type === 'GuessAuthor') {
        console.log('constructing new GuessAuthor game');
        gameFromJson = GuessAuthor.fromJSON(parsedState.game.curGame);
      }
      else {
        console.error("Game type not caught in localStorage.js");
      }
      
      parsedState.game.curGame = gameFromJson;
      return parsedState;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  export const saveState = (state) => {
      console.log("ATTEMPTING TO SAVE STATE");
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
  };