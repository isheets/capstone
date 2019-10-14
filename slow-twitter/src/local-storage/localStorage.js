import {FillBlank} from './../classes/FillBlank';

export const loadState = () => {
    console.log("ATTEMPTING TO LOAD STATE");
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      let parsedState = JSON.parse(serializedState);
      //need to reconstruct the class instance based on persisted properties
      const gameFromJson = FillBlank.fromJSON(parsedState.game.curGame);
      parsedState.game.curGame = gameFromJson;
      return parsedState;
    } catch (err) {
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