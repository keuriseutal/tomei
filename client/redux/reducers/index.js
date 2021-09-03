import { combineReducers } from 'redux';
import userAccountReducer from './userAccountReducer';

export default combineReducers({
    user: userAccountReducer
});