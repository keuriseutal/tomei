import {
    GET_USER_ACCOUNTS,
    GET_USER_ACCOUNT,
    ADD_USER_ACCOUNT,
    UPDATE_USER_ACCOUNT,
    DELETE_USER_ACCOUNT,
    ADD_USER_ACCOUNT_AVATAR,
    USER_ACCOUNT_ERROR,
    USER_ACCOUNT_LOADING
} from './types';

const serverURL = "http://localhost:5000";

export const getUserAccounts = () => async (dispatch) => {
    try {
        const response = await fetch(`${serverURL}/api/user`);
        const data = await response.json();
        dispatch({
            type: GET_USER_ACCOUNTS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: USER_ACCOUNT_ERROR,
            payload: error.response
        });
    }    
};

export const getUserAccount = (id) => async (dispatch) => {
    try {
        const response = await fetch(`${serverURL}/api/user/${id}`);
        const data = await response.json();
        dispatch({
            type: GET_USER_ACCOUNT,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: USER_ACCOUNT_ERROR,
            payload: error.response
        });
    }    
};

export const addUserAccount = (userAccount) => async (dispatch) => {
    try {
        const response = await fetch(`${serverURL}/api/user`, {
            method: 'POST',
            body: JSON.stringify({...userAccount, avatar: userAccount.avatar.get("avatar").name}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        dispatch({
            type: ADD_USER_ACCOUNT,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: USER_ACCOUNT_ERROR,
            payload: error.response
        });
    }    
};

export const deleteUserAccount = (id) => async (dispatch) => {
    try {
        await fetch(`${serverURL}/api/user/${id}`, {
            method: 'DELETE'
        });
        dispatch({
            type: DELETE_USER_ACCOUNT,
            payload: id
        });
    } catch(error) {
        dispatch({
            type: DELETE_USER_ACCOUNT,
            payload: error.response
        });
    }    
};

export const updateUserAccount = (userAccount) => async (dispatch) => {
    try {
        const response = await fetch(`${serverURL}/api/user/${userAccount.id}`, {
            method: 'PUT',
            body: JSON.stringify(userAccount),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        dispatch({
            type: UPDATE_USER_ACCOUNT,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: USER_ACCOUNT_ERROR,
            payload: error.response
        });
    }    
};

export const uploadAvatar = (avatar) => async (dispatch) => {
    try {
        const response = await fetch(`${serverURL}/api/user/upload/avatar`, {
            method: 'POST',
            body: avatar
        });
        const data = await response.json();
        dispatch({
            type: ADD_USER_ACCOUNT_AVATAR
        });
    } catch(error) {
        dispatch({
            type: USER_ACCOUNT_ERROR,
            payload: error.response
        });
    }    
};

// set loading to true
export const setLoading = () => {
    return {
        type: USER_ACCOUNT_LOADING
    }
};