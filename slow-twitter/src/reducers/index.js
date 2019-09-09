import { combineReducers } from 'redux'
import tweets from './tweets'
import user from './user'
import game from './game'

export default combineReducers({
  tweets,
  user,
  game
})