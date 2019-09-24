import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import {
  updateCurTweetId,
  addDroppedWord,
  updateDroppedWord,
  moveDroppedWord,
  clearDroppedWords
} from "./../actions";
import { NONAME } from "dns";

let parsedTweets;
let curTweetId;
let dispatch;
let droppedWords;
let extractedWords;

var nextTweet = () => {
  if (parsedTweets !== null) {
    if (curTweetId < parsedTweets.length - 1) {
      dispatch(updateCurTweetId(curTweetId + 1));
      dispatch(clearDroppedWords());
    } else {
      console.error(
        "Can't go to next tweet, does not exist. curTweetId: " + curTweetId
      );
    }
  }
};

//check the order, set the dropped word, and manage game state
//droppedWord: {
//  word: droppedWord
//  droppedIn: order
//  correctDrop: bool
//}
var handleDrop = (droppedWord, droppedIn, correctDrop) => {
  console.log("droppedWord: " + droppedWord + ", droppedIn: " + droppedIn);

  let newWordObj = {
    word: droppedWord,
    droppedIn: droppedIn
  };

  if (droppedIn === correctDrop) {
    //alert("Correct!");
    newWordObj.correct = true;
  } else {
    //alert("Incorrect!");
    newWordObj.correct = false;
  }



  //check if we already dropped the word, move it if so and stop
  if(checkMovedWord(droppedWord)) {
      dispatch(moveDroppedWord(newWordObj));
  }
  //check if already filled the blank, change the word if so
  else if(checkAlreadyDropped(droppedIn)) {
    dispatch(updateDroppedWord(newWordObj));
  }
  //else add the word
  else {
      dispatch(addDroppedWord(newWordObj));
  }

  //finally check if we've finished completing the tweet
  console.log('checking to see if we completed the entire tweet');
  if(droppedWords.length === extractedWords.length) {
      let correct = true;
      for(let wordObj of droppedWords) {
          if(wordObj.correct === false) {
              correct = false;
          }
      }
      if(correct === true) {
          //tweet completed successfully
          alert('great job! you did it!');
          nextTweet();
      }
      else {
          //tweet completed incorrectly
          alert("that would be INCORRECT!!!!! IDIOT!");
          dispatch(clearDroppedWords());
      }
  }
};

//returns true if the word is already in the array (so we need to move it)
//or false if the word is not already there
var checkMovedWord = word => {
  //check to see if we have the word in our dropped word array
  for (let wordObj of droppedWords) {
    if (wordObj.word === word) {
      //we already have the word
      return true;
    }
  }
  //new word
  return false;
};

//checks to see if the blank is already filled
//returns true with already dropped, so need to update word
//or false and need to add word
var checkAlreadyDropped = dropID => {
  //check to see if we already dropped a word in this spot
  for (let wordObj of droppedWords) {
    if (wordObj.droppedIn === dropID) {
      //we already filled the blank
      return true;
    }
  }
  //blank is empty
  return false
};

const Drag = props => {
  dispatch = useDispatch();
  extractedWords = useSelector(state => state.game.extractedWords);
  parsedTweets = useSelector(state => state.game.parsedTweets);
  curTweetId = useSelector(state => state.game.curTweetId);
  droppedWords = useSelector(state => state.game.droppedWords);

  const word = props.word;
  const order = props.order;
  let strike = false;
  
  //check if word is one of the already dropped ones, and if so then strike it out
  for(let wordObj of droppedWords) {
      if(wordObj.word === word) {
          strike = true;
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
        handleDrop(item.value, dropResult.order, item.order);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  //switch strike based on whether word has been dropped
  const textDecoration = strike ? 'line-through' : 'none';

  let content = null;

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
