import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { toast } from 'react-toastify';

import { loadState, saveState } from "./local-storage/localStorage";
import throttle from "lodash.throttle";

import GameController from './classes/GameController';

let gameController = new GameController();

let persistedState = loadState();
console.log(persistedState);
let store;

toast.configure();

//use persisted state if avail
if (persistedState !== undefined) {

  store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true
    })
  );

    //refresh feed if cache is older than 6 hours
    if(persistedState.user) {
      if(persistedState.user.isAuthenticated === true) {
        const sixHours =  5 * 60 * 60 * 1000;
        if(Date.now() - persistedState.game.lastTweetFetchDate > sixHours){
          console.log("tweet fetched more than six hours, re-fetching now")
          gameController.fetchNewTweets();
        }
      }
  }
} 
//no state in local storage
else {
  store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true
    })
  );
}

//save state a maximum of once every second
store.subscribe(
  throttle(() => {
    saveState({
      game: store.getState().game,
      user: store.getState().user
    });
  }, 1000)
);

render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>,
  document.getElementById("root")
);

export default store;