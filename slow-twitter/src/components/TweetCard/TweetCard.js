import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateCurTweetId } from '../../actions';

let dispatch;

const TweetCard = () => {
    //hook into state
    const state = useSelector(state => state);
    dispatch = useDispatch();

    let content;
    //make sure we got tweets
    if (state.tweets.parsedTweets) {
        let allTweets = state.tweets.parsedTweets;
        //intialize curTweet object
        let curTweet = null;
        //check to see if we have a current tweet, use it if so or use the first one
        if (state.game.curTweetId !== null) {
            curTweet = allTweets[state.game.curTweetId];
        }
        else {
            curTweet = allTweets[0];
            //push the current curTweetId to redux store
            dispatch(updateCurTweetId(allTweets[allTweets.length-1].id));
        }
        console.log(curTweet);
        //MAKE SURE EACH CHILD OF CONTENT HAS UNIQUE KEY PROP
        content = [
            <h1 key="0">{curTweet.text}</h1>
        ]
        //render media if available
        if (curTweet.hasMedia === true) {
            let mediaAr = curTweet.media;
            for (let i = 0; i < mediaAr.length; i++) {
                console.log(mediaAr[i].type);
                if (mediaAr[i].type === "photo") {
                    content.push(<img className="tweetImg" src={mediaAr[i].media_url_https} alt="" key={i+1}></img>)
                }
                else {
                    console.log("media type not caught in switch statement")
                }
            }
        }

    }
    //no tweets view
    else {
        content = (
            <h1>No tweets to render, fetch timeline</h1>
        )
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default TweetCard