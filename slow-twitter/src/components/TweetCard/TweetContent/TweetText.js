import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Typing from 'react-typing-animation';
import TweetProfilePic from "./../TweetProfilePic";
import AuthorBlank from "./AuthorBlank";

import Typist from 'react-typist';

export var timeSinceTweet = function (tweetDateString) {

	// Convert both dates to milliseconds
	var tweetDate = new Date(tweetDateString);
	var tweetTime = tweetDate.getTime();
	var nowDate = new Date();
	var nowTime = nowDate.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = nowTime - tweetTime;
	//take out milliseconds
	difference_ms = difference_ms / 1000;
	var seconds = Math.floor(difference_ms % 60);
	difference_ms = difference_ms / 60;
	var minutes = Math.floor(difference_ms % 60);
	difference_ms = difference_ms / 60;
	var hours = Math.floor(difference_ms % 24);
	var days = Math.floor(difference_ms / 24);

	if (days > 0) {
		return days + "d"
	}
	else if (hours > 0) {
		return hours + "h"
	}
	else if (minutes > 0) {
		return minutes + "m"
	}
	else if (seconds > 0) {
		return seconds + "s"
	}
	else {
		return "0s"
	}
}


const TweetText = props => {
	const game = useSelector(state => state.game.curGame);
	if (game !== null) {
		let curTweet = game.curTweet;

		//reset used indexes for every new tweet
		//usedIdx = [];

		let quote = props.quote;
		let textToRender;
		let urlsToRender = [];
		let tweetToRender;
		let classForTweetInfo;
		//check if we need to render quote tweet info or no
		if (quote === true) {
			tweetToRender = curTweet.quoteTweet;
			classForTweetInfo = "quote-tweet-info";
		}
		else {
			tweetToRender = curTweet;
			classForTweetInfo = "tweet-info"
		}
		let infoContent;
		if (tweetToRender !== null) {
			timeSinceTweet(tweetToRender.date);
			infoContent = (
				<div className="info">
					{/* <TweetProfilePic url={tweetToRender.user.pic}/> */}
					<h3 className={classForTweetInfo + "-name"}>&#8213; {tweetToRender.user.name} <span className={classForTweetInfo + "-details"}>(@{tweetToRender.user.handle})</span></h3>
				</div>
			)
		}
		else {
			infoContent = (<p>curTweet not found</p>);
		}

		//no need to extract words if it's a quote tweet
		if (quote === true) {
			textToRender = curTweet.quoteTweet.text;
			if (curTweet.quoteTweet.urls !== null) {
				for (let i = 0; i < curTweet.quoteTweet.urls.length; i++) {
					urlsToRender.push(
						<a target="_blank" href={curTweet.quoteTweet.urls[i].expanded_url} rel="noopener noreferrer" key={i}>
							&#x2197; {curTweet.quoteTweet.urls[i].display_url}
						</a>
					);
				}
			}
		}
		//extract words and such if its a fillblank game
		else if (game.type === 'FillBlank') {
			textToRender = game.textToRender;
			console.log(textToRender);
			if (curTweet.urls !== null) {
				for (let i = 0; i < curTweet.urls.length; i++) {
					urlsToRender.push(
						<a target="_blank" href={curTweet.urls[i].expanded_url} rel="noopener noreferrer" key={i}>
							&#x2197; {curTweet.urls[i].display_url}
						</a>
					);
				}
			}
		}
		//no need to extract words if game is guess author
		else if (game.type === 'GuessAuthor') {
			infoContent = <AuthorBlank />;
			textToRender = curTweet.text;
			if (curTweet.urls !== null) {
				for (let i = 0; i < curTweet.urls.length; i++) {
					urlsToRender.push(
						<a target="_blank" href={curTweet.urls[i].expanded_url} rel="noopener noreferrer" key={i}>
							-> {curTweet.urls[i].display_url}
						</a>
					);
				}
			}
		}
		else if (game.type === "Complete" || game.type === 'NoTweets') {
			textToRender = curTweet.text;
			if (curTweet.urls !== null) {
				for (let i = 0; i < curTweet.urls.length; i++) {
					urlsToRender.push(
						<a target="_blank" href={curTweet.urls[i].expanded_url} rel="noopener noreferrer" key={i}>
							-> {curTweet.urls[i].display_url}
						</a>
					);
				}
			}
		}
		else {
			console.error('Game type not recognized in TweetText');
		}

		let tweetDate = new Date(tweetToRender.date)

		return (
			<div className="tweet-content-wrapper">
				<div className="tweet-content">
					{game.type === 'FillBlank' || game.type === 'GuessAuthor' && quote !== true ?
						<Fragment>
							<h4 className="bold">Recieved at {tweetDate.toLocaleTimeString('en-US')} {tweetDate.toLocaleDateString('en-US')}</h4>
							<pre className="tweet-text">{textToRender}</pre>
							{infoContent}
							<div className="tweet-urls">{urlsToRender}</div>
						</Fragment>

						:

						<Fragment>
							<h4>Recieved at {timeSinceTweet(tweetToRender.date)}</h4>
							<pre>{textToRender}</pre>
							{infoContent}
							<div className="tweet-urls">{urlsToRender}</div>
						</Fragment>
					}
				</div>
			</div>
		);
	}
	else return null;
};

export default TweetText;
