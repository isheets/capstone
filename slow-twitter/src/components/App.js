import React, { Fragment } from "react";
import TwitterLogin from "react-twitter-auth";
import {
  updateAuthentication,
  updateToken,
  updateUser
} from "./../actions";
import { useSelector, useDispatch } from "react-redux";

import TweetCard from "./TweetCard/TweetCard";
import TweetNav from "./TweetNav";
import DragOptions from "./DragOptions";
import Lives from './Lives';

import GameController from '../classes/GameController';


let dispatch;

let gameController = new GameController();

const onFailedAuth = error => {
  console.log("Twitter auth failed :(");
  console.log(error);
};

const onSuccessAuth = async (response) => {
  const token = response.headers.get("x-auth-token");
  console.log(response);
  response.json().then(async user => {
    //successful auth, update store
    if (token) {
      console.log("User auth successful :)");

      //dispatch the user object to store
      dispatch(updateUser(user));
      //dispatch the token to store
      dispatch(updateToken(token));
      //dispatch action to update authentication to store
      dispatch(updateAuthentication(true));

    }
  });
};


const App = () => {
  //get current state
  const user = useSelector(state => state.user);
  const game = useSelector(state => state.game);

  if (!!user.isAuthenticated) {
    if (game.curGame !== null) {
      const sixHours = 6 * 60 * 60 * 1000;
      if (Date.now() - game.lastTweetFetchDate > sixHours) {
        console.log("last fetched more than six hours ago, re-fetching and creating new game now now")
        gameController.init();
      }
    }
    else {
      gameController.init();
    }
  }

  //check to see if we need to refresh

  //init reference to dispatch
  dispatch = useDispatch();

  let content = null;

  if (user.isAuthenticated) {
    content = (
      <div>
        <div className="top-bar">
          <div className="black-box">
            <h1>SLOW TWITTER</h1>
          </div>
          <div className="black-box">
            <h2>{user.userDetails.name}</h2>
          </div>
        </div>
        <div className="main-grid">
          <TweetCard />
          <div className="main-grid-col-2">
            {game.curGame.type === 'Complete' ?
              <TweetNav />
              :
              <Fragment>
                <div className="drag-options-wrapper">
                  <DragOptions />
                </div>
                <Lives />
              </Fragment>
            }
          </div>
        </div>

        <button
          onClick={() => gameController.fetchNewTweets(true)}
          className="button"
        >
          Refresh Timeline
        </button>
        <button
          onClick={() => gameController.fetchAllFriends()}
          className="button"
        >
          Get Friends
        </button>
      </div>
    );

  }
  else {
    content = (
      <div className="top-bar">
        <div className="black-box">
          <h1>SLOW TWITTER</h1>
        </div>
        <div className="black-box">
          <TwitterLogin
            loginUrl="http://localhost:8080/api/v1/auth/twitter"
            onFailure={onFailedAuth}
            onSuccess={onSuccessAuth}
            requestTokenUrl="http://localhost:8080/api/v1/auth/twitter/reverse"
            className="twitter-login-button"
            text="SIGN IN TO TWITTER"
            showIcon={false}
          />
        </div>
      </div>
    );
  }

  return <Fragment>{content}</Fragment>;
};
export default App;
