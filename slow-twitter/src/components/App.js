import React, { Fragment } from "react";
import TwitterLogin from "react-twitter-auth";
import {
  updateCurTweetId,
  updateAuthentication,
  updateToken,
  updateUser,
  updateParsedTweets
} from "./../actions";
import { useSelector, useDispatch } from "react-redux";

import TweetCard from "./TweetCard/TweetCard";
import TweetNav from "./TweetNav";
import DragOptions from "./DragOptions";

var he = require("he");

let dispatch;

const onFailedAuth = error => {
  console.log("Twitter auth failed :(");
  console.log(error);
};

const onSuccessAuth = response => {
  const token = response.headers.get("x-auth-token");
  console.log(response);
  response.json().then(user => {
    //successful auth, update store
    if (token) {
      console.log("User auth successful :)");
      //dispatch action to update authentication to store
      dispatch(updateAuthentication(true));
      //dispatch the user object to store
      dispatch(updateUser(user));
      //dispatch the token to store
      dispatch(updateToken(token));
      //initial feed fetch
      refreshFeed(userToken, userTokenSecret, null);
    }
  });
};

//grabs the feed based on
const refreshFeed = (userToken, userTokenSecret, lastTweetFetched = null) => {
  if (userToken !== null && userTokenSecret !== null) {
    fetch(
      `http://localhost:4000/api/v1/timeline?aT=${userToken}&aTS=${userTokenSecret}${
        lastTweetFetched ? `&since=${lastTweetFetched}` : ``
      }`,
      { headers: { "Content-Type": "application/json; charset=utf-8" } }
    )
      .then(res => res.json())
      .then(response => {
        //make sure it's not null
        if (response) {
          console.log(response);
          parseRawTweets(response);
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    console.error("Cannot refreshFeed, bad args");
  }
};

//take raw response from tweets and construct well-formed object with only needed info
const parseRawTweets = rawTweets => {
  let newTweets = [];
  //first tweet will have id of 0
  for (let tweet of rawTweets) {
    //throw out if the tweet is a retweet
    if (tweet.retweeted_status) {
      console.log("Tweet not parsed; is a retweet");
    } else if (tweet.in_reply_to_status_id !== null) {
      console.log("Tweet not parsed; is a reply");
    } else {
      //construct the object
      let newTweet = {};
      newTweet.date = tweet.created_at;
      newTweet.tweetID = tweet.id_str;
      newTweet.text = he.decode(tweet.full_text); //make sure that the text is unescaped
      newTweet.urls = null;
      if (tweet.entities.urls.length > 0) {
        newTweet.urls = tweet.entities.urls;
      }
      if (newTweet.urls !== null) {
        for (let url of newTweet.urls) {
          newTweet.text = newTweet.text.replace(url.url, "");
        }
      }

      newTweet.user = {};
      newTweet.user.name = tweet.user.name;
      newTweet.user.pic = tweet.user.profile_image_url;
      newTweet.user.handle = tweet.user.screen_name;

      //check for media of any type
      if (tweet.extended_entities) {
        newTweet.media = [];
        newTweet.hasMedia = true;
        for (let i = 0; i < tweet.extended_entities.media.length; i++) {
          newTweet.media[i] = {};
          newTweet.media[i].type = tweet.extended_entities.media[i].type;
          //remove the in-text media link from the tweet text
          newTweet.text = newTweet.text.replace(
            tweet.extended_entities.media[i].url,
            ""
          );
          if (newTweet.media[i].type === "photo") {
            newTweet.media[i].url =
              tweet.extended_entities.media[i].media_url_https;
          } else if (newTweet.media[i].type === "video") {
            newTweet.media[i].url =
              tweet.extended_entities.media[i].video_info.variants[0].url;
            newTweet.media[i].format =
              tweet.extended_entities.media[
                i
              ].video_info.variants[0].content_type;
          } else if (newTweet.media[i].type === "animated_gif") {
          }
          //NEED TO CHECK FOR OTHER TYPES OF MEDIA
        }
      } else {
        newTweet.hasMedia = false;
      }

      //check for quote tweet
      if (tweet.is_quote_status === true) {
        newTweet.isQuote = true;

        newTweet.quoteTweet = {};
        newTweet.quoteTweet.text = he.decode(tweet.quoted_status.full_text); //make sure string is unescaped
        newTweet.quoteTweet.date = tweet.quoted_status.created_at;
        newTweet.quoteTweet.tweetID = tweet.quoted_status.id_str;
        newTweet.quoteTweet.urls = null;
        if (tweet.quoted_status.entities.urls.length > 0) {
          newTweet.quoteTweet.urls = tweet.quoted_status.entities.urls;
        }
        if (newTweet.quoteTweet.urls !== null) {
          for (let url of newTweet.quoteTweet.urls) {
            newTweet.quoteTweet.text = newTweet.quoteTweet.text.replace(
              url.url,
              ""
            );
          }
        }

        newTweet.quoteTweet.user = {};
        newTweet.quoteTweet.user.name = tweet.quoted_status.user.name;
        newTweet.quoteTweet.user.pic =
          tweet.quoted_status.user.profile_image_url;
        newTweet.quoteTweet.user.handle = tweet.quoted_status.user.screen_name;

        //check for quote tweet media
        //check for media of any type
        if (tweet.quoted_status.extended_entities) {
          newTweet.quoteTweet.media = [{}];
          newTweet.quoteTweet.hasMedia = true;
          for (
            let i = 0;
            i < tweet.quoted_status.extended_entities.media.length;
            i++
          ) {
            //remove the in-text media link from the tweet text
            newTweet.quoteTweet.text = newTweet.quoteTweet.text.replace(
              tweet.quoted_status.extended_entities.media[i].url,
              ""
            );
            newTweet.quoteTweet.media[i] = {};
            if (newTweet.quoteTweet.media[i].type === "photo") {
              newTweet.quoteTweet.media[i].url =
                tweet.quoted_status.extended_entities.media[i].media_url_https;
            } else if (newTweet.quoteTweet.media[i].type === "video") {
              newTweet.quoteTweet.media[i].url =
                tweet.quoted_status.extended_entities.media[
                  i
                ].video_info.variants[0].url;
            }
          }
        } else {
          newTweet.quoteTweet.hasMedia = false;
        }
      } else {
        newTweet.isQuote = false;
      }

      //put at the beginning of newTweets[] for oldest tweets first only if we have text to work with
      if (newTweet.text.length > 0 && newTweet.isQuote === false) {
        newTweets.unshift(newTweet);
      } else if (newTweet.isQuote === true) {
        if (newTweet.text.length > 0 && newTweet.quoteTweet.text.length > 0) {
          newTweets.unshift(newTweet);
        }
      } else {
        console.log(
          "TWEET PROCESSED BUT HAD NO TEXT AT THE END OF parseRawTweets()"
        );
      }
    }
  }
  console.log(newTweets);
  dispatch(updateParsedTweets(newTweets));
  dispatch(updateCurTweetId(0));
};
let userToken;
let userTokenSecret;
const App = () => {
  //get current state
  const user = useSelector(state => state.user);

  userToken = null;
  userTokenSecret = null;
  let lastTweetFetched = null;
  if (user.userDetails !== null) {
    userToken = user.userDetails.twitterProvider.token;
    userTokenSecret = user.userDetails.twitterProvider.tokenSecret;
    //lastTweetFetched = state.game.lastTweetFetched;
  }

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
          <h2>LOGGED IN AS: {user.userDetails.name}</h2>
        </div>
      </div>
      <div className="main-grid">
        <TweetCard />
        <div className="drag-options-wrapper">
          <DragOptions />
        </div>
      </div>
      <TweetNav />
      <button
        onClick={() => refreshFeed(userToken, userTokenSecret, null)}
        className="button"
      >
        Refresh Timeline
      </button>
    </div>
  ) : (
    <div className="twitter-login-container">
      <TwitterLogin
        loginUrl="http://localhost:4000/api/v1/auth/twitter"
        onFailure={onFailedAuth}
        onSuccess={onSuccessAuth}
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
        className="twitter-login-button"
      />
    </div>
  );
  return <Fragment>{content}</Fragment>;
};
export default App;
