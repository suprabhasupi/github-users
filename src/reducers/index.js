import { combineReducers } from 'redux'
import homepageReducer from './home'

// All reducer will come here
export default combineReducers({
  homePageInfo: homepageReducer
})