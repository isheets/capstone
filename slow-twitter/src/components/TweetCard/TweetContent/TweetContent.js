import React, {Fragment} from 'react';
import { useSelector } from "react-redux";
import TweetText from "./TweetText";
import TweetMedia from "./TweetMedia";
import QuoteTweet from "./QuoteTweet/QuoteTweet";

const TweetContent = () => {

    let curGame = useSelector(state => state.game.curGame);
    let curTweet = null;
    if (curGame !== null) {
        curTweet = curGame.curTweet;
    }

    let content = null;

    //make sure we have content to render
    if (curTweet !== null) {
        //check if we need to render a quote tweet
        if(curTweet.isQuote === true) {
            content = (
                <Fragment>
                    <TweetText />
                    <TweetMedia quote={false}/>
                    <QuoteTweet />
                </Fragment>
            )
        }

        else {
            content = (
                <Fragment>
                    <TweetText />
                    <TweetMedia quote={false}/>
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