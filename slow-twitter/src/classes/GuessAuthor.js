import store from './../index';
import { updateCurGame } from './../actions';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class GuessAuthor {
    constructor(newTweet) {

        console.log("constructing GuessAuthor");
        this.curTweet = newTweet;
        this.type = 'GuessAuthor';

        this.friendOptions = [];
        this.lives = 3;

        this.getRandomFriends();
    }

    getLives() {
        return this.lives;
    }

    //return 5 random friends
    getRandomFriends() {
        if(store !== undefined){
        let state = store.getState();

        let friends = state.game.parsedFriends;
        let correctAuthor = this.curTweet.user;
        
        correctAuthor.correct = true;

        let friendOptions = [];

        friendOptions.push(correctAuthor);

        for(let i = 0; i < 5; i++) {
            let randIdx = getRandomUniqueIndex(friends.length - 1);
            let randFriend = friends[randIdx];
            randFriend.correct = false;
            friendOptions.push(randFriend);
        }

        this.friendOptions = friendOptions;
        store.dispatch(updateCurGame(this));
    }
    else {
        console.error("store empty in getRandomFriends() GuessAuthor");
    }
    }

    static fromJSON(serializedJson) {
		let newInstance = Object.assign(new GuessAuthor(serializedJson.curTweet), serializedJson);
        return newInstance;
	}

}

let usedIdx = [];

var getRandomUniqueIndex = max => {
    let newIdx = Math.floor(Math.random() * Math.floor(max));
    while (usedIdx.includes(newIdx) && usedIdx.length < max) {
        newIdx = Math.floor(Math.random() * Math.floor(max));
    }
    usedIdx.push(newIdx);
    return newIdx;
};