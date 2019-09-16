import React, { Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from 'react-dnd';
import { updateCurTweetId } from './../actions';

let parsedTweets;
let curTweetId;
let dispatch;

var nextTweet = () => {
    if (parsedTweets !== null) {
        if (curTweetId < parsedTweets.length - 1) {
            dispatch(updateCurTweetId(curTweetId + 1));
        }
        else {
            console.error("Can't go to next tweet, does not exist. curTweetId: " + curTweetId);
        }
    }
}

const Drag = (props) => {
    dispatch = useDispatch();
    let correctWord = useSelector(state => state.game.extractedWord)
    parsedTweets = useSelector(state => state.game.parsedTweets)
    curTweetId = useSelector(state => state.game.curTweetId)
    const word = props.word;
    console.log(word);


    const [{ isDragging }, drag] = useDrag({
        item: { value: word, type: "word" },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                if (item.value === correctWord) {
                    alert(`Correct!`);
                    nextTweet();
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