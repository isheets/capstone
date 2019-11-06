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

import { CSSTransition } from 'react-transition-group';


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

  let animateOptions = useSelector(state => state.ui.optionsIn);

  let gameAdmin;
  let gridStyle = 'main-grid';
  let gridSpan = '';

  let animation = 'fade';
  let animationDur = 400;

  if(animateOptions === false) {
    animationDur = 200;
  }


  if (!!user.isAuthenticated) {
    if (game.curGame !== null) {
      //we have a game
      const sixHours = 6 * 60 * 60 * 1000;
      if (Date.now() - game.lastTweetFetchDate > sixHours) {
        console.log("last fetched more than six hours ago, re-fetching and creating new game now now")
        gameController.init();

        game.curGame = null;
      }

      //show some administration like next button or refresh
      else if (game.curGame.type === 'Complete') {
        animation = 'scale';
        animationDur = 200;
        gameAdmin = (<TweetNav />);
        gridStyle = 'single';
        gridSpan = 'span';
      }
      else if (game.curGame.type === 'NoTweets') {
        //this should probably be a new component
        animation = 'none';
        gameAdmin = (
          <div className='no-new-tweets'>
            <h2>No new tweets to fetch.</h2>
            <h3>Try again later.</h3>
            <button
              onClick={() => gameController.newGame()}
              className="button"
            >
              RETRY
          </button>
          </div>
        );

        gridStyle = 'single';
        gridSpan = 'span';
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

  console.log("using " + animation + ' for options animation');

  if (game.curGame !== null) {
    content = (
      <div className="page-wrapper">
        <div className="top-bar">
          <div className="title">
            <h1>SLOW TWITTER</h1>
          </div>
          <div className="log-out">
            <h3>{user.userDetails.name}</h3>
            <button className="small-text">LOG OUT</button>
          </div>
        </div>
        <div className={"main-flex " + gridStyle}>
          <TweetCard />
          <CSSTransition
            in={animateOptions}
            classNames={animation}
            timeout={animationDur}
        >
          <div className={"main-grid-col-2 " + gridSpan + " " + animation}>
            {game.curGame.type === 'Complete' || game.curGame.type === 'NoTweets' ?
              <Fragment>
                <div className="span">{gameAdmin}</div>
              </Fragment>
              :
              <Fragment>
                <DragOptions />
                <Lives />
              </Fragment>
            }
          </div>
          </CSSTransition>
        </div>
      </div>
    );

  }

  //loading after authentication
  else if (user.isAuthenticated) {
    content = <h1>Loading game</h1>;

  }

  //initial view not signed in
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
