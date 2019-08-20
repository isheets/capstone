import React, { Component } from 'react';
import './App.css';
import TweetCard from "./TweetCard.js";
import TwitterLogin from 'react-twitter-auth';

class App extends Component {
  constructor() {
    super();

    //init state
    this.state = {
      isAuthenticated: false,
      user: null,
      token: '',
      last_tweet: null,
      parsedTweets: null
    };
  }

  componentDidMount = () => {
    this.retrieveState();
  }

  //save state to local storage for fake persistence
  saveState = () => {
    localStorage.setItem('isAuthenticated', this.state.isAuthenticated);
    if (this.state.user !== null) {
      localStorage.setItem('user', JSON.stringify(this.state.user));
    }
    if (this.state.token !== '') {
      localStorage.setItem('token', this.state.token);
    }
    if (this.state.last_tweet !== null) {
      localStorage.setItem('last_tweet', this.state.last_tweet);
    }
    if (this.state.parsedTweets !== null) {
      localStorage.setItem('parsedTweets', JSON.stringify(this.state.parsedTweets));
    }
  };

  //remove all state info from local storage
  unsaveState = () => {
    localStorage.clear();
  };
  //retrieve state info from local storage
  retrieveState = () => {

    let auth = localStorage.getItem('isAuthenticated');
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    let last_tweet = localStorage.getItem('last_tweet');
    let parsedTweets = JSON.parse(localStorage.getItem('parsedTweets'));

    if (auth !== null) {
      this.setState({ isAuthenticated: auth });
    }
    if (user !== null) {
      this.setState({ user: user });
    }
    if (token !== null) {
      this.setState({ token: token });
    }
    if (last_tweet !== null) {
      this.setState({ last_tweet: last_tweet });
    }
    if (parsedTweets !== null) {
      this.setState({ parsedTweets: parsedTweets });
    }
  };

  onSuccessAuth = (response) => {
    const token = response.headers.get('x-auth-token');
    console.log(response);
    response.json().then(user => {
      //successful auth, update state
      if (token) {
        this.setState({ isAuthenticated: true, user: user, token: token });
      }
      //save updated state
      this.saveState();
    });
  };

  onFailedAuth = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null })
    this.unsaveState();
  };

  parseTweets = (rawTweets) => {
    let newTweets = [{}];
    for (let tweet of rawTweets) {
      let newTweet = {};
      if (tweet.retweeted_status) {
        newTweet.text = tweet.retweeted_status.full_text;
        newTweet.isRT = true;
      }
      else {
        newTweet.text = tweet.full_text;
        newTweet.isRT = false;
      }
      if (tweet.entities.media) {
        newTweet.media = tweet.entities.media;
        newTweet.hasMedia = true;
      }
      else {
        newTweet.hasMedia = false;
      }
      newTweet.userName = tweet.user.name;
      newTweet.profilePic = tweet.user.profile_image_url;
      newTweet.userHandle = tweet.user.screen_name;
      newTweets.push(newTweet);
    }
    console.log(newTweets);
  return newTweets;

  }

  fetchTimeline = () => {
    //if this is the first request then don't include since_id
    if (this.state.last_tweet == null) {
      fetch(`http://localhost:4000/api/v1/timeline?aT=${this.state.user.twitterProvider.token}&aTS=${this.state.user.twitterProvider.tokenSecret}`, { headers: { "Content-Type": "application/json; charset=utf-8" } })
        .then(res => res.json())
        .then(response => {
          //make sure it's not null
          if (response[0].id) {
            this.setState({ last_tweet: response[0].id });
            this.saveState();
          }
          this.setState({ parsedTweets: this.parseTweets(response) });
          this.saveState();
        })
        .catch(err => {
          console.log(err)
        });
    }
    //else pass id of last tweet consumed as parameter in request
    else {
      fetch(`http://localhost:4000/api/v1/timeline?aT=${this.state.user.twitterProvider.token}&aTS=${this.state.user.twitterProvider.tokenSecret}&since=${this.state.last_tweet}`, { headers: { "Content-Type": "application/json; charset=utf-8" } })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          //make sure it's not null
          if (response[0].id) {
            this.setState({ last_tweet: response[0].id });
            this.setState({ parsedTweets: this.parseTweets(response) });
            this.saveState();
          }
          else {
            alert("No new tweets");
          }

        })
        .catch(err => {
          alert("sorry, there are no results for your search")
        });
    }

  };
  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            <img src={this.state.user.img} alt="profile"></img>
          </div>
          <h1>
            {this.state.user.name}
          </h1>
          <div>
            <button onClick={this.fetchTimeline} className="button" >
              Fetch Timeline
            </button>
          </div>
          <TweetCard tweet={this.state.parsedTweets[1]} />
          <div>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
          onFailure={this.onFailedAuth} onSuccess={this.onSuccessAuth}
          requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" />
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
