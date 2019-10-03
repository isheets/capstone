import React, { Fragment } from 'react'
import { useSelector } from "react-redux";

const TweetMedia = props => {
    let quote = props.quote;

    let curTweet = useSelector(state => state.game.curTweet);

    let tweetWithMedia;

    //check if tweet with media we are rendering is quote or orginial

    if (quote == true) {
        tweetWithMedia = curTweet.quote;
    }
    else {
        tweetWithMedia = curTweet;
    }
    let content;
    
    if (tweetWithMedia.hasMedia) {
        const mediaAr = tweetWithMedia.media;
        console.log(mediaAr);
        //we have some media to render!
        for (let media of mediaAr) {
            if (media.type === "photo" || media.type === "animated_gif") {
                content = (<img src={media.url} alt="" className="tweet-media-item"></img>);
            }
            else if (media.type === "video") {
                content = (
                    <video width="426" height="240" controls className="tweet-media-item fit">
                        <source src={media.url} type={media.format}></source>
                        Your browser does not support inline video viewing.
                        <a href={media.url}>Click here to view.</a>
                    </video>
                )
            }
            else {
                console.error("Media Type not caught in switch statement: " + media.type);
            }
        }
    }
    else {
        content = null;
    }

    return (
        <div className="tweet-media">
            {content}
        </div>
    )
}

export default TweetMedia