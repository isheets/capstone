import React from 'react'
import { useSelector } from "react-redux";

const TweetInfo = () => {
    const state = useSelector(state => state);
    const curTweet = null;
    let content;
    if (state.game.curTweetId !== null) {
        curTweet = allTweets[state.game.curTweetId];
        content = (
            <div>
                <h3>{curTweet.user.name}</h3>
                <h4>{curTweet.user.handle}</h4>
                <h4>{curTweet.date}</h4>
            </div>
        )
    }
    else {
        content = (<p>curTweet not found</p>);
    }
    return (
        { content }
    )
}

export default TweetInfo