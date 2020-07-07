import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profilereducer from "./profilereducer";
import dialogsreducer from "./dialogsreducer";
import sidebarreducer from "./sidebarreducer";
import usersreducer from "./usersreducer";
import authreducer from "./authreducer";
import thunkMiddleware  from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appreducer from "./appreducer";


let reducers = combineReducers({
    profilePage: profilereducer,
    messagesPage: dialogsreducer,
    sidebar: sidebarreducer,
    userspage : usersreducer,
    auth : authreducer,
    form : formReducer,
    app : appreducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));


export default store;