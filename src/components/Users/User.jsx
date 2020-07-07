import React from "react";
import s from "./users.module.css";
import profilepicture from "../../assets/images/profilepicture.png";
import {NavLink} from "react-router-dom";

const User = ({user, follow,unfollow, followingInProgress} ) => {
    return (
        <div className={s.obshi}>
                  <span>
                      <div>
                          <NavLink to={'/profile/' + user.id}>
                          <img src={user.photos.large != null ? user.photos.large : profilepicture} className={s.imageofman}/>
                            </NavLink>
                      </div>
                      <div>
                          {user.followed
                              ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                  unfollow(user.id)
                              }} className={s.unfollow}>following</button>
                              : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                  follow(user.id)
                              }} className={s.follow}>follow</button>
                          }

                      </div>
                  </span>
            <span>
                      <span>
                          <div>{user.name}</div><div>{user.status}</div>
                      </span>

                  </span>
        </div>
    )

}
export default User;