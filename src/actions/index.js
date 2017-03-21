import fetch from 'isomorphic-fetch';

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
    return fetch('http://localhost:1234/getGames')
            .then(response => response.json())
            .then(data =>{
                  dispatch(setGameData(data))
                }
              )
            .catch(
              err =>
                dispatch(setError('Error While Fetching'))
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
