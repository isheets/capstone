import store from './../index';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameController from './GameController';

/*
TODO
remove links until author is guessed

*/


export default class GuessAuthor {
    constructor(newTweet) {

        console.log("constructing GuessAuthor");
        this.curTweet = newTweet;
        this.type = 'GuessAuthor';

        this.friendOptions = [];
        this.lives = 3;

        this.parent = new GameController();
    }

    getLives() {
        return this.lives;
    }

    newGame() {
        //invoke method from GameController
        this.parent.newGame();
    }

    //return 5 random friends
    getRandomFriends(friendList) {
        if (store !== undefined) {
            let state = store.getState();

            let friends;
            if(friendList !== undefined) {
                friends = friendList;
            }
            else {
                friends = state.game.parsedFriends;
            }
            console.log(friendList);
            console.log(friends);

            let correctAuthor = this.curTweet.user;

            correctAuthor.correct = true;

            let friendOptions = [];

            friendOptions.push(correctAuthor);

            for (let i = 0; i < 5; i++) {
                let randIdx = getRandomUniqueIndex(friends.length - 1);
                let randFriend = friends[randIdx];
                while(randFriend.handle === correctAuthor.handle) {
                    randIdx = getRandomUniqueIndex(friends.length - 1);
                    randFriend = friends[randIdx];
                }
                randFriend.correct = false;
                friendOptions.push(randFriend);
            }

            this.friendOptions = friendOptions;
            this.parent.updateGame(this);
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
			this.parent.updateGame(this);
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
        newInstance.parent = new GameController();
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