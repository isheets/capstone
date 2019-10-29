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

  let gameAdmin;

  if (!!user.isAuthenticated) {
    if (game.curGame !== null) {
      //we have a game
      const sixHours = 6 * 60 * 60 * 1000;
      if (Date.now() - game.lastTweetFetchDate > sixHours) {
        console.log("last fetched more than six hours ago, re-fetching and creating new game now now")
        gameController.init();
      }


      if (game.curGame.type === 'Complete') {

        gameAdmin = (<TweetNav />);
      }
      else if (game.curGame.type === 'NoTweets') {
        //this should probably be a new component
        gameAdmin = (
          <button
            onClick={() => gameController.newGame()}
            className="button"
          >
            Refresh Timeline
      </button>
        );
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

  if (game.curGame !== null) {
    content = (
      <div className="page-grid">
        <div className="aqua"></div>
        <div className="aqua"></div>
        <div className="aqua"></div>
        <div className="aqua"></div>
        <div className="aqua"></div>
        <div className="aqua"></div>
        <div className="blue"></div>
        <div className="blue"></div>
        <div className="blue"></div>
        <div className="aqua"></div>
        <div className="aqua"></div>
        <div className="blue"></div>
        <div className="content-wrapper blue">
          <div className="top-bar">
            <div className="user-details">
              <h2>{user.userDetails.name}</h2>
            </div>
            <div className="title">
              <h1>SLOW TWITTER</h1>
            </div>
          </div>
          <div className="main-grid">
            <TweetCard />
            <div className="main-grid-col-2">
              {game.curGame.type === 'Complete' || game.curGame.type === 'NoTweets' ?
                gameAdmin
                :
                <Fragment>
                  <h2>Word Bank:</h2>
                  <DragOptions />
                  <Lives />
                </Fragment>
              }
            </div>
          </div>
        </div>
        <div className="blue"></div>
        <div className="aqua"></div>
        <div className="aqua"></div>
        <div className="blue"></div>
        <div className="blue"></div>
        <div className="blue"></div>
        <div className="aqua"></div>

      </div>
    );

  }
  else if (user.isAuthenticated) {
    content = <h1>Loading game</h1>;

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
