import React, { Fragment } from 'react'
import { useSelector } from "react-redux";
import { useDrag } from 'react-dnd';

const Drag = (props) => {
    const extractedWord = useSelector(state => state.game.extractedWord)
    const wordObject = props.wordObject;

    const [{ isDragging }, drag] = useDrag({
        item: { value: extractedWord, type: wordObject.type },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                alert(`You dropped ${item.value} into ${dropResult.name}!`)
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })


    const opacity = isDragging ? 0.4 : 1

    let content = null;

    if (wordObject !== null) {
        content = (

            <div ref={drag} style={{ opacity }} className="word-drag">
                {wordObject.word}
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