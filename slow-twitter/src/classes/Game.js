export default class Game {
    constructor(type, newTweet) {
        this.gameType = type;
        this.curTweet = newTweet;
        this.done = false;
        this.correct = false;

    }

    setCurTweet(tweet) {
        this.curTweet = tweet;
    }


}