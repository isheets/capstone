import React, { Fragment } from 'react'
import { useSelector } from "react-redux";
import TweetProfilePic from './TweetProfilePic';
import TweetInfo from './TweetInfo';
import TweetContent from './TweetContent/TweetContent';
import './TweetCard.css';
import { updateCurTweet } from '../../actions';


const TweetCard = () => {
    //hook into state to get the current tweet to display
    let curTweet = useSelector(state => state.game.curTweet);

    let content;

    console.log(curTweet);
    //make sure we have content to render
    if (curTweet !== null) {

        //check if we will need to render a quote tweet
        if(curTweet.isQuote == true) {
            
        }
        
        content = (
            <Fragment>
                <TweetProfilePic url={curTweet.user.pic}/>
                <div className="tweet-card-col-2">
                    <TweetInfo />
                    <TweetContent />
                </div>
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
        <div className="tweet-card">
            {content}
        </div>
    )
};

export default TweetCard