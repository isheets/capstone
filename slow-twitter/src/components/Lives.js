import React, { Fragment } from "react";
import {useSelector} from 'react-redux';


const Lives = () => {
    const curGame = useSelector(state => state.game.curGame);

    let content = [];


    if(curGame !== null) {
        content.push(<h2 className="lives">Lives:</h2>);
        for(let i = 0; i < curGame.lives; i++) {
            content.push(<h2 className='heart-img'>&#10086;</h2>);
        }
    }
    else {
        content = null;
    }

    return <div className="lives-wrapper">{content}</div>;
}
export default Lives