import React, { Component } from 'react';

export default class RetweetTweet extends Component {

    render() {
        const tweet = this.props.tweet;

        if (!tweet) {
            console.log("Error rendering RetweetTweet");
        }
        else {
            return (
                <div className="tweetCard retweet">
                    <h2>{tweet.userName}</h2>
                    <p>RT: {tweet.text}</p>
                </div>
            );
        }
    }
}