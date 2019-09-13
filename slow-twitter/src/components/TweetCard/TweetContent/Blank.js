import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUserInput, updateCurTweetId } from '../../../actions';

let dispatch;
let correctWord;
let parsedTweets;
let curTweetId;

var handleChange = (event) => {
    console.log(event.target.value);
    if(event.target.value == correctWord) {
        //got it!
        if (curTweetId < parsedTweets.length - 1) {
            dispatch(updateCurTweetId(curTweetId + 1));
            dispatch(setUserInput(""));
        }

    }
    else {    
        dispatch(setUserInput(event.target.value));
    }
}

const Blank = (props) => {
    dispatch = useDispatch();
    correctWord = props.extractedWord;
    const userInput = useSelector(state => state.game.userInput);
    parsedTweets = useSelector(state => state.game.parsedTweets);
    curTweetId = useSelector(state => state.game.curTweetId);

    return (
        <input 
            type="text" 
            value={userInput} 
            onChange={(event) => handleChange(event)} 
            size={correctWord.length}
        />
    )
}

export default Blank