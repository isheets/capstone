//action creator for updating the value of store.user.isAuthenticated
//expects isAuthenticated to be boolean
export const updateAuthentication = isAuthenticated => ({
  type: 'SET_AUTHENTICATION',
  isAuthenticated
})

//action creator for updating the user object in store.user.userDetails
//user expected to be object
export const updateUser = user => ({
  type: 'SET_USER',
  user
})

//action creator for updating the token string in store.user.userToken
//expects token to be a string
export const updateToken = token => ({
  type: 'SET_TOKEN',
  token
})

//action creator for setting the value of store.tweets.lastTweetFetched for timeline fetching management
//expects lastFetched to be a string (id of tweet)
export const updateLastTweetFetched = lastFetched => ({
  type: 'SET_LAST_TWEET_FETCHED',
  lastFetched
})

//updates array of objects for store.tweets.parsedTweets
//expects array of objects
export const updateParsedTweets = parsedTweets => ({
  type: 'SET_PARSED_TWEETS',
  parsedTweets
})

export const updateCurTweetId = curTweetId => ({
  type: 'SET_CURRENT_TWEET',
  curTweetId
})