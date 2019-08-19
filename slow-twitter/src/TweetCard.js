import React, {Component} from 'react';

export default class TweetCard extends Component {

    render() {
        const tweetObjects = this.props.tweetObjects;
        console.log(tweetObjects);
        //no tweets so just return some static text
        if(!tweetObjects || tweetObjects.length === 0) {
            return(<h2>No tweets</h2>)
        }
        let content;
        if(tweet.hasMedia) {
        content = <div>

        </div>
        }
        else {
            return (
                <div>
                    {tweetObjects.map((tweet, index) =>
                        <div className="tweetCard" key={index}>
                            <h2><img src={tweet.profilePic} alt=""></img> {tweet.userName} </h2>
                            <h3>{tweet.userHandle}</h3>
                            <p>{tweet.text}</p>
                        </div>
                    )}
                </div>
            )
        }
    }
}