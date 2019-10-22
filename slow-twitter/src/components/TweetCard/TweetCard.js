import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TweetProfilePic from "./TweetProfilePic";
import TweetInfo from "./TweetInfo";
import TweetContent from "./TweetContent/TweetContent";
import AuthorBlank from './TweetContent/AuthorBlank';
import "./TweetCard.css";

const TweetCard = () => {
  //hook into state to get the current tweet to display
  let game = useSelector(state => state.game.curGame);
  let content;

  if (game !== null) {
    let curTweet = game.curTweet;

    //make sure we have content to render
    if (curTweet !== null) {
      //render the info and everything if its FillBlank
      if (game.type === 'FillBlank') {

        content = (
          <Fragment>
            <TweetProfilePic url={curTweet.user.pic} />
            <TweetInfo />
            <TweetContent />
          </Fragment>
        );
      }
      //put in blank instead of info
      else if (game.type === 'GuessAuthor') {
        content = (
          <Fragment>
            <AuthorBlank />
            <TweetContent />
          </Fragment>
        )
      }
      else {
        console.error('Game type not caught in TweetCard');
      }
    }

  }

  //no tweets view
  else {
    content = <h1>No tweet to render, fetch timeline</h1>;
  }

  return <div className="tweet-card-wrapper"><div className="tweet-card">{content}</div></div>;
};

export default TweetCard;
