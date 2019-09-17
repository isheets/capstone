import React from 'react'
import { useDrop } from 'react-dnd';

const Blank = (props) => {
    let extractedWord = props.extractedWord;
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "word",
        drop: () => ({ name: 'Blank' }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const isActive = canDrop && isOver
    let backgroundColor = 'white'
    let color = backgroundColor;
    if (isActive) {
        backgroundColor = 'grey'
        color = backgroundColor;
    } else if (canDrop) {
        backgroundColor = '#38A1F3'
        color = backgroundColor;
    }

    return (
        <span ref={drop} className="tweet-blank" style={{ backgroundColor, color }}>
            {extractedWord}
        </span>
    )
}

export default Blank