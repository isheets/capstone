import React, { Fragment } from "react";
import {useSelector} from 'react-redux';


const Lives = () => {
    const curGame = useSelector(state => state.game.curGame);

    let content = null;

    if(curGame !== null) {
        content = (
            <Fragment>
                <h2>Lives: {curGame.lives}</h2>
            </Fragment>
        )
    }

    return <div>{content}</div>;
}
export default Lives