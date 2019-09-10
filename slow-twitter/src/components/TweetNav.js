import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateCurTweetId } from './../actions';

let dispatch;
let state;

var prevTweet = () => {
    if (state.game.curTweetId > 0) {
        dispatch(updateCurTweetId(state.game.curTweetId - 1));
    }
    else {
        console.error("Can't go to prev tweet, does not exist. curTweetId: " + state.game.curTweetId);
    }
}
var nextTweet = () => {
    if (state.game.parsedTweets !== null) {
        if (state.game.curTweetId < state.game.parsedTweets.length - 1) {
            dispatch(updateCurTweetId(state.game.curTweetId + 1));
        }
    }
    else {
        console.error("Can't go to next tweet, does not exist. curTweetId: " + state.game.curTweetId);
    }
}

const TweetNav = () => {
    state = useSelector(state => state);
    dispatch = useDispatch();
    return (
        <div>
            <button onClick={() => prevTweet()}>Prev</button>
            <button onClick={() => nextTweet()}>Next</button>
        </div>
    )
}

export default TweetNav