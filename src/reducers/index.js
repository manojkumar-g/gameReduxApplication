import {combineReducers} from 'redux';
import intersectionBy from 'lodash/intersectionBy';
import gameData from './gameData';
import userData from './userAuth';


export default combineReducers({gameData,userData});
