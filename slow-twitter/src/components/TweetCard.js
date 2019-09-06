import React, { Component } from 'react';
import MediaTweet from './MediaTweet.js';
import RetweetTweet from './RetweetTweet.js';
import StandardTweet from './StandardTweet.js';

export default class TweetCard extends Component {
    renderTweet = (tweetToRender) => {
        //tweet has media (pics or vids)
        if (tweetToRender.hasMedia) {
            return( <MediaTweet tweet={tweetToRender} /> );
        }
        //if tweet is a retweet
        else if (tweetToRender.isRT) {
            return( <RetweetTweet tweet={tweetToRender} />)
        }
        //just a plain ole tweet
        else {
            return( <StandardTweet tweet={tweetToRender} />);
        }
    }

    render() {
        const tweet = this.props.tweet;
        console.log(tweet);
        if(tweet) {
        const content = this.renderTweet(tweet);
        return (content)
        }
        else {
            console.error("Could not render tweet because this.props.tweet does not exist");
            return null;
        }
    }
}