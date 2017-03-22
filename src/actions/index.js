
import axios from 'axios';
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

const requestForRegistration = (data) =>
    dispatch =>{
        dispatch(reqRegistration())
        axios.post('/auth/signup',data)
             .then(response => response.status === 200 ? dispatch(successRegistration()) : dispatch(failureRegistration()))
    }

const successRegistration = () => ({
    type : 'SUCCESS_REGISTRATION'
});
const reqRegistration = () => ({
    type : 'REQUEST_REGISTRATION'
});
const failureRegistration = () => ({
    type : 'FAILURE_REGISTRATION'
})
