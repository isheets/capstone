import React, { Fragment } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";

const AuthorBlank = () => {
    console.log('rendering blank');
    const [{ canDrop, isOver, authorBeingDragged }, drop] = useDrop({
        accept: "author",
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            authorBeingDragged: monitor.getItem()
        })
    });

    const isActive = canDrop && isOver;
    let backgroundColor = "none";
    let color = 'black';
    if (isActive) {
      backgroundColor = "#C7CFD9";
      color = 'black';
    } else if (canDrop) {
      backgroundColor = "#BF0404";
      color = backgroundColor;
    }
    console.log(authorBeingDragged);

    return  (
        <div ref={drop} className="author-blank" style={{backgroundColor, color}}>
        </div>
    )
}

export default AuthorBlank;