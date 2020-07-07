import {Auth} from "../api/api";
import {stopSubmit} from "redux-form";
import {Redirect} from "react-router-dom";
import React from "react";
const GET_CAPTCHA_URL = 'auth/get-captcha-url';
const SET_USER_DATA = 'auth/SET_USER_DATA';

let initialState = {
    "email": null,
    "id": null,
    "login": null,
    "isAuth":false,
    'captchaurl': null
}

const authreducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
export const getcaptchaurlsuccess = (captchaurl) => ({'type': GET_CAPTCHA_URL,payload: {captchaurl}})
export const setauthUserData = (id,login,email,isAuth) => ({"type":SET_USER_DATA, "payload": {id,login,email,isAuth}})
export const getAuthuserdata = () => async (dispatch) => {
    let response = await Auth.me()
            if (response.data.resultCode === 0) {
                let {login,email,id} = response.data.data
                dispatch(setauthUserData(id,login,email,true));
            };
}
export const login = (email,password,rememberMe=false, captcha) => async (dispatch) => {
    let response = await Auth.lohin(email,password,rememberMe,captcha)

            if (response.data.resultCode === 0) {
                dispatch(getAuthuserdata())
            }
            else{
                if(response.data.resultCode ===10){
                    dispatch(getcaptchaurl())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Error occured, please try later';
                dispatch(stopSubmit("login", {"_error":message}));
            };
};
export const getcaptchaurl = () => async (dispatch) => {
    let response = await Auth.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getcaptchaurlsuccess(captchaUrl));
};

export const logout = () => async (dispatch) => {
    let response = await Auth.lohout()

            if (response.data.resultCode === 0) {
                dispatch(setauthUserData(null,null,null,false));

            };
};
export default authreducer;