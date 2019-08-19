import React, {Component} from 'react';

export default class TweetCard extends Component {

    render() {
        const tweetObjects = this.props.tweetObjects;
        console.log(tweetObjects);
        if(!tweetObjects || tweetObjects.length === 0) {
            return(<h2>No tweets</h2>)
        }
        else {
            return (
                <div>
                    {tweetObjects.map((item, index) =>
                        <div className="tweetCard" key={index}>
                            <h2><img src={item.user.profile_image_url}></img> {item.user.name} </h2>
                            <h3>{item.user.screen_name}</h3>
                            <p>{item.text}</p>
                        </div>
                    )}
                </div>
            )
        }
    }
}