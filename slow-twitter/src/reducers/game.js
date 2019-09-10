const intialGame = {
    lastTweetFetched: null,
    parsedTweets: null,
    curTweet: null,
    curTweetId: null,
    curGame: null
}

const game = (state = intialGame, action) => {
    switch (action.type) {
        case 'SET_CURRENT_TWEET':
            return {
                ...state,
                curTweet: action.curTweet
            }
        case 'SET_CURRENT_TWEET_ID':
            console.log(state);
            return {
                ...state,
                curTweet: state.parsedTweets[action.curTweetId],
                curTweetId: action.curTweetId
            }
        case 'SET_LAST_TWEET_FETCHED':
            return {
                ...state,
                lastTweetFetched: action.lastTweetFetched
            }
        case 'SET_PARSED_TWEETS':
            return {
                ...state,
                parsedTweets: action.parsedTweets
            }
        default:
            return state;
    }
}

export default game