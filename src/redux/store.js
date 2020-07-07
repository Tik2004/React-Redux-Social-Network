import profilereducer from "./profilereducer";
import dialogsreducer from "./dialogsreducer";
import sidebarreducer from "./sidebarreducer";


let store = {
    _state: {
        messagesPage: {
            dialogs: [{id: 1, name: 'Artur'},
                {id: 2, name: 'Arman'},
                {id: 3, name: 'Vardan'},
                {id: 4, name: 'Zara'},
                {id: 5, name: 'Masha'}],
            messages: [],
            newMessageText: ''
        },
        profilePage: {
            posts: [],
            newPostText: '',
        },
        sidebar: {}
    },
    _CallSubscriber() {
        console.log('Stat changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._CallSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profilereducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsreducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarreducer(this._state.sidebar, action);
        this._CallSubscriber(this._state)
    }
}



window.store = store;
export default store;

