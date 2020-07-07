import React from "react";
import s from './Formscontrol.module.css'
import {Field} from "redux-form";

const Element = Element => ({input,meta: {touched, error}, ...props }) => {
    const hasError=  touched && error;
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : " ")}>
            <Element {...input} {...props} />
            { hasError && <span>{error}</span>}
        </div>
    )
}
export const  createFfield = (validators,name,component,placeholder,type,text) => (
       <div>
           <Field validate={validators}
               name={name}
               component={component}
               placeholder={placeholder}
                type = {type}/>{text}
       </div>
)
export const Textarea = Element('textarea')

export const Input = Element('input')