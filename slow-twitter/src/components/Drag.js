import React, { Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from 'react-dnd';
import { updateCurTweetId, setDroppedWord } from './../actions';

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

//check the order, set the dropped word, and manage game state
//droppedWord: {
//  word: droppedWord
//  droppedIn: order
//}
var handleDrop = (droppedWord, droppedIn, correctDrop) => {
    console.log("droppedWord: " + droppedWord + ", droppedIn: " + droppedIn);
    if(droppedIn === correctDrop) {
        alert('Correct!');
    }
}

const Drag = (props) => {
    dispatch = useDispatch();
    let extractedWords = useSelector(state => state.game.extractedWords)
    parsedTweets = useSelector(state => state.game.parsedTweets)
    curTweetId = useSelector(state => state.game.curTweetId)

    const word = props.word;
    const order = props.order;
    //console.log(word);


    const [{ isDragging }, drag] = useDrag({
        item: { value: word, order: order, type: "word"},
        //called after word is dropped
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            //check if the item and dropResult exist
            if (item && dropResult) {
                //call function to check order and word correctness
                handleDrop(item.value, dropResult.order, item.order);
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