import React, { Fragment } from 'react'
import { useSelector } from "react-redux";

var timeSinceTweet = function( tweetDateString ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;
  
    // Convert both dates to milliseconds
    var tweetDate = new Date(tweetDateString);
    var tweetTime = tweetDate.getTime();
    var nowDate = new Date();
    var nowTime = nowDate.getTime();
  
    // Calculate the difference in milliseconds
    var difference_ms = nowTime - tweetTime;
    //take out milliseconds
    difference_ms = difference_ms/1000;
    var seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    var minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    var hours = Math.floor(difference_ms % 24);  
    var days = Math.floor(difference_ms/24);

    if(days > 0) {
        return days + "d"
    }
    else if(hours > 0) {
        return hours + "h"
    }
    else if(minutes > 0) {
        return minutes + "m"
    }
    else if(seconds > 0) {
        return seconds + "s"
    }
    else {
        return "0s"
    }
  }


const TweetInfo = (props) => {
    const curTweet = useSelector(state => state.game.curTweet);
    let quote = props.quote;
    let tweetToRender;
    let classForTweetInfo;
    //check if we need to render quote tweet info or no
    if(quote == true) {
        tweetToRender = curTweet.quoteTweet;
        classForTweetInfo = "quote-tweet-info";
    }
    else {
        tweetToRender = curTweet;
        classForTweetInfo = "tweet-info"
    }
    let content;
    if (tweetToRender !== null) {
        timeSinceTweet(tweetToRender.date);
        content = (
            <div className={classForTweetInfo}>
                <h3 className={classForTweetInfo + "-name"}>{tweetToRender.user.name}</h3>
                <h4 className={classForTweetInfo + "-details"}>@{tweetToRender.user.handle} / {timeSinceTweet(tweetToRender.date)}</h4>
            </div>
        )
    }
    else {
        content = (<p>curTweet not found</p>);
    }
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default TweetInfo