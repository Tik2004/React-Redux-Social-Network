import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, createFfield} from "../common/Formscontrols/Formscontrol";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authreducer";
import {Redirect} from "react-router-dom";
import s from './../common/Formscontrols/Formscontrol.module.css'

const Loginform = ({handleSubmit, error,captchaurl}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createFfield(requiredField, 'email', Input, 'Email')}
                {createFfield(requiredField, 'password', Input, 'Password', 'password')}
                {createFfield(null, 'rememberMe', Input, '', 'checkbox', 'remember me')}
            {captchaurl && <img src={captchaurl} />}
            {captchaurl && createFfield([requiredField],'captcha',Input,'input symbols from image')}

                {error && <div className={s.formsomeerror}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const ReduxLoginform = reduxForm({
    form: 'login'
})(Loginform)

const Login = (props) => {
    const Submit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe,formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h1>Login</h1>
        <h3 className={s.registerplace}> Please register <a href = 'https://social-network.samuraijs.com/signUp'> there </a> and come back then.</h3>
        <ReduxLoginform captchaurl={props.captchaurl}  onSubmit={Submit}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaurl : state.auth.captchaurl
})
export default connect(mapStateToProps, {login})(Login);