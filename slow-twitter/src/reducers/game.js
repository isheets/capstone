const intialGame = {
  lastTweetFetched: null,
  parsedTweets: null,
  curGame: null,
  parsedFriends: null,
  lastTweetFetchDate: null
};

const game = (state = intialGame, action) => {
  switch (action.type) {
    case "INIT_GAME":
      console.log(action);
      return {
        ...state,
        curGame: action.curGame,
        parsedFriends: action.parsedFriends,
        parsedTweets: action.parsedTweets,
        lastTweetFetchDate: action.lastTweetFetchDate,
        lastTweetFetched: action.lastTweetFetched
      }
    case "SET_CURRENT_GAME":
      return {
        ...state,
        curGame: action.curGame
      };
    case "SET_LAST_TWEET_FETCHED":
      return {
        ...state,
        lastTweetFetched: action.lastFetched
      };
    case "SET_PARSED_TWEETS":
      return {
        ...state,
        parsedTweets: action.parsedTweets,
        lastTweetFetchDate: action.lastTweetFetchDate,
        lastTweetFetched: action.lastTweetFetched
      };
    case "SET_PARSED_FRIENDS":
      return {
        ...state,
        parsedFriends: action.parsedFriends
      };
    default:
      return state;
  }
};

export default game;