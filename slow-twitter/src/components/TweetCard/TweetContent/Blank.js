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
  let blankFiller = ".........";
  let width = "fit-content";

  const isActive = canDrop && isOver;
  let backgroundColor = "rgb(48, 39, 40)";
  let color = backgroundColor;
  if (isActive) {
    backgroundColor = "rgb(48, 39, 40)";
    color = backgroundColor;
    //size all the blanks according to the word being dragged
    blankFiller = wordBeingDragged.value;
    width = 'min-content';
  } else if (canDrop) {
    backgroundColor = "rgb(79, 177, 211)";
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
        style={{ backgroundColor: "rgb(48, 39, 40)", color: "rgb(187, 197, 182)" }}
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
