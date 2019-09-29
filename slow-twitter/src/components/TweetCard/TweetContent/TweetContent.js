import React, {Fragment} from 'react';
import { useSelector } from "react-redux";
import TweetText from "./TweetText";
import TweetMedia from "./TweetMedia";
import QuoteTweet from "./QuoteTweet/QuoteTweet";

const TweetContent = () => {

    let curTweet = useSelector(state => state.game.curTweet);

    let content = null;

    //make sure we have content to render
    if (curTweet !== null) {
        //check if we need to render a quote tweet
        if(curTweet.isQuote == true) {
            content = (
                <Fragment>
                    <TweetText />
                    <TweetMedia />
                    <QuoteTweet />
                </Fragment>
            )
        }

        else {
            content = (
                <Fragment>
                    <TweetText />
                    <TweetMedia />
                </Fragment>
            )
        }
    }

    return(
        <div className="tweet-content">
            {content}
        </div>
    )
}

export default TweetContent