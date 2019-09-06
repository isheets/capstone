import React from 'react'
import TwitterLogin from 'react-twitter-auth';
import TweetCard from './TweetCard';
import { updateAuthentication, updateToken, updateUser } from './../actions';
import { useSelector, useDispatch } from "react-redux";

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
  
}

const App = () => {
  //get current state
  const state = useSelector(state => state);
  let userToken = null;
  let userTokenSecret = null;
  let lastTweetFetched = null;
  if (state.user.userDetails !== null && state.user.userToken !== null) {
    userToken = state.user.userToken;
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


// class App extends Component {
//  
//   onSuccessAuth = (response) => {
//     const token = response.headers.get('x-auth-token');
//     console.log(response);
//     response.json().then(user => {
//       //successful auth, update state
//       if (token) {
//         this.setState({ isAuthenticated: true, user: user, token: token });
//       }
//       //save updated state
//       this.saveState();
//     });
//   };

//   onFailedAuth = (error) => {
//     alert(error);
//   };

//   logout = () => {
//     this.setState({ isAuthenticated: false, token: '', user: null })
//     this.unsaveState();
//   };

//   parseTweets = (rawTweets) => {
//     console.log(rawTweets);
//     let newTweets = [];
//     for (let tweet of rawTweets) {
//       let newTweet = {};
//       if (tweet.retweeted_status) {
//         newTweet.text = tweet.retweeted_status.full_text;
//         newTweet.rtStatus = tweet.retweeted_status;
//         newTweet.isRT = true;
//       }
//       else {
//         newTweet.text = tweet.full_text;
//         newTweet.isRT = false;
//       }
//       if (tweet.extended_entities.media) {
//         newTweet.media = tweet.extended_entities.media;
//         newTweet.hasMedia = true;
//       }
//       else {
//         newTweet.hasMedia = false;
//       }
//       newTweet.userName = tweet.user.name;
//       newTweet.profilePic = tweet.user.profile_image_url;
//       newTweet.userHandle = tweet.user.screen_name;
//       newTweet.tweetID = tweet.id;
//       newTweets.unshift(newTweet);
//     }
//     console.log(newTweets);
//     return newTweets;

//   };

//   fetchTimeline = () => {
//     //if this is the first request then don't include since_id
//     if (this.state.last_tweet == null) {
//       fetch(`http://localhost:4000/api/v1/timeline?aT=${this.state.user.twitterProvider.token}&aTS=${this.state.user.twitterProvider.tokenSecret}`, { headers: { "Content-Type": "application/json; charset=utf-8" } })
//         .then(res => res.json())
//         .then(response => {
//           //make sure it's not null
//           if (response) {
//             this.setState({ last_tweet: response[0].id });
//             this.setState({ parsedTweets: this.parseTweets(response), curTweet: 0 });
//             this.saveState();
//           }

//         })
//         .catch(err => {
//           console.log(err)
//         });
//     }
//     //else pass id of last tweet consumed as parameter in request
//     else {
//       fetch(`http://localhost:4000/api/v1/timeline?aT=${this.state.user.twitterProvider.token}&aTS=${this.state.user.twitterProvider.tokenSecret}&since=${this.state.last_tweet}`, { headers: { "Content-Type": "application/json; charset=utf-8" } })
//         .then(res => res.json())
//         .then(response => {
//           console.log(response);
//           //make sure it's not null
//           if (response) {
//             this.setState({ last_tweet: response[0].id });
//             this.setState({ parsedTweets: this.parseTweets(response), curTweet: 0 });
//             this.saveState();
//           }
//           else {
//             alert("No new tweets");
//           }

//         })
//         .catch(err => {
//           alert("sorry, there are no results for your search")
//         });
//     }
//   };

//   nextTweet = () => {
//     if (this.state.curTweet === this.state.parsedTweets.length - 1) {
//       console.error("no new tweets available. try refetching.")
//     }
//     else {
//       this.setState({ curTweet: this.state.curTweet + 1 });
//     }
//   };
//   prevTweet = () => {
//     if (this.state.curTweet === 0) {
//       console.error("current tweet is already the oldest tweet available")
//     }
//     else {
//       this.setState({ curTweet: this.state.curTweet - 1 });
//     }
//   };

//   render() {
//     let content = !!this.state.isAuthenticated ?
//       (
//         <div>
//           <p>Authenticated</p>
//           <div>
//             <img src={this.state.user.img} alt="profile"></img>
//           </div>
//           <h1>
//             {this.state.user.name}
//           </h1>
//           <div>
//             <button onClick={this.fetchTimeline} className="button" >
//               Fetch Timeline
//             </button>
//           </div>
//           <TweetCard
//             tweet={this.state.parsedTweets != null ? this.state.parsedTweets[this.state.curTweet] : null} />
//           <TweetNav
//             nextTweetFunc={this.nextTweet}
//             prevTweetFunc={this.prevTweet} />
//           <div>
//             <button onClick={this.logout} className="button" >
//               Log out
//             </button>
//           </div>
//         </div>
//       ) :
//       (
//         <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
//           onFailure={this.onFailedAuth} onSuccess={this.onSuccessAuth}
//           requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" />
//       );

//     return (
//       <div className="App">
//         {content}
//       </div>
//     );
//   }
// }

// export default App;
