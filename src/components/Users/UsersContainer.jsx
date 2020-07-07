import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    unfollow,
    setcurpage,
    toggleisfollowing,
    getUsers
} from '../../redux/usersreducer';
import Users from './Users';
import Preloader from "../common/preloader/preloader.js";
import {
    getCurrentPageselect, getfollowingInProgressselect, getisFetchingselect,
    getPageSizeselect,
    gettotalCountselect,
    getUsersseleect
} from "../../redux/usersselectors";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pagenuM) => {
        this.props.setcurpage(pagenuM)
        this.props.getUsers(pagenuM, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalCount={this.props.totalCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   toggleisfollowing={this.props.toggleisfollowing}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}
let mapStateToProps = (state) => {
    return {
        users: getUsersseleect(state),
        pageSize: getPageSizeselect(state),
        totalCount: gettotalCountselect(state),
        currentPage: getCurrentPageselect(state),
        isFetching: getisFetchingselect(state),
        followingInProgress:getfollowingInProgressselect(state),

    }

};

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setcurpage,
    toggleisfollowing,
    getUsers
})(UsersContainer);