import s from "./ProfileInfo.module.css";
import React from "react";
import {ProfileStatuswithhooks} from "./ProfileStatuesWithHooks";
import {createFfield, Input, Textarea} from "../../common/Formscontrols/Formscontrol";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit,status,profile,updateStatus,error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>
        {error && <span className={s.formsomeerror}>
            {error} </span> }
        <div className={s.nameprofil}>{createFfield([],'fullName',Input,'Username')}</div>
        <div className={s.opisanie}>
        <ProfileStatuswithhooks status={status} updateStatus={updateStatus} />
        </div>
        <div><b>Looking for a job</b>
            {createFfield([],'lookingForAJob', Input, "","checkbox",'')}
        </div>
        {profile.lookingForAJobDescription}
        {createFfield([],'lookingForAJobDescription',Textarea,'What job are you looking for?','','')}
        <div>
            <b>
                About me :
            </b>
            {createFfield([],'aboutMe', Textarea, "Write something about you","",'')}
        </div>
        <b>
            Contacts
        </b>
        <div className={s.contacts}>
            {Object.keys(profile.contacts).map(key => {
                return  <div> <b> {createFfield([],`contacts.${key}`,Input,key,'','')}</b> </div>
                }
            )
            }
        </div>
    </form>
}
const ReduxDataform = reduxForm({form: 'editProfile'})(ProfileDataForm);
export default  ReduxDataform