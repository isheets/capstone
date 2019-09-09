import React from 'react'
import { useSelector } from "react-redux";
import TweetText from "./TweetText"
import TweetMedia from "./TweetMedia"
import QuoteTweet from "./QuoteTweet/QuoteTweet"

const TweetContent = () => {
    const state = useSelector(state => state);

    return(
        <div>
            <TweetText/>
        </div>
    )
}

export default TweetContent