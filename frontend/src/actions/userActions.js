import axios from 'axios'

import {    
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/UserConstants'

export const login = (email,password) => async (dispatch) => {
    try{
        dispatch({ type: USER_LOGIN_REQUEST })
        
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/login/',
            {'username':email,'password':password},
            config)

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
    }catch(error){

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.message.data.detail
            : error.message,
        })

    }
}

export const UserLogout = () => async (dispatch) => {
    try{
        dispatch({ type: USER_LOGIN_REQUEST })

        const {data} = await axios.get('/api/user/login')

        dispatch({
            type:USER_LOGOUT,
            payload: data,
        })
    }catch(error){

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.message.data.detail
            : error.message,
        })

    }
}