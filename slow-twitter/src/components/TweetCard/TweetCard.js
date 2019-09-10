import React, { Fragment } from 'react'
import { useSelector } from "react-redux";
import TweetProfilePic from './TweetProfilePic';
import TweetInfo from './TweetInfo';
import TweetContent from './TweetContent/TweetContent';


const TweetCard = () => {
    //hook into state to get the current tweet to display
    let curTweet = useSelector(state => state.game.curTweet);

    let content;

    console.log(curTweet);
    if (curTweet !== null) {
        content = (
            <Fragment>
                <TweetProfilePic key="1"/>
                <TweetInfo />
                <TweetContent />
            </Fragment>
        )
    }

    //no tweets view
    else {
        content = (
            <h1>No tweet to render, fetch timeline</h1>
        )
    }

    return (
        <div class="tweet-card">
            {content}
        </div>
    )
};

export default TweetCard