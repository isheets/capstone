import React from 'react'
import GameController from './../classes/GameController';
import {useDispatch} from 'react-redux';
import { tweetOut, optionsOut } from '../actions';



let gameController = new GameController();

let dispatch;

let animateAndNext = async () => {
    dispatch(tweetOut());
    dispatch(optionsOut());
    setTimeout(function() {
        gameController.newGame()
      }, 1000);
}

const TweetNav = () => {

    dispatch = useDispatch();

    return (
        <div className="tweet-nav-wrapper">
            <button onClick={() => animateAndNext()}>NEXT &#x27AA;</button>
        </div>
    )
}

export default TweetNav