import {maxLengthcreator, minLengthcreator, requiredField} from "../../../utils/validators/validators";
import s from "./MyPosts.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/Formscontrols/Formscontrol";
import React from "react";

const maxLength100 = maxLengthcreator(100);
const minLength2 = minLengthcreator(2);
const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.textingar}>
                <Field validate={[requiredField,maxLength100,minLength2]} component={Textarea}
                       name={'newPostText'} placeholder={'Enter your thoughts...'}/>
            </div>
            <div className={s.baton}>
                <button>New Post</button>
            </div>
        </form>
    )
}

export const AddPostFormRedux = reduxForm({form:'postAddPostForm'})(AddPostForm)