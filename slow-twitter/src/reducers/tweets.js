const initialTweets =  {
    lastTweetFetched: null,
    parsedTweets: null
}

const tweets = (state = initialTweets, action) => {
    switch(action.type) {
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
            return state
    }
}

export default tweets