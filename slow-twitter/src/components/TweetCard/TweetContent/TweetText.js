import React from "react";
import { useSelector} from "react-redux";


const TweetText = props => {
	const game = useSelector(state => state.game.curGame);
	if (game !== null) {
		let curTweet = game.curTweet;

		//reset used indexes for every new tweet
		//usedIdx = [];

		let quote = props.quote;
		let textToRender;
		let urlsToRender = [];

		//no need to extract words if it's a quote tweet
		if (quote === true) {
			textToRender = curTweet.quoteTweet.text;
			if (curTweet.quoteTweet.urls !== null) {
				for (let i = 0; i < curTweet.quoteTweet.urls.length; i++) {
					urlsToRender.push(
						<a target="_blank" href={curTweet.quoteTweet.urls[i].expanded_url} rel="noopener noreferrer" key={i}>
							-> {curTweet.quoteTweet.urls[i].display_url}
						</a>
					);
				}
			}
		}
		//extract words and such if its a fillblank game
		else if (game.type === 'FillBlank'){
			textToRender = game.textToRender;
			console.log(textToRender);
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
		//no need to extract words if game is guess author
		else if (game.type === 'GuessAuthor') {
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
		else if(game.type === "Complete") {
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
