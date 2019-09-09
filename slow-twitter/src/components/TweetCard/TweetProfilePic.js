import React from 'react'
import { useSelector } from "react-redux";

const TweetProfilePic = () => {
    const state = useSelector(state => state);
    let curTweet = null;
    let content;
    if (state.game.curTweetId !== null) {
        curTweet = allTweets[state.game.curTweetId];
        content = (<img src={curTweet.user.pic} className="tweet-profile-pic" alt=""></img>)
    }
    else {
        content = (<p>No image found</p>)
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default TweetProfilePic