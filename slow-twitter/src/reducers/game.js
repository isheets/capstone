const intialGame = {
  lastTweetFetched: null,
  parsedTweets: null,
  curTweetId: 0,
  curGame: null
};

const game = (state = intialGame, action) => {
  switch (action.type) {
    case "SET_CURRENT_GAME":
      return {
        ...state,
        curGame: action.curGame
      };
    case "SET_CURRENT_TWEET_ID":
      return {
        ...state,
        curTweetId: action.curTweetId
      };
    case "SET_LAST_TWEET_FETCHED":
      return {
        ...state,
        lastTweetFetched: action.lastFetched
      };
    case "SET_PARSED_TWEETS":
      return {
        ...state,
        parsedTweets: action.parsedTweets
      };
    default:
      return state;
  }
};

export default game;
