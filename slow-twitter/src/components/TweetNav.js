import React, { Component } from 'react';

export default class TweetNav extends Component {
    render() {
        const nextTweet = this.props.nextTweetFunc;
        const prevTweet = this.props.prevTweetFunc;
        return (
            <div>
                <button onClick={prevTweet}>Previous Tweet</button>
                <button onClick={nextTweet}>Next Tweet</button>
            </div>
        )
    }
}