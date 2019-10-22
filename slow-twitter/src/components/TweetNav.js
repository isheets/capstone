import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateCurGame, updateParsedTweets } from './../actions';
import {FillBlank} from './../classes/FillBlank';

let dispatch;
let game;


export var nextTweet = () => {
    if (game.parsedTweets !== null) {
        if (game.parsedTweets.length > 1) {
            console.log(game.parsedTweets);
            let newTweets = game.parsedTweets;
            newTweets.shift();
            console.log(newTweets);
            dispatch(updateParsedTweets(newTweets));
            let newGame = new FillBlank();
            newGame.setCurrentTweet(newTweets[0]);
            dispatch(updateCurGame(newGame));
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
            <button onClick={() => nextTweet()}>Next</button>
        </div>
    )
}

export default TweetNav