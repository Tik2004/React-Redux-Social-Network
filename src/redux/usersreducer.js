import {UsersApi} from "../api/api";
import {updateObjectInArray} from "../utils/objecthelpers";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SETUSERS ='users/SET_USERS';
const SET_CUR_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOT_COUNT = 'users/SET_TOTAL_COUNT';
const TOGGLE_ISFETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_ISFOLLOWING = 'users/TOGGLE_IS_FOLLOWING';

let initialState = {
    users: [],
    pageSize: 10,
    totalCount: 0,
    currentPage : 1,
    isFetching : true,
    followingInProgress: []
}

const usersreducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                    ...state,
                     users: updateObjectInArray( state.users,  action.userId, "id", {followed:true})
                }

        case UNFOLLOW:
            return {
                     ...state,
                     users: updateObjectInArray(state.users, action.userId, "id", {followed:false})
                }

        case SETUSERS:
            return {...state, users:[...action.users]}

        case SET_CUR_PAGE:
            return {...state, currentPage:action.currentPage}
        case SET_TOT_COUNT:
            return {...state, totalCount: action.totalcount}
        case TOGGLE_ISFETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_ISFOLLOWING:
            return {
                ...state,
                followingInProgress:action.isFetching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id!=action.userId)
            }
        default:
            return state;
    }
}


export const toggleisfetching = (isFetching) => ({type:TOGGLE_ISFETCHING, isFetching})
export const toggleisfollowing = (isFetching, userId) => ({type:TOGGLE_ISFOLLOWING, isFetching, userId})
export const setTotalUsersCount = (totalcount) => ({type:SET_TOT_COUNT, totalcount})
export const setcurpage = (currentPage) => ({type: SET_CUR_PAGE, currentPage})
export const acceptfollow = (userId) => ({type: FOLLOW, userId})
export const acceptunfollow = (userId) => ({type: UNFOLLOW ,userId})
export const setUsers = (users) => ({type: SETUSERS, users})

export const getUsers= (currentPage, pageSize) =>{
    return async (dispatch) =>  {
        dispatch(toggleisfetching(true));
        let response = await UsersApi.getUsers(currentPage, pageSize)
            dispatch(toggleisfetching(false));
            dispatch(setUsers(response.items));
            dispatch(setTotalUsersCount(Math.ceil(response.totalCount)))
        ;
    }
}

const followorunfollow = async (dispatch,userid, apishochka, acceptflwunflw) => {
        dispatch(toggleisfollowing(true, userid));
        let response = await apishochka(userid)
        if (response.resultCode === 0) {
            dispatch(acceptflwunflw(userid))
        }
        dispatch(toggleisfollowing(false, userid));
}

export const follow = (userid) => {
    return async  (dispatch)   => {
        await followorunfollow(dispatch, userid, UsersApi.Flw.bind(UsersApi), acceptfollow);
    }
}

export const unfollow = (userid) => {
    return async (dispatch) => {
        await followorunfollow(dispatch, userid, UsersApi.UnFlw.bind(UsersApi), acceptunfollow);
    }
}

export default usersreducer;