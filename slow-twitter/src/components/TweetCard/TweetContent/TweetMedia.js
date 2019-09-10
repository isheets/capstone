import React, { Fragment } from 'react'
import { useSelector } from "react-redux";

const TweetMedia = () => {
    const curTweet = useSelector(state => state.game.curTweet);
        let content;
    if (curTweet.hasMedia) {
        const mediaAr = curTweet.media;
        console.log(mediaAr);
        //we have some media to render!
        for (let media of mediaAr) {
            if (media.type == "photo") {
                content = <img src={media.url} alt=""></img>
            }
            else if (media.type == "video") {
                content = (
                    <video width="426" height="240" controls>
                        <source src={media.url} type="video/mp4"></source>
                        Your browser does not support inline video viewing.
                        <a href={media.url}>Click here to view.</a>
                    </video>
                )
            }
            else if (media.type == "animated_gif") {
                console.error("TODO: Caught animated_gif media type, need to render");
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