import {
    GET_USER_ACCOUNTS,
    GET_USER_ACCOUNT,
    ADD_USER_ACCOUNT,
    UPDATE_USER_ACCOUNT,
    DELETE_USER_ACCOUNT,
    USER_ACCOUNT_ERROR,
    USER_ACCOUNT_LOADING
} from '../actions/types';

const initialState = {
    userAccounts: [],
    userAccount: null,
    loading: false,
    error: null
};

const UserAccountReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USER_ACCOUNTS:
            return {
                ...state,
                userAccounts: action.payload,
                loading: false
            }
        case GET_USER_ACCOUNT:
            return {
                ...state,
                userAccount: action.payload,
                loading: false
            }
        case ADD_USER_ACCOUNT:
            return {
                ...state,
                userAccounts: [...state.userAccounts, action.payload],
                loading: false
            }
        case DELETE_USER_ACCOUNT:
            return {
                ...state,
                userAccounts: state.userAccounts.filter(u => u.id !== action.payload),
                loading: false
            }
        case UPDATE_USER_ACCOUNT: 
            return {
                ...state,
                userAccounts: state.userAccounts.map(u  => u.id === action.payload.id ? action.payload : u),
                loading: false
            }
        case USER_ACCOUNT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case USER_ACCOUNT_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
};

export default UserAccountReducer;