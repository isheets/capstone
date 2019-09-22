import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blank from "./Blank";
import { setExtractedWords, setWordOptions } from "../../../actions";
import ExtractedWord from "../../../game/ExtractedWord";
import verbs from "../../../custom-dict/verbs";

import posMap from "../../../config/pos";

var Sentencer = require("sentencer");
Sentencer.configure({
  actions: {
    verb: function() {
      return verbs[Math.floor(Math.random() * (verbs.length - 1))];
    }
  }
});

var pos = require("pos");
var tagger = new pos.Tagger();
let dispatch;

//array to keep track of all indexes we've generated and checked
let usedIdx = [];

var getRandomUniqueIndex = max => {
  console.log("usedIdx: " + usedIdx);
  let newIdx = Math.floor(Math.random() * Math.floor(max));
  while (usedIdx.includes(newIdx)) {
    newIdx = Math.floor(Math.random() * Math.floor(max));
  }
  usedIdx.push(newIdx);
  return newIdx;
};

var checkValidWord = word => {
  if (word.length < 3) {
    return false;
  }
  let wordLex = new pos.Lexer().lex(word);
  let taggedWord = tagger.tag(wordLex);
  let wordPos = taggedWord[0][1];
  if (
    wordPos !== "NN" &&
    wordPos !== "NNS" &&
    wordPos !== "JJ" &&
    wordPos !== "JJR" &&
    wordPos !== "JJS" &&
    wordPos !== "VB" &&
    wordPos !== "VBN" &&
    wordPos !== "VBD" &&
    wordPos !== "VBG" &&
    wordPos !== "VBP" &&
    wordPos !== "VBZ"
  ) {
    return false;
  }
  return true;
};

var extractWords = text => {
  //construct regex to split string into all words
  let allWordExp =
    "(?<=\\s|^|\\b)(?:[-’.%$#&\\/]\\b|\\b[-’.%$#&\\/]|[A-Za-z0-9]|\\([A-Za-z0-9]+\\))+(?=\\s|$|\\b)";
  let allWordReg = new RegExp(allWordExp, "g");

  //use regex to create array of all words in tweet
  let wordAr = text.match(allWordReg);
  console.log(wordAr);
  //declare array to hold all words we extract
  let extractedWordArray = [];

  let numCheckedWords = 0;

  //get 2 random words
  for (let i = 0; i < 2; i++) {
    //get a random index and get the word at that index
    let randIdx = getRandomUniqueIndex(wordAr.length - 1);
    let extractedWord = wordAr[randIdx];

    while (
      checkValidWord(extractedWord) == false &&
      numCheckedWords < wordAr.length - 1
    ) {
      randIdx = getRandomUniqueIndex(wordAr.length - 1);
      extractedWord = wordAr[randIdx];
      numCheckedWords++;
    }

    if (numCheckedWords === wordAr.length - 1) {
      console.log("checked all the words");
    } else {
      let wordLex = new pos.Lexer().lex(extractedWord);
      let taggedWord = tagger.tag(wordLex);
      let wordPos = taggedWord[0][1];

      let mappedPos = posMap[wordPos];

      extractedWordArray.push({
        word: extractedWord,
        mappedPOS: mappedPos
      });

      console.log("extractedWord" + i + ": " + extractedWord);
    }
  }

  //declare array to keep track of words as we find them in the tweet
  let foundWordArray = [];

  for (let word of extractedWordArray) {
    //construct regex to search for the current word
    var searchExtractedWord = `\\b${word.word}\\b`;
    var regSearchExtractedWord = new RegExp(searchExtractedWord);

    //determine the indices of beginning and end of word
    let startIdx = text.search(regSearchExtractedWord);
    let endIdx = startIdx + word.word.length - 1;

    //push an object containing the found indices and the word itself
    foundWordArray.push({
      word: word.word,
      start: startIdx,
      end: endIdx,
      pos: word.mappedPOS
    });
  }

  //sort the array so that smallest idx is first
  foundWordArray.sort((a, b) => (a.start > b.start ? 1 : -1));

  let extractWordObjs = [];

  //loop through sorted found words and extract accordingly
  for (let i = 0; i < foundWordArray.length; i++) {
    let foundWord = foundWordArray[i];
    extractWordObjs.push({
      word: foundWord.word,
      order: i,
      pos: foundWord.pos
    });

    var searchFoundWord = `(\\b${foundWord.word})`;
    var foundWordRegex = new RegExp(searchFoundWord);

    //replace the word with a blank placeholder
    text = text.replace(foundWordRegex, "*!*!%[need a blank here plzz]*!*!%");
    //console.log("text after replace:" + text);
  }

  //split text into array at seperators
  let parts = text.split("*!*!%");

  //array to hold all the jsx
  let jsxAr = [];

  //iterator to keep track of how what word we're replacing
  let curWordIdx = 0;

  for (let i = 0; i < parts.length; i++) {
    //insert fill in the blank compenent in at placeholder
    if (parts[i] === "[need a blank here plzz]") {
      jsxAr.push(
        <Blank
          key={i}
          extractedWord={extractWordObjs[curWordIdx].word}
          blankOrder={extractWordObjs[curWordIdx].order}
        />
      );
      //increment curWordIdx iterator
      curWordIdx++;
    }
    //or just put the text
    else {
      jsxAr.push(<span key={i}>{parts[i]}</span>);
    }
  }

  //this should probably go in seperate function (or file)

  let wordOptions = [];
  for (let word of extractWordObjs) {
    wordOptions.push({
      word: word.word,
      order: word.order
    });
    for (let i = 0; i < 3; i++) {
      wordOptions.push({
        word: Sentencer.make(`{{ ${word.pos} }}`),
        order: -1
      });
    }
  }

  dispatch(setExtractedWords(extractWordObjs));
  dispatch(setWordOptions(wordOptions));

  return jsxAr;
};

const TweetText = () => {
  dispatch = useDispatch();
  const text = useSelector(state => state.game.curTweet.text);

  usedIdx = [];

  let textMissingWords = extractWords(text);
  //console.log(textMissingWords);
  return (
    <div className="tweet-text">
      <pre>{textMissingWords}</pre>
    </div>
  );
};

export default TweetText;
