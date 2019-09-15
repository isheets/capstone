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
    var replace = `(\\b${extractedWord}\\b)`;
    var reg = new RegExp(replace, "g");
    console.log(reg);

    var parts = text.split(reg, 3);
    for (var i = 1; i < parts.length; i += 2) {
        parts[i] = "[need a blank here plz]";
    }
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
    const wordOptions = [
        {
            word: extractedWord,
            type: "correct"

        },
        {
            word: randWordAr[0],
            type: "incorrect"

        },
        {
            word: randWordAr[1],
            type: "incorrect"

        },
        {
            word: randWordAr[2],
            type: "incorrect"

        }];
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

