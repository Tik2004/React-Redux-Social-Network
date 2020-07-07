import React from 'react';
import op from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return (
        <header className={op.Header}>
            <img
                src='http://www.pngmart.com/files/10/Apple-Logo-PNG-Clipart.png'/>
            <div className={op.loginBlock}>
                {props.isAuth === true ? <div>{props.login} - <button onClick={props.logout }>Log out</button></div>
                    : <NavLink to={'/login'}>
                    <button>Login</button>
                </NavLink>}

            </div>
        </header>

    );
}
export default Header;