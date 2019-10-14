import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCurGame } from "./../../../actions";

const TweetText = props => {
	let dispatch = useDispatch();
	const game = useSelector(state => state.game.curGame);

	if (game !== null) {
		let curTweet = game.curTweet;
		console.log(game)

		//reset used indexes for every new tweet
		//usedIdx = [];

		let quote = props.quote;
		let textToRender;
		let urlsToRender = [];

		//no need to extract words if it's a quote tweet
		if (quote === true) {
			textToRender = curTweet.quoteTweet.text;
			if (curTweet.quoteTweet.urls !== null) {
				for (let url of curTweet.quoteTweet.urls) {
					urlsToRender += <a href={url.display_url}></a>;
				}
			}
		} else {
			textToRender = game.findAndExtractWords();
			dispatch(updateCurGame(game))
			//textToRender = extractWords(curTweet.text);
			if (curTweet.urls !== null) {
				for (let i = 0; i < curTweet.urls.length; i++) {
					urlsToRender.push(
						<a target="_blank" href={curTweet.urls[i].expanded_url} key={i}>
							-> {curTweet.urls[i].display_url}
						</a>
					);
				}
			}
		}

		return (
			<div className="tweet-text">
				<pre>{textToRender}</pre>
				<div className="tweet-urls">{urlsToRender}</div>
			</div>
		);
	}
	else return null;
};

export default TweetText;
