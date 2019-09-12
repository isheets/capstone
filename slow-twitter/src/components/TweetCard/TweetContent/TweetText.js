import React, { Fragment } from 'react'
import { useSelector } from "react-redux";

var getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

var extractWords = (text) => {
    //text = "I Stole The Yale Plates And now I want to share my side of the story."
    let wordAr = text.split(/(\s+)/);
    console.log(wordAr);
    let randIdxs = [];
    randIdxs[0] = getRandomInt(wordAr.length - 1);
    let nxtIdx = getRandomInt(wordAr.length - 1);
    while(nxtIdx === randIdxs[0]) {
        nxtIdx = getRandomInt(wordAr.length - 1);
    }
    randIdxs[1] = nxtIdx;
    let extractedWords = [];
    for(let randIdx of randIdxs) {
        extractedWords.push(wordAr[randIdx])
        wordAr[randIdx] = "{     }";
    }
    let newText = "";
    for(let i = 0; i < wordAr.length; i++) {
        newText += wordAr[i];
        if(i !== wordAr.length - 1) {
            newText += " ";
        }
    }

    console.log(extractedWords);
    return newText;
}

const TweetText = () => {
    const text = useSelector(state => state.game.curTweet.text);

    let textMissingWords = extractWords(text);
    console.log(textMissingWords);
    let parsedText = text.split('\n').map((item, i) => <p key={i}>{item.replace(/ /g, "\u0020")}</p>);
    console.log(parsedText);
    return (
        <div className="tweet-text">
            <pre>{`${text}`}</pre>
        </div>

    )
}

export default TweetText

