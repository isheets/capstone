import React, { Fragment } from 'react'
import { useSelector } from "react-redux";
import { useDrag } from 'react-dnd';

const Drag = (props) => {
    let correctWord = useSelector(state => state.game.extractedWord)
    const word = props.word;
    console.log(word);

    const [{ isDragging }, drag] = useDrag({
        item: { value: word, type: "word" },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                if (item.value === correctWord) {
                    alert(`Correct!`);
                }
                else {
                    alert("Incorrect!");
                }
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })


    const opacity = isDragging ? 0.4 : 1

    let content = null;

    if (word !== null) {
        content = (

            <div ref={drag} style={{ opacity }} className="word-drag">
                {word}
            </div>

        )
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default Drag;