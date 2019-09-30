import React from "react";
import { useSelector } from "react-redux";

//convert to props for reusability!!!!!
const TweetProfilePic = props => {
  let profilePicUrl = props.url;

  let content;

  content = (
    <img src={profilePicUrl} className="tweet-profile-pic" alt=""></img>
  );

  return <div className="tweet-profile-pic-container">{content}</div>;
};

export default TweetProfilePic;
