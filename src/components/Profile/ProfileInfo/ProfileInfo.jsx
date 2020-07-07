import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/preloader";
import {ProfileStatuswithhooks} from "./ProfileStatuesWithHooks";
import profilepicture from "../../../assets/images/profilepicture.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo =(props) =>{
    let [editMode, setEditMode] = useState(false);
    if(!props.profile) {
        return <Preloader />
    }


    const mainPhotoselected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }


    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            ()=> {
            setEditMode(false);
            }
        );
    }
    return(
        <div>
            <div className={s.description_block}>
                <img src={props.profile.photos.large !=null ? props.profile.photos.large: profilepicture}/> {props.isOwner &&
            <label className={s.inuts} >
                <input  onChange={mainPhotoselected} type={"file"} placeholder={'New photo'}/>
                Upload profile photo
            </label>}

                {editMode ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} updateStatus={props.updateStatus} status={props.status} profile={props.profile}/> :
                    <ProfileData profile={props.profile}
                                 status={props.status}
                                 isOwner={props.isOwner}
                                 activateedit={ () => {setEditMode(true)}}
                                 updateStatus={props.updateStatus}
                    /> }
            </div>
        </div>
    );
}

const ProfileData = ({status,profile,isOwner,activateedit,updateStatus}) => {
    return <div>
        {isOwner && <div><button onClick={activateedit}>Edit</button></div>}
        <div className={s.nameprofil}>{profile.fullName}</div>
        <div className={s.opisanie}>
            <ProfileStatuswithhooks status={status} updateStatus={updateStatus} />
        </div>
        <div><b>Looking for a job :
        </b>
            {profile.lookingForAJob ? ' Yes' : 'No'}
        </div>
        {profile.lookingForAJob && profile.lookingForAJobDescription }
        <div>
            <b>
                About me :
            </b>
            {profile.aboutMe ? profile.aboutMe  : 'human' }
        </div>
        <b>
            Contacts
        </b>
        <div className={s.contacts}>
        {Object.keys(profile.contacts).map(key => {
            return <ContactsShoWer Contactkey={key}
                                   Contactvalue={profile.contacts[key]} />
                    }
                )
            }
        </div>
    </div>
}

export const ContactsShoWer = ({Contactkey,Contactvalue}) => {
    return <div><b>{Contactkey} :</b> {Contactvalue}</div>
}
export default ProfileInfo;