import React from 'react'
import TwitterLogin from 'react-twitter-auth';
import { updateAuthentication, updateToken, updateUser, updateParsedTweets } from './../actions';
import { useSelector, useDispatch } from "react-redux";

import TweetCard from './TweetCard';
import TweetNav from './TweetNav';

let dispatch;

const onFailedAuth = (error) => {
  console.log("Twitter auth failed :(");
  console.log(error);
}

const onSuccessAuth = (response) => {
  const token = response.headers.get('x-auth-token');
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
      dispatch(updateToken(token))
    }
  });
}

//grabs the feed based on 
const refreshFeed = (userToken, userTokenSecret, lastTweetFetched = null) => {
  if (userToken !== null && userTokenSecret !== null) {
    fetch(`http://localhost:4000/api/v1/timeline?aT=${userToken}&aTS=${userTokenSecret}${lastTweetFetched ? `&since=${lastTweetFetched}` : ``}`, { headers: { "Content-Type": "application/json; charset=utf-8" } })
      .then(res => res.json())
      .then(response => {
        //make sure it's not null
        if (response) {
          console.log(response);
          parseRawTweets(response);
        }
      })
      .catch(err => {
        console.log(err)
      });
  }
  else {
    console.error("Cannot refreshFeed, bad args");
  }
}

//take raw response from tweets and construct well-formed object with only needed info
const parseRawTweets = (rawTweets) => {
  let newTweets = [];
  //first tweet will have id of 0
  let id = 0;
  for (let tweet of rawTweets) {
    let newTweet = {};
    //throw out if the tweet is a retweet
    if (tweet.retweeted_status) {
      console.log("Tweet not parsed; is a retweet")
    }
    else if (tweet.in_reply_to_status_id !== null) {
      console.log("Tweet not parsed; is a reply")
    }
    else {
      newTweet.text = tweet.full_text;
      //check for media of any type
      if (tweet.extended_entities) {
        newTweet.media = tweet.extended_entities.media;
        newTweet.hasMedia = true;
      }
      else {
        newTweet.hasMedia = false;
      }
      //check for quote tweet
      if(tweet.is_quote_status === true) {
        newTweet.isQuote = true;
        newTweet.quotedTweet.text
        newTweet.quotedTweet.userName = 

        //check for quote tweet media
      }
      

      //construct the object
      newTweet.id = id;
      newTweet.userName = tweet.user.name;
      newTweet.profilePic = tweet.user.profile_image_url;
      newTweet.userHandle = tweet.user.screen_name;
      newTweet.tweetID = tweet.id;
      console.log("Parsed the following tweet:");
      console.log(newTweet);
      //put at the beginning of newTweets[] for oldest tweets first
      newTweets.unshift(newTweet);
      //increment the id
      id++;
    }
  }
  console.log(newTweets);
  dispatch(updateParsedTweets(newTweets));
}

const App = () => {
  //get current state
  const state = useSelector(state => state);
  let userToken = null;
  let userTokenSecret = null;
  let lastTweetFetched = null;
  if (state.user.userDetails !== null) {
    userToken = state.user.userDetails.twitterProvider.token;
    userTokenSecret = state.user.userDetails.twitterProvider.tokenSecret;
    lastTweetFetched = state.tweets.lastTweetFetched;
  }

  //init reference to dispatch
  dispatch = useDispatch();

  //conditionally generate top-level view based on whether user is authenticated or not
  let content = !!state.user.isAuthenticated ?
    (
      <div>
        <h1>Authenticated!</h1>
        <button onClick={() => refreshFeed(userToken, userTokenSecret, lastTweetFetched)} className="button" >
          Fetch Timeline
        </button>
       <TweetCard />
       <TweetNav />
      </div>
    ) :
    (
      <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
        onFailure={onFailedAuth} onSuccess={onSuccessAuth}
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" />
    );
  return (
    <div>
      {content}
    </div>
  );

};
export default App