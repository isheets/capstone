import React, { Fragment } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";

const AuthorBlank = () => {
    const [{ canDrop, isOver, authorBeingDragged }, drop] = useDrop({
        accept: "author",
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            authorBeingDragged: monitor.getItem()
        })
    });

    console.log(authorBeingDragged);

    return  (
        <div ref={drop} className="author-blank">
            <h3>Drop an author here</h3>
        </div>
    )
}

export default AuthorBlank;