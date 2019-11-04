import React from 'react'
import GameController from './../classes/GameController';


let gameController = new GameController();


const TweetNav = () => {
    return (
        <div className="tweet-nav-wrapper">
            <button onClick={() => gameController.newGame()}>NEXT &#x27AA;</button>
        </div>
    )
}

export default TweetNav