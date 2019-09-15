import React, { Fragment } from 'react'
import { useSelector } from "react-redux";
import { useDrag } from 'react-dnd';

const Drag = () => {
    const extractedWord = useSelector(state => state.game.extractedWord)

    const [{ isDragging }, drag] = useDrag({
        item: { value: extractedWord, type: "correct-word" },
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

    if (extractedWord !== null) {
        content = (
            <Fragment>
                {extractedWord}
            </Fragment>

        )
    }

    return (
        <div ref={drag} style={{ opacity }} className="word-drag">
            {content}
        </div>
    )
}

export default Drag;