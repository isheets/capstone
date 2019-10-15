import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import {
  updateCurTweetId,
  updateCurGame
} from "./../actions";
import { NONAME } from "dns";

let parsedTweets;
let curTweetId;
let dispatch;
let droppedWords;
let extractedWords;



const Drag = props => {
  dispatch = useDispatch();
  let game = useSelector(state => state.game.curGame);


  const word = props.word;
  const order = props.order;
  let strike = false;

  let content = null;

  if (game !== null) {
    //check if word is one of the already dropped ones, and if so then strike it out
    for (let wordObj of game.droppedWords) {
      if (wordObj.word === word) {
        strike = true;
      }
    }
  }

  const [{ isDragging }, drag] = useDrag({
    item: { value: word, order: order, type: "word" },
    //called after word is dropped
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      //check if the item and dropResult exist
      if (item && dropResult) {
        strike = true;
        //call function to check order and word correctness
        let goodDrop = game.handleDrop(item.value, dropResult.order, item.order);

        if(goodDrop === true) {
          alert('goodDrop')
        }
        else if(goodDrop === false){
          //bad drop but still lives remaining
          console.log(game);
          alert(game.lives + " lives left");
        }
        else if(goodDrop === "fail") {
          //failed game
          alert('game over man')
        }
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  //switch strike based on whether word has been dropped
  const textDecoration = strike ? 'line-through' : 'none';

  

  if (word !== null) {
    content = (
      <div ref={drag} style={{ opacity, textDecoration }} className="word-drag">
        {word}
      </div>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default Drag;
