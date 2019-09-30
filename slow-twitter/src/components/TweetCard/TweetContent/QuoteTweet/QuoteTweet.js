import React from 'react'
import { useSelector } from "react-redux";
import QuoteTweetInfo from './QuoteTweetInfo';
import QuoteTweetMedia from './QuoteTweetMedia';
import QuoteTweetText from './QuoteTweetText';
import TweetProfilePic from './../../TweetProfilePic';

const QuoteTweet = () => {
    let quoteTweet = useSelector(state => state.game.curTweet.quoteTweet);

    return(
        <div className="quote-tweet-grid">
            {/* need to render the profile pic, info, text, and media */}
            <div className="quote-tweet-profile-pic">
                <TweetProfilePic url={quoteTweet.user.pic}/>
            </div>
            <div className="quote-tweet-content">
                <QuoteTweetInfo/>
            </div>
        </div>
    )
}

export default QuoteTweet