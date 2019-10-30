import React from 'react'
import GameController from './../classes/GameController';


let gameController = new GameController();


const TweetNav = () => {
    return (
        <div>
            <button onClick={() => gameController.newGame()}>NEXT &#x27FE;</button>
        </div>
    )
}

export default TweetNav