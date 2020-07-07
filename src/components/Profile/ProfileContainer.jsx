import React from 'react';
import Profile from "./Profile";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profilereducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    refreshprofile () {
        let userId=this.props.match.params.userId;
        if (!userId) {
            userId = this.props.loguserId
            if (!userId){
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount(){
        this.refreshprofile()
        }
    componentDidUpdate(prevProps,prevState,snapshot) {
       if (this.props.match.params.userId !== prevProps.match.params.userId){this.refreshprofile()}
        }


    render() {
        return (
            <Profile {...this.props}
                     isOwner ={!this.props.match.params.userId}
                     profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveprofile={this.props.saveProfile}/>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    loguserId: state.auth.id,
    isAuth: state.auth.isAuth
  });

export default compose(
    connect(mapStateToProps,{getUserProfile, getStatus, updateStatus,savePhoto,saveProfile}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)
;