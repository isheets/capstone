import React, { Fragment } from 'react'
import { useSelector } from "react-redux";



const TweetText = () => {
    const text = useSelector(state => state.game.curTweet.text);
    let newText = text.split ('\n').map ((item, i) => <p key={i}>{item.replace(/ /g, "\u0020")}</p>);
    return(
        <div className="tweet-text">
            {newText}
        </div>
        
    )
}

export default TweetText

