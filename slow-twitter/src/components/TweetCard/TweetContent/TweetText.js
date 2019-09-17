import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blank from "./Blank";
import { setExtractedWord, setWordOptions } from "../../../actions";

let randomWords = require("random-words");

var pos = require("pos");
var tagger = new pos.Tagger();
let dispatch;

var getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

var extractWords = text => {
  let allWordExp =
    "(?<=\\s|^|\\b)(?:[-'.%$#&\\/]\\b|\\b[-'.%$#&\\/]|[A-Za-z0-9]|\\([A-Za-z0-9]+\\))+(?=\\s|$|\\b)";
  let allWordReg = new RegExp(allWordExp, "g");
  console.log("all words regex:");
  console.log(allWordReg);

  let wordAr = text.match(allWordReg);
  console.log("all words:");
  console.log(wordAr);

  let randIdx = getRandomInt(wordAr.length - 1);
  let extractedWord = wordAr[randIdx];

  var words = new pos.Lexer().lex(extractedWord);
  var taggedWord = tagger.tag(words);
  console.log("TAGGED WORD:")
  console.log(taggedWord[0]);

//   //TODO: use RegEx to capture all types of nouns, adverbs, verbs, and adjective in just 4 or statements????
  while(taggedWord[0][1] !== 'NN' && taggedWord[0][1] !== 'NNS' && taggedWord[0][1] !== 'RB' && taggedWord[0][1] !== 'RBR' && taggedWord[0][1] !== 'RBS' && taggedWord[0][1] !== 'VB' && taggedWord[0][1] !== 'VBD' && taggedWord[0][1] !== 'VBG' && taggedWord[0][1] !== 'VBN' && taggedWord[0][1] !== 'VBP' && taggedWord[0][1] !== 'VBZ' && taggedWord[0][1] !== 'JJ' && taggedWord[0][1] !== 'JJR' && taggedWord[0][1] !== 'JJS') {
    randIdx = getRandomInt(wordAr.length - 1);
    extractedWord = wordAr[randIdx];
    words = new pos.Lexer().lex(extractedWord);
    taggedWord = tagger.tag(words);
    console.log("NEW TAGGED WORD:");
    console.log(taggedWord[0]);
  }

  console.log("extracted word:" + extractedWord);



  

  var parts = [];

  var searchExtractedWord = `(\\b${extractedWord}\\b)`;
  var regSearchExtractedWord = new RegExp(searchExtractedWord);
  let startIdxFirst = text.search(regSearchExtractedWord);
  let endIdxFirst = startIdxFirst + extractedWord.length - 1;

  //extracted word at the beginning
  if (startIdxFirst === 0) {
    console.log("extracted word at start of string");
  }
  //extracted word at the end
  else if (endIdxFirst === text.length - 1) {
    console.log("extracted word at end of string");
  }
  //extracted word somewhere in the middle; most likely case
  else {
    //first part of tweet -> extracted word
    parts[0] = text.substring(0, startIdxFirst);
    //extracted word
    parts[1] = "[need a blank here plz]";
    //end of extracted word -> end of string
    parts[2] = text.substring(endIdxFirst + 1);
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
    } else {
      jsxAr.push(<span key={i}>{parts[i]}</span>);
    }
  }
  let randWordAr = randomWords(3);
  console.log(randWordAr);
  const wordOptions = [
    extractedWord,
    randWordAr[0],
    randWordAr[1],
    randWordAr[2]
  ];
  dispatch(setExtractedWord(extractedWord));
  dispatch(setWordOptions(wordOptions));

  return jsxAr;
};

const TweetText = () => {
  dispatch = useDispatch();
  const text = useSelector(state => state.game.curTweet.text);

  let textMissingWords = extractWords(text);
  console.log(textMissingWords);
  return (
    <div className="tweet-text">
      <pre>{textMissingWords}</pre>
    </div>
  );
};

export default TweetText;
