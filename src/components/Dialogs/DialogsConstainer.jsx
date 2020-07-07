import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessages} from "../../redux/dialogsreducer";
import {withAuthRedirect} from "../../hoc/withauthredirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
        newMessageText : state.messagesPage.newMessageText,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMessages: (newMessageText) => {
            dispatch(addMessages(newMessageText))
        },
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs);