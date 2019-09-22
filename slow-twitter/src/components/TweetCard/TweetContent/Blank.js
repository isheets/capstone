import React, { Fragment } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";

const Blank = props => {
  let extractedWord = props.extractedWord;
  let blankOrder = props.blankOrder;
  let droppedWord = useSelector(state => state.game.droppedWord);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "word",
    order: blankOrder,
    drop: () => ({ name: extractedWord, order: blankOrder }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  let content = null;

  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  let color = backgroundColor;
  if (isActive) {
    backgroundColor = "grey";
    color = backgroundColor;
  } else if (canDrop) {
    backgroundColor = "#38A1F3";
    color = backgroundColor;
  }

  if (droppedWord == extractedWord) {
    content = (
      <span
        ref={drop}
        className="tweet-blank"
        style={{ backgroundColor: "white", color: "black" }}
      >
        {extractedWord}
      </span>
    );
  } else {
    content = (
      <span
        ref={drop}
        className="tweet-blank"
        style={{ backgroundColor, color }}
      >
        {extractedWord}
      </span>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default Blank;
