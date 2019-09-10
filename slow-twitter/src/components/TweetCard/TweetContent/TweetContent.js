import React, {Fragment} from 'react'
import { useSelector } from "react-redux";
import TweetText from "./TweetText"
import TweetMedia from "./TweetMedia"
import QuoteTweet from "./QuoteTweet/QuoteTweet"

const TweetContent = () => {

    return(
        <Fragment>
            <TweetText/>
            <TweetMedia/>
        </Fragment>
    )
}

export default TweetContent