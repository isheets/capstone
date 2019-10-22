import store from './../index';
import { updateCurGame, updateParsedTweets } from './../actions';
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

    updateTweets(tweets) {
        store.dispatch(updateParsedTweets(tweets));
    }

    updateGame(game) {
        store.dispatch(updateCurGame(game));
    }

    newGame() {
        let state = store.getState();

		let parsedTweets = state.game.parsedTweets;
		let newTweets = parsedTweets;
        newTweets.splice(0, 1);
        
        let newGame = new GuessAuthor(newTweets[0]);
        
		this.updateTweets(newTweets);
		this.updateGame(newGame);
    }

    //return 5 random friends
    getRandomFriends() {
        if (store !== undefined) {
            let state = store.getState();

            let friends = state.game.parsedFriends;
            let correctAuthor = this.curTweet.user;

            correctAuthor.correct = true;

            let friendOptions = [];

            friendOptions.push(correctAuthor);

            for (let i = 0; i < 5; i++) {
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

    handleDrop(correct) {
        //correct drop! do some things
        if(correct) {
            this.success();
        }
        //incorrect drop! do some other things
        else if(!correct) {
            this.incorrectDrop();
        }
    }

    incorrectDrop() {
        		//subtract life
		this.lives = this.lives - 1;
		if (this.lives === 0) {
			this.fail();
		}
		else {
			toast.error('Wrong! ' + this.lives + " lives remaining.", {
				position: "top-center",
				autoClose: 2000,
				closeButton: false,
				pauseOnHover: true,
				draggable: false,
				transition: Zoom,
				hideProgressBar: true
			});
			this.updateGame(this);
		}
    }

    success() {
        		//get the next tweet
		toast.success('Tweet completed correctly!', {
			position: "top-center",
			autoClose: 2000,
			closeButton: false,
			pauseOnHover: true,
			draggable: false,
			transition: Zoom,
			hideProgressBar: true
		});
		this.newGame();
    }

    fail() {
        //display some sort of failure message
		//proceed to next tweet
		toast.error('Game over, man. Game over.', {
			position: "top-center",
			autoClose: 2000,
			closeButton: false,
			pauseOnHover: true,
			draggable: false,
			transition: Zoom,
			hideProgressBar: true
		});

		this.newGame();
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