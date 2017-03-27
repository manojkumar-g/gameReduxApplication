import concat from 'lodash/concat'
import remove from 'lodash/remove'
const gameData = (
            state ={
              data : [],
              isLoadingFromDB : false,
              errors :[],
              filters: {},
              visibleGames : [],
              allFilters : []
            },action
          ) => {
switch (action.type) {
  case 'ADD_ALL_FILTERS':
    let filters = action.filters
    let {data} = state
    let filteredData = []
    var allFilters = []
    let isFiltered = false
    if(filters.flatforms.length > 0){
      isFiltered = true
      for(let filter in filters.flatforms){
        allFilters.push(filters.flatforms[filter])
        filteredData = concat(
          filteredData,
          data.filter( ({platform}) => platform.split(',').indexOf(filters.flatforms[filter]) >= 0)
        )
      }
    }
    if(filters.genres.length > 0){
      isFiltered = true
      let filteredGenresData = []
      let sourceFilter = filteredData.length > 0 ? filteredData : data
      for(let filter in filters.genres){
        allFilters.push(filters.genres[filter])
        filteredGenresData = concat(
          filteredGenresData,
          sourceFilter.filter( ({genre}) => genre.split(',').indexOf(filters.genres[filter]) >= 0)
        )
      }
      filteredData = filteredGenresData
    }
    if(filters.score !=='NA'){
      isFiltered = true
      let filteredScoreData = []
      let sourceFilter = filteredData.length > 0 ? filteredData : data
      let parsedScore = parseFloat(parseInt(filters.score)/10)
      filteredData = sourceFilter.filter(({score}) => parseFloat(score) === parsedScore)
    }
    if(filters.Ec !=='NA'){
      isFiltered = true
      let filteredScoreData = []
      let sourceFilter = filteredData.length > 0 ? filteredData : data
      filteredData = sourceFilter.filter(({editors_choice}) => filters.Ec === 'true' ? editors_choice : !editors_choice)
    }
    return {
      ...state,
      filters :action.filters,
      visibleGames : isFiltered ?filteredData : state.data,
      allFilters
    }
    break
  case 'CLEAR_ALL_FILTERS':
    return {
      ...state,
      filter : {},
      visibleGames : state.data,
      allFilters :[]
    }
    break
  case 'FILTER_BY_NAME':
    let filteredByNameData = state.data.filter(
      ({title}) => title.toUpperCase().indexOf(action.name.toUpperCase()) >= 0
    )
    return {
      ...state,
      visibleGames : filteredByNameData
    }
    break
  case 'ADD_SINGLE_FILTER':
      return{
          ...state,
          allFilters : [
              ...state.allFilters,
              action.filterName
          ]
      }
      break
  case 'REMOVE_SINGLE_FILTER':
      return{
          ...state,
          allFilters : remove(state.allFilters,(name) => name !== action.filterName)
      }
  break
  case 'SET_GAME_DATA':
    return{
      ...state,
      isLoadingFromDB :false,
      data: action.data,
      visibleGames : action.data
    }
    break
  case 'LOADING_GAME_DATA':
    return{
      ...state,
      isLoadingFromDB : true,
    }
    break
  case 'SET_ERROR':
    return{
      ...state,
      errors:[
        ...state.errors,
        action.error
      ]
    }
    break
  default:
    return state
    }
}
export default gameData
