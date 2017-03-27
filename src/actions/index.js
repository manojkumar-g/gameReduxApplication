
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken.js';
let count = 0;
export const addSingleFilter = (filterName) => ({
  type :'ADD_SINGLE_FILTER',
  filterName
});
export const removeSingleFilter = (filterName) => ({
  type :'REMOVE_SINGLE_FILTER',
  filterName
});
export const addAllFilters = (filters) => ({
  type :'ADD_ALL_FILTERS',
  filters
});
export  const clearAllFilters = () => ({
  type : 'CLEAR_ALL_FILTERS'
});
export  const filterName = (name) => ({
  type : 'FILTER_BY_NAME',
  name
});
export const filterByName = (name) =>
  dispatch => {
    dispatch(clearAllFilters());
    dispatch(filterName(name))
  }
export const getGames = () =>
  dispatch => {
    dispatch(loadingGameData());
    axios.get('http://localhost:1234/getGames')
        .then(response => {
            dispatch(setGameData(response.data))
        })
        .catch(
            err =>
                dispatch(setError('Error while Fetching Data'))
        )

  }

const setGameData = (data) =>({
  type : 'SET_GAME_DATA',
  data
});
const loadingGameData = () => ({
  type : 'LOADING_GAME_DATA'
});
const setError = (error) => ({
  type : 'SET_ERROR',
  error
});

export const requestForRegistration = (data) =>
    dispatch =>{
        dispatch(reqRegistration())
        return axios.post('http://localhost:1234/signup',data)
             .then(response => {
               response.status === 200 ? dispatch(successRegistration()) : dispatch(failureRegistration())
             })
             .catch(
               ({response:{data}}) => {
                 dispatch(failureRegistration(data.message))
               }
             )
    }

const successRegistration = () => ({
    type : 'SUCCESS_REGISTRATION'
});
const reqRegistration = () => ({
    type : 'REQUEST_REGISTRATION'
});
const failureRegistration = (message) => ({
    type : 'FAILURE_REGISTRATION',
    key : count++,
    message
});
export const requestForLogin = (data) =>
    dispatch =>{
        dispatch(reqLogin())
        return axios.post('http://localhost:1234/login',data)
             .then(response => {
               let token = response.data.token;
               sessionStorage.setItem('accessToken',token);
               setAuthorizationToken(token);
               response.status === 200 ? dispatch(successLogin(response.data.userData.name)) : dispatch(failureLogin(response.data.message))
             })
             .catch(
               ({response:{data}}) => {
                 dispatch(failureLogin(data.message))
               }
             )
    }

const successLogin = (message) => ({
    type : 'SUCCESS_LOGIN',
    message
});
const reqLogin = () => ({
    type : 'REQUEST_LOGIN'
});
const failureLogin = (message) => ({
    type : 'FAILURE_LOGIN',
    key : count++,
    message
});
const reqLogOut = () => ({
    type : 'REQUEST_LOGOUT'
});
