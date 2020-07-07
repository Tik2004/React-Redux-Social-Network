import React from 'react';
import xo from './Post.module.css';
import profilepicture from "../../../../assets/images/profilepicture.png";

const Post = (props) => {
    return (
        <div className={xo.item}>
            <img className={xo.nopa} src ={profilepicture}/>
            {props.message}
            <div>
                <span className={xo.shittybitchlike}>{props.likes} <img src='https://image.flaticon.com/icons/svg/148/148836.svg'/> </span>
            </div>

        </div>

    );
}
export default Post;