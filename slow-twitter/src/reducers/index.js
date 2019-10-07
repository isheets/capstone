import { combineReducers } from 'redux'
import user from './user'
import game from './game'
import lightbox from './lightbox'

export default combineReducers({
  user,
  game,
  lightbox
})