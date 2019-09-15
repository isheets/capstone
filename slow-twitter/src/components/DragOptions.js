import React, { Fragment } from 'react'
import { useSelector } from "react-redux";
import Drag from './Drag';

const DragOptions = () => {
    const wordOptions = useSelector(state => state.game.wordOptions);

    let content = null;

    if (wordOptions.length > 0) {
        content =
            wordOptions.map((wordObject, key) =>
                <Drag wordObject={wordObject} key={key} />
            );

    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}
export default DragOptions