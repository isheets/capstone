import React from 'react'
import { useDrop } from 'react-dnd';

let correctWord;


const Blank = (props) => {
    let extractedWord = props.extractedWord;
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "correct",
        drop: () => ({ name: 'Blank' }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    let color = backgroundColor;
    if (isActive) {
        backgroundColor = 'darkgreen'
        color = backgroundColor;
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
        color = backgroundColor;
    }

    return (
        <span ref={drop} className="tweet-blank" style={{ backgroundColor, color }}>
            {extractedWord}
        </span>
    )
}

export default Blank