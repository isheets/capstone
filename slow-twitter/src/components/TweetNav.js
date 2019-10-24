import React from 'react'
import GameController from './../classes/GameController';


let gameController = new GameController();


const TweetNav = () => {
    return (
        <div>
            <button onClick={() => gameController.newGame()}>Next</button>
        </div>
    )
}

export default TweetNav