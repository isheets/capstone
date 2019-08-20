import React, { Component } from 'react';

export default class MediaTweet extends Component {

    render() {
        const tweet = this.props.tweet;

        if (!tweet) {
            console.log("Error rendering RetweetTweet");
        }
        else {
            return (
                <div className="tweetCard media">
                    <h2>{tweet.userName}</h2>
                    <p>{tweet.text}</p>
                    <h3>media goes here</h3>
                </div>
            );
        }
    }
}