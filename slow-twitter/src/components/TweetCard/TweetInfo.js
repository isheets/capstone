import React, { Fragment } from 'react'
import { useSelector } from "react-redux";

const TweetInfo = () => {
    const curTweet = useSelector(state => state.game.curTweet);
    let content;
    if (curTweet !== null) {
        content = (
            <div>
                <h3>{curTweet.user.name}</h3>
                <h4>{curTweet.user.handle}</h4>
                <h4>{curTweet.date}</h4>
            </div>
        )
    }
    else {
        content = (<p>curTweet not found</p>);
    }
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default TweetInfo