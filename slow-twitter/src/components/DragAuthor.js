import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import TweetProfilePic from './TweetCard/TweetProfilePic'

const DragAuthor = props => {
    let authorGame = useSelector(state => state.game.curGame);

    const name = props.name;
    const url = props.url;
    const handle = props.handle;
    const time = props.time;
    const correct = props.correct;

    let content = null;

    const [{ isDragging }, drag] = useDrag({
        item: { author: { name: name, url: url, handle: handle, time: time }, correct: correct, type: "author" },
        //called after word is dropped
        end: (item, monitor) => {
            console.log(item);
            //call function to check order and word correctness
            //authorGame.handleDrop(item.correct);
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0.4 : 1;

    content = (
        <div className="author-drag" ref={drag}>
            <TweetProfilePic url={url}></TweetProfilePic>
            <div className="tweet-info" style={{ opacity }}>
                <h3 className={"tweet-info-name"}>{name}</h3>
                <h4 className={"tweet-info-details"}>@{handle} / {time}</h4>
            </div>
        </div>
    );

    return <Fragment>{content}</Fragment>

}

export default DragAuthor;