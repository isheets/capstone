const intialGame = {
  lastTweetFetched: null,
  parsedTweets: null,
  curTweet: null,
  curTweetId: 0,
  curGame: null,
  extractedWords: null,
  wordOptions: [],
  numWordsDropped: 0,
  droppedWords: [],
  currentGame: null
};

const game = (state = intialGame, action) => {
  switch (action.type) {
    case "SET_CURRENT_GAME":
      return {
        ...state,
        curGame: action.curGame
      };
    case "SET_CURRENT_TWEET":
      return {
        ...state,
        curTweet: action.curTweet
      };
    case "SET_CURRENT_TWEET_ID":
      console.log(state);
      return {
        ...state,
        curTweet: state.parsedTweets[action.curTweetId],
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
    case "SET_EXTRACTED_WORDS":
      return {
        ...state,
        extractedWords: action.extractedWords
      };
    case "SET_WORD_OPTIONS":
      return {
        ...state,
        wordOptions: action.wordOptions
      };
    case "ADD_DROPPED_WORD":
      return {
        ...state,
        droppedWords: [...state.droppedWords, action.droppedWord]
      };
    case "UPDATE_DROPPED_WORD":
      return {
        ...state,
        droppedWords: state.droppedWords.map(word =>
          word.droppedIn === action.droppedWord.droppedIn
            ? // update the word with the matching dropped in
              action.droppedWord
            : // otherwise return original word object
              word
        )
      };
    case "MOVE_DROPPED_WORD":
      return {
        ...state,
        droppedWords: state.droppedWords.map(word =>
          word.word === action.droppedWord.word
            ? // update the word with the matching dropped in
              action.droppedWord
            : // otherwise return original word object
              word
        )
      };
      case "CLEAR_DROPPED_WORDS":
      return {
        ...state,
        droppedWords: []
      };
    default:
      return state;
  }
};

export default game;
