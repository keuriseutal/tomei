// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// const initialState = {};
// const middleWare = [thunk];
// export const store = createStore(
//     rootReducer, 
//     initialState, 
//     composeWithDevTools(applyMiddleware(...middleWare))
// );

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(rootReducer, composedEnhancer)

export default store;
