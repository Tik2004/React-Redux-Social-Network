import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({users, onPageChanged,followingInProgress,pageSize,totalCount , currentPage,follow,unfollow}) => {
    return (
        <div>
        <Paginator onPageChanged = {onPageChanged} pageSize={pageSize} totalCount={totalCount}
                   currentPage={currentPage}/>
            {
                users.map(u => <User followingInProgress={followingInProgress}
                                           follow={follow}
                                           unfollow={unfollow}
                                           user={u}
                key={u.id}
                />
                )
            }
        </div>
    )
}
export default Users;