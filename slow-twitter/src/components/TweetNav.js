import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateCurTweetId } from './../actions';

let dispatch;
let game;

var prevTweet = () => {
    if (game.curTweetId > 0) {
        dispatch(updateCurTweetId(game.curTweetId - 1));
    }
    else {
        console.error("Can't go to prev tweet, does not exist. curTweetId: " + game.curTweetId);
    }
}
var nextTweet = () => {
    if (game.parsedTweets !== null) {
        if (game.curTweetId < game.parsedTweets.length - 1) {
            dispatch(updateCurTweetId(game.curTweetId + 1));
        }
    }
    else {
        console.error("Can't go to next tweet, does not exist. curTweetId: " + game.curTweetId);
    }
}

const TweetNav = () => {
    game = useSelector(state => state.game);
    dispatch = useDispatch();
    return (
        <div>
            <button onClick={() => prevTweet()}>Prev</button>
            <button onClick={() => nextTweet()}>Next</button>
        </div>
    )
}

export default TweetNav