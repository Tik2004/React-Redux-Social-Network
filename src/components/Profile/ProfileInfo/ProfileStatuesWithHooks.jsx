import React, {useEffect, useState} from "react";

export const ProfileStatuswithhooks = (props) =>{

        let [editMode, setEditMode] = useState(false);

        let [status, setStatus] = useState(props.status);

        useEffect( ( ) => {
            setStatus(props.status)
        } , [ props.status]);

        const activateeditMode = () => {
            setEditMode(true);
        };

        const Onstatuschange = (e) => {
            setStatus(e.currentTarget.value)
        };

        const deactivateEditmode = () => {
            setEditMode(false);
            props.updateStatus(status);
        };

        return (
            <div>
                { !editMode &&
                <div>
                     <span onDoubleClick={activateeditMode}>
                         {props.status  ||  'No status' }
                     </span>
                </div>
                }
                {editMode &&
                    <div>
                        <input onChange={Onstatuschange} onBlur={deactivateEditmode} autoFocus={true} value={status}/>
                    </div>
                }



            </div>
        );
}