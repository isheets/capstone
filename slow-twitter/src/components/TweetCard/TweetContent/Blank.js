import React from 'react'
import { useDrop } from 'react-dnd';

let correctWord;


const Blank = (props) => {
    correctWord = props.extractedWord;
    console.log(correctWord);

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "correct-word",
        drop: () => ({ name: 'Blank' }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

    return (
        <span ref={drop} className="tweet-blank" style={{ backgroundColor }}>
        </span>
    )
}

export default Blank