import React from 'react';
import s from './Profile.module.css';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContanier from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div className={s.Seaworthiest}>
            <ProfileInfo savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         saveProfile={props.saveProfile}/>
            <MyPostsContanier profile={props.profile}/>
        </div>
    );
}
export default Profile;