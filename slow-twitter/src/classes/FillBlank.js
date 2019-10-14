import React, { Fragment } from "react";
import Game from "./Game";
import verbs from "./../custom-dict/verbs";
import posMap from "./../config/pos";
import Blank from "./../components/TweetCard/TweetContent/Blank";
import {updateCurGame} from './../actions';
import Update from './Update';

var pos = require("pos");
var tagger = new pos.Tagger();

//get sentencer reference for generating random words basd on pos
var Sentencer = require("sentencer");
Sentencer.configure({
	actions: {
		verb: function () {
			return verbs[Math.floor(Math.random() * (verbs.length - 1))];
		}
	}
});

export class FillBlank extends Game {
	constructor(type, newTweet) {
		//call constructor from super class Game
		super(type, newTweet);

		//FillBlank specific properties
		this.extractedWords = []; //array of extracted word objects
		this.wordOptions = []; //array of word options objects
		this.numBlanks = 0;
		this.numDropped = 0; //intially equal to zero
		this.droppedWords = []; // array of dropped words
		this.lives = 3;
	}

	setCurrentTweet(tweet) {
		this.curTweet = tweet;
	}

	//takes a drop and checks if it's true
	handleDrop(droppedWord, droppedIn, correctDrop) {
		console.log("droppedWord: " + droppedWord + ", droppedIn: " + droppedIn);

		let newWordObj = {
			word: droppedWord,
			droppedIn: droppedIn
		};

		if (droppedIn === correctDrop) {
			newWordObj.correct = true;
		} else {
			newWordObj.correct = false;
		}



		//check if we already dropped the word, move it if so and stop
		if (this.checkMovedWord(droppedWord)) {
			this.droppedWords = [];

			this.droppedWords.push(this.droppedWords.map(wordObj => {
				if (wordObj.word === newWordObj.word) {
					return newWordObj
				}
				else {
					return wordObj
				}
			}));
		}
		//check if already filled the blank, change the word if so
		else if (this.checkAlreadyDropped(droppedIn)) {
			this.droppedWords = [];
			this.droppedWords.push(this.droppedWords.map(wordObj => {
				if (wordObj.droppedIn === newWordObj.droppedIn) {
					return newWordObj;
				}
				else {
					return wordObj;
				}

			}));
		}
		//else add the word
		else {
			this.droppedWords.push(newWordObj)
		}

		

		this.checkDone();

	}

	checkMovedWord(word) {
		//check to see if we have the word in our dropped word array
		for (let wordObj of this.droppedWords) {
			if (wordObj.word === word) {
				//we already have the word
				return true;
			}
		}
		//new word
		return false;
	}

	//checks to see if the blank is alrFieady filled
	//returns true with already dropped, so need to update word
	//or false and need to add word
	checkAlreadyDropped(dropID) {
		//check to see if we already dropped a word in this spot
		for (let wordObj of this.droppedWords) {
			if (wordObj.droppedIn === dropID) {
				//we already filled the blank
				return true;
			}
		}
		//blank is empty
		return false
	}



	//handles a correct drop
	correctDrop() { }

	//handles an incorrect drop
	incorrectDrop() {
		//subtract lives
		//remove word from blank
	 }

	//checks if we have filled all the blanks
	checkDone() {
		//finally check if we've finished completing the tweet
		console.log('checking to see if we completed the entire tweet');
		if (this.droppedWords.length === this.extractedWords.length) {
			let correct = true;
			for (let wordObj of this.droppedWords) {
				if (wordObj.correct === false) {
					correct = false;
				}
			}
			if (correct === true) {
				//tweet completed successfully
				this.success()
				alert('great job! you did it!');

			}
			else {
				//tweet completed incorrectly
				this.fail()
				alert("that would be INCORRECT!!!!! IDIOT!");

			}
		}
		else {
			//NOT DONE CODE HERE
		}
	}

	//game is done and everything is correct
	success() { 
		//reset lives
		//get the next tweet
	}

	//game is done and not everything is correct
	fail() { }


	//takes an array of extracted words (objects) and updates numExtracted words
	setExtractedWords(extractedWords) {
		this.extractedWords = extractedWords;
		this.numBlanks = extractedWords.length;
	}

	//takes array of word options (objects)
	setWordOptions(wordOptions) {
		this.wordOptions = wordOptions;
	}

	//set the correct
	setCorrect(correct) {
		this.correct = correct;
	}

	//set the done property
	setDone(done) {
		this.done = done;
	}

	static fromJSON(serializedJson) {
		let newInstance = Object.assign(new FillBlank(), serializedJson);
		return newInstance;
	} 

	findAndExtractWords() {
		return this.getRandomWords();
	}

	//pick which words we will eventually extract
	getRandomWords() {
		//get the text
		let text = this.curTweet.text;
		//construct regex to split string into all words
		let allWordExp =
			"(?<=\\s|^|\\b)(?:[-’%$#&\\/]\\b|\\b[-’%$#&\\/]|[A-Za-z0-9]|\\([A-Za-z0-9]+\\))+(?=\\s|$|\\b)";
		let allWordReg = new RegExp(allWordExp, "g");


		//use regex to create array of all words in tweet
		let wordAr = text.match(allWordReg);

		//some issue with getting words - maybe all emojis or excalamation or something else
		if (wordAr === null) {
			//log an error and just return the text to avoid crash
			console.error("NO WORDS IN WORD ARRAY");
			//dispatch(setExtractedWords([]));
			//dispatch(setWordOptions([]));
			return text;
		}
		//declare array to hold all words we extract
		let extractedWordArray = [];

		let numCheckedWords = 0;

		//determine how many words to extract based on number of characters
		let numChar = text.length;
		let numWordsToExtract = 1;
		if (numChar <= 50) {
			numWordsToExtract = 1;
		} else if (numChar > 50 && numChar <= 150) {
			numWordsToExtract = 2;
		} else if (numChar > 150 && numChar <= 2500) {
			numWordsToExtract = 3;
		} else {
			numWordsToExtract = 4;
		}

		usedIdx = [];
		//get 2 random words
		for (let i = 0; i < numWordsToExtract; i++) {
			//get a random index and get the word at that index
			let randIdx = getRandomUniqueIndex(wordAr.length - 1);
			let extractedWord = wordAr[randIdx];

			while (
				checkValidWord(extractedWord, extractedWordArray) == false &&
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
			}
		}

		//we picked out words, next up: find them
		return this.findWordsInText(extractedWordArray);
	}

	//take the words we want to find and then....find them in the text
	findWordsInText(extractedWordArray) {
		//get the text
		let text = this.curTweet.text;
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

		//we have a sorted array of words we want to extract and their start/end indexes
		return this.extractWords(foundWordArray)
	}

	extractWords(foundWordArray) {
		//get the text
		let text = this.curTweet.text;

		console.log(foundWordArray);

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

		//one correct word and three matching random incorrect words
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

		this.setWordOptions(wordOptions);
		this.setExtractedWords(extractWordObjs);

		console.log(jsxAr);

		return jsxAr;
	}
}

//private function to get a random index from the text word array
let usedIdx = [];

var getRandomUniqueIndex = max => {
	console.log("usedIdx: " + usedIdx);
	let newIdx = Math.floor(Math.random() * Math.floor(max));
	while (usedIdx.includes(newIdx) && usedIdx.length < max) {
		newIdx = Math.floor(Math.random() * Math.floor(max));
	}
	usedIdx.push(newIdx);
	return newIdx;
};

//private function to make sure the word is good
var checkValidWord = (word, extractedWordArray) => {
	//need word to be at least 2 characters
	if (word.length < 3) {
		return false;
	}
	//don't get the same word twice
	if (extractedWordArray.includes(word)) {
		return false;
	}
	//only want nouns, adj, and verbs
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
