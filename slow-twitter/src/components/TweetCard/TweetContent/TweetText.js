import React, { Fragment } from 'react'
import { useSelector } from "react-redux";
import Blank from './Blank';

var getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

var extractWords = (text) => {
    //text = "I Stole The Yale Plates And now I want to share my side of the story."
    let wordAr = text.split(/(\s+)/);
    console.log(wordAr);
    let randIdx = getRandomInt(wordAr.length - 1);
    let extractedWord = wordAr[randIdx];
    while (extractedWord === " ") {
        randIdx = getRandomInt(wordAr.length - 1);
        extractedWord = wordAr[randIdx];
    }

    console.log("extracted word:"  + extractedWord);
    var replace = `(\\b${extractedWord}+\\b)`;
    var reg = new RegExp(replace, "i");
    console.log(reg);

    var parts = text.split(reg);
    for (var i = 1; i < parts.length; i += 2) {
        parts[i] = "[need a blank here plz]";
    }
    console.log("parts array: ");
    console.log(parts);
    let jsxAr = [];

    for(let i = 0; i < parts.length; i++) {
        if( parts[i] === "[need a blank here plz]") {
            jsxAr.push(<Blank key={i}/>);
        }
        else {
            jsxAr.push(<span key={i}>{parts[i]}</span>);
        }
    }

    return jsxAr;
}

const TweetText = () => {
    const text = useSelector(state => state.game.curTweet.text);

    let textMissingWords = extractWords(text);
    console.log(textMissingWords);
    return (
        <div className="tweet-text">
            {textMissingWords}
        </div>

    )
}

export default TweetText

