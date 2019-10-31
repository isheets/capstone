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
    let backgroundColor = "rgb(48, 39, 40)";
    let color = backgroundColor;
    if (isActive) {
      backgroundColor = "rgb(48, 39, 40)";
      color = backgroundColor;
    } else if (canDrop) {
      backgroundColor = "rgb(79, 177, 211)";
      color = backgroundColor;
    }
    console.log(authorBeingDragged);

    return  (
        <div ref={drop} className="author-blank" style={{backgroundColor, color}}>
            <h3>Drop an author here</h3>
        </div>
    )
}

export default AuthorBlank;