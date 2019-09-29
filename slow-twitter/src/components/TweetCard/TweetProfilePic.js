import React from 'react'
import { useSelector } from "react-redux";


//convert to props for reusability!!!!!
const TweetProfilePic = () => {
    const curTweet = useSelector(state => state.game.curTweet);
    let content;
    if (curTweet !== null) {
        content = (<img src={curTweet.user.pic} className="tweet-profile-pic" alt=""></img>)
    }
    else {
        content = null
    }

    return (
        <div className = "tweet-profile-pic-container">
            {content}
        </div>
    )
}

export default TweetProfilePic