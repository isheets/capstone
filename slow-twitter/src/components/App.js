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

const onSuccessAuth = (response) => {
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

      //fetch friends list and wait
      await gameController.fetchAllFriends();
      //fetch intial tweets and wait
      await gameController.fetchNewTweets();
      //make new game after tweets are fetched
      gameController.newGame();
      
    }
  });
};


const App = () => {
  //get current state
  const user = useSelector(state => state.user);

  //init reference to dispatch
  dispatch = useDispatch();

  //conditionally generate top-level view based on whether user is authenticated or not
  let content = !!user.isAuthenticated ? (
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
          <div className="drag-options-wrapper">
            <DragOptions />
          </div>
          <Lives />
        </div>
      </div>
      <TweetNav />
      <button
        onClick={() => gameController.fetchNewTweets()}
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
  ) : (
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
  return <Fragment>{content}</Fragment>;
};
export default App;
