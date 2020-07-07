import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/Dialogsitem";
import Message from "./Message/Message";
import {AddMessageFormRedux} from './AddMessageForm'



const Dialogs = (props) => {
    let state = props.messagesPage;

    let addNewMessage = (values) => {
        props.addMessages(values.newMessageText);

    }

    let dialogsElements =
        state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);


    let messagesElements =
        state.messages.map(m => <Message msg={m.message} key={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}


            <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;