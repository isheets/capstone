import React, { Component } from 'react';
import './App.css';
import TwitterLogin from 'react-twitter-auth';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: false,
      user: null,
      token: '',
      last_tweet: null
    };
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    console.log(response);
    response.json().then(user => {
      if (token) {
        this.setState({ isAuthenticated: true, user: user, token: token });
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null })
  };

  fetchTimeline = () => {
    //if this is the first request then don't include since_id
    if (this.state.last_tweet == null) {
      fetch(`http://localhost:4000/api/v1/timeline?aT=${this.state.user.twitterProvider.token}&aTS=${this.state.user.twitterProvider.tokenSecret}`, { headers: { "Content-Type": "application/json; charset=utf-8" } })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          //make sure it's not null
          if (response[0].id) {
            this.setState({last_tweet: response[0].id});
          }
          else {
            alert("No new tweets");
          }

        })
        .catch(err => {
          console.log("u")
          alert("sorry, there are no results for your search")
        });
    }
    //else pass id of last tweet consumed as parameter
    else {
      fetch(`http://localhost:4000/api/v1/timeline?aT=${this.state.user.twitterProvider.token}&aTS=${this.state.user.twitterProvider.tokenSecret}&since=${this.state.last_tweet}`, { headers: { "Content-Type": "application/json; charset=utf-8" } })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          //make sure it's not null
          if (response[0].id) {
            this.setState({last_tweet: response[0].id});
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
            <img src={this.state.user.img}></img>
          </div>
          <div>
            {this.state.user.name}
          </div>
          <div>
            <button onClick={this.fetchTimeline} className="button" >
              Fetch Timeline
            </button>
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
          onFailure={this.onFailed} onSuccess={this.onSuccess}
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
