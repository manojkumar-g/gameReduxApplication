import { combineReducers } from 'redux'
import gameData from './gameData'
import userData from './userAuth'


export default combineReducers({ gameData, userData })
