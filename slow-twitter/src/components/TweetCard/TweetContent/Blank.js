import React, { Fragment } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";

const Blank = props => {
  let extractedWord = props.extractedWord;
  let blankOrder = props.blankOrder;
  let droppedWords = useSelector(state => state.game.droppedWords);
  const [{ canDrop, isOver, wordBeingDragged }, drop] = useDrop({
    accept: "word",
    order: blankOrder,
    drop: () => ({ name: extractedWord, order: blankOrder }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      wordBeingDragged: monitor.getItem()
    })
  });

  console.log(wordBeingDragged);

  let content = null;
  let blankFiller = ".....";
  let width = "20px";

  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  let color = backgroundColor;
  if (isActive) {
    backgroundColor = "white";
    color = backgroundColor;
    //size all the blanks according to the word being dragged
    blankFiller = wordBeingDragged.value;
    width = 'min-content';
  } else if (canDrop) {
    backgroundColor = "#38A1F3";
    color = backgroundColor;
    blankFiller = wordBeingDragged.value;
    width = 'min-content';

  }

  let wordInBlank = null;

  for (let droppedWord of droppedWords) {
    if (droppedWord.droppedIn === blankOrder) {
      wordInBlank = droppedWord;
    }
  }

  //render blank or filled in blank
  if (wordInBlank !== null) {
    content = (
      <span
        ref={drop}
        className="tweet-blank-filled"
        style={{ backgroundColor: "white", color: "black" }}
      >
        {wordInBlank.word}
      </span>
    );
  } else {
    content = (
      <span
        ref={drop}
        className="tweet-blank"
        style={{ backgroundColor, color, width }}
      >
        {blankFiller}
      </span>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default Blank;
