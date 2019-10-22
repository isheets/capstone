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
		} else {
			textToRender = game.findAndExtractWords();
			//textToRender = extractWords(curTweet.text);
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
