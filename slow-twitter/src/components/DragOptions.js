import React from 'react'
import { useSelector } from "react-redux";
import DragWord from './DragWord';

var shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const DragOptions = () => {
    let game = useSelector(state => state.game.curGame);

    let content = null;
    if (game !== null) {
        if (game.type === 'FillBlank') {
            if (game.wordOptions.length > 0) {
                game.wordOptions = shuffle(game.wordOptions);
                //console.log(game.wordOptions);
                content =
                    game.wordOptions.map((word, key) =>
                        <DragWord word={word.word} order={word.order} key={key} />
                    );
            }
        }

        else if (game.type === "GuessAuthor") {

        }
        else {
            console.error("Game type not recognized in DragOptions")
        }
    }

    return (
        <div className="drag-options-container">
            {content}
        </div>
    )
}
export default DragOptions