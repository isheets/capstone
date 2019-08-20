import React, { Component } from 'react';

export default class StandardTweet extends Component {

    render() {
        const tweet = this.props.tweet;
        if (!tweet) {
            console.log("Error rendering RetweetTweet");
        }
        else {
            return (
                <div className="tweetCard standard">
                    <h2>{tweet.userName}</h2>
                    <p>{tweet.text}</p>
                </div>
            );
        }
    }
}