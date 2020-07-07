const ADD_MES = 'dialogs/ADD-MESSAGE';

let initialState = {
    dialogs: [{id: 1, name: 'Artur'},
        {id: 2, name: 'Arman'},
        {id: 3, name: 'Vardan'},
        {id: 4, name: 'Zara'},
        {id: 5, name: 'Masha'}],
    messages: [],
};

const dialogsreducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MES: {
            let text = action.newMessageText
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: 6, message: text}]
            };

        }


        default:
            return state;

    }
}
export const addMessages = (newMessageText) => {

    return {
        type: ADD_MES, newMessageText
    }
}
export default dialogsreducer;

