import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateCurTweetId, updateCurGame } from './../actions';

let dispatch;
let game;
let curGame;

export var prevTweet = () => {
    if (game.curTweetId > 0) {
        dispatch(updateCurTweetId(game.curTweetId - 1));
        curGame.setCurrentTweet(game.parsedTweets[game.curTweetId - 1])
    }
    else {
        console.error("Can't go to prev tweet, does not exist. curTweetId: " + game.curTweetId);
    }
}
export var nextTweet = () => {
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
    curGame = useSelector(state => state.game.curGame)
    dispatch = useDispatch();
    return (
        <div>
            <button onClick={() => prevTweet()}>Prev</button>
            <button onClick={() => nextTweet()}>Next</button>
        </div>
    )
}

export default TweetNav