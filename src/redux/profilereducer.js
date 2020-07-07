import {ProfileApi, UsersApi} from "../api/api";
import {stopSubmit} from "redux-form";
const SET_PHOTO = 'profile/SET_PHOTO';
const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
let initialState = {
    posts: [],
    newPostText: '',
    profile:null,
    status:''
}

const profilereducer = (state = initialState,action) => {
    switch(action.type) {
        case SET_USER_PROFILE: {
            return{...state, profile:action.profile}
        }
        case ADD_POST: {
            let text = action.newPostText
            return {
                ...state,
                posts : [...state.posts, {id: 5, post: text , likes: 0}]
            };
        }
        case DELETE_POST: {
            return{...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case SET_STATUS: {
            return {
                ...state,
                status : action.status
            };
        }
        case SET_PHOTO: {
            return {
                ...state,profile :
            {...state.profile, photos : action.photos}
            }
        }

        default:
            return state;
    }
}
export const setUserProfile = (profile) => {

    return {
        type:SET_USER_PROFILE,
        profile:profile
    }
}
export const deletepost = (postId) => {

    return {
        type:DELETE_POST,
        postId:postId
    }
}
export const addPost = (newPostText) => {

    return {
        type: ADD_POST,newPostText
    }
}
export const savephotosucces = (photos) => ({type:SET_PHOTO, photos})
export const getUserProfile = (userId) =>async (dispatch) =>{
    let response = await UsersApi.getProfile(userId)
    return(
        dispatch(setUserProfile(response))
        )
}
export const getStatus = (userId) =>async (dispatch) =>{
    let response = await ProfileApi.getStatus(userId)
    return    dispatch(setStatus(response.data))

}
export const updateStatus = (status) =>async (dispatch) =>{
     let response = await ProfileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
        return   dispatch(setStatus(status))
        }

}
export const savePhoto = (file) =>async (dispatch) =>{
     let response = await ProfileApi.savePhoto(file)
        if (response.data.resultCode === 0) {
        return   dispatch(savephotosucces(response.data.data.photos))
        }

}
export const saveProfile = (profile) =>async (dispatch, getState) =>{
    const userId = getState().auth.id
    const response = await ProfileApi.saveProfile(profile)
        if (response.data.resultCode === 0) {
        return   dispatch(getUserProfile(userId))
        }
        else{
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Error occured, please try later';
            dispatch(stopSubmit("editProfile", {"_error":response.data.messages[0]}));
            return Promise.reject(response.data.messages[0])
        };
}

export const setStatus = (status) => {

    return {
        type:SET_STATUS,
        status:status
    }
}


export default profilereducer;