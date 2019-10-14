import React from 'react'
import { useSelector } from "react-redux";
import TweetInfo from './../../TweetInfo';
import TweetProfilePic from './../../TweetProfilePic';
import TweetText from './../TweetText';
import TweetMedia from '../TweetMedia';

const QuoteTweet = () => {
    let quoteTweet = useSelector(state => state.game.curGame.curTweet.quoteTweet);

    return(
        <div className="quote-tweet-grid">
            {/* need to render the profile pic, info, text, and media */}
            <div className="quote-tweet-profile-pic">
                <TweetProfilePic url={quoteTweet.user.pic}/>
            </div>
            <div className="quote-tweet-content">
                <TweetInfo quote={true}/>
                <TweetText quote={true} />
                <TweetMedia />
            </div>
        </div>
    )
}

export default QuoteTweet