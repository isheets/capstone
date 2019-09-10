import React from 'react'
import { useSelector } from "react-redux";

const TweetText = () => {
    const text = useSelector(state => state.game.curTweet.text);

    return(
        <p>{text}</p>
    )
}

export default TweetText