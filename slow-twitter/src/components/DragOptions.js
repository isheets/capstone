import React, { Fragment } from 'react'
import { useSelector } from "react-redux";
import Drag from './Drag';

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
    let wordOptions = useSelector(state => state.game.wordOptions);

    let content = null;

    if (wordOptions.length > 0) {
        wordOptions = shuffle(wordOptions);
        console.log(wordOptions);
        content =
            wordOptions.map((word, key) =>
                <Drag word={word} key={key} />
            );

    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}
export default DragOptions