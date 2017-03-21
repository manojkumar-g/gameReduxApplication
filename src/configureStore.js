import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reducer from './reducers';

// here we are configuring the redux store using reducers and we are applying middlewares like thunk for async actions and loggerMiddleware
//debugging
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware()
  )
);



export default store;
