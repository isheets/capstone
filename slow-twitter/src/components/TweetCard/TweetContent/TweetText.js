import React, { Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Blank from './Blank';
import { setExtractedWord, setWordOptions } from '../../../actions';

let randomWords = require('random-words');

let dispatch;

var getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

var extractWords = (text) => {
    let allWordExp = "(\\w+)";
    let allWordReg = new RegExp(allWordExp, "g");
    console.log("all words regex:");
    console.log(allWordReg);

    let wordAr = text.match(allWordReg);
    console.log("all words:");
    console.log(wordAr);

    let randIdx = getRandomInt(wordAr.length - 1);
    let extractedWord = wordAr[randIdx];
    while (extractedWord === " ") {
        randIdx = getRandomInt(wordAr.length - 1);
        extractedWord = wordAr[randIdx];
    }

    console.log("extracted word:" + extractedWord);
    var searchExtractedWord = `(\\b${extractedWord}\\b)`;
    var regSearchExtractedWord = new RegExp(searchExtractedWord);


    var parts = [];

    let startIdxFirst = text.search(regSearchExtractedWord);
    let endIdxFirst = startIdxFirst + extractedWord.length - 1;

    //extracted word at the beginning
    if(startIdxFirst === 0) {
        console.log("extracted word at start of string");
    }  
    //extracted word at the end
    else if (endIdxFirst === text.length - 1) {
        console.log("extracted word at end of string")

    }
    //extracted word somewhere in the middle; most likely case
    else {
        //first part of tweet -> extracted word
        parts[0] = text.substring(0, startIdxFirst);
        //extracted word
        parts[1] = "[need a blank here plz]"
        //end of extracted word -> end of string
        parts[2] = text.substring(endIdxFirst + 1)
    }


    // for (var i = 1; i < parts.length; i += 2) {
    //     parts[i] = "[need a blank here plz]";
    // }
    console.log("parts array: ");
    console.log(parts);
    let jsxAr = [];

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === "[need a blank here plz]") {
            jsxAr.push(<Blank key={i} extractedWord={extractedWord} />);
        }
        else {
            jsxAr.push(<span key={i}>{parts[i]}</span>);
        }
    }
    let randWordAr = randomWords(3);
    console.log(randWordAr);
    const wordOptions = [extractedWord, randWordAr[0], randWordAr[1], randWordAr[2]];
    dispatch(setExtractedWord(extractedWord));
    dispatch(setWordOptions(wordOptions));

    return jsxAr;
}

const TweetText = () => {
    dispatch = useDispatch()
    const text = useSelector(state => state.game.curTweet.text);

    let textMissingWords = extractWords(text);
    console.log(textMissingWords);
    return (
        <div className="tweet-text">
            <pre>
                {textMissingWords}
            </pre>
        </div>

    )
}

export default TweetText

