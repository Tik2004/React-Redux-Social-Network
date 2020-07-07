import React, {Component} from 'react';
import './App.css';
import error404 from './assets/images/error404.png';
import Nav from './components/Navbar/Nav';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appreducer";
import Preloader from "./components/common/preloader/preloader";
import store from "./redux/redux-store";
const LoginPage = React.lazy(() => import( "./components/login/login") );
const DialogsContainer = React.lazy(() =>import( "./components/Dialogs/DialogsConstainer"));
const UsersContainer = React.lazy(() =>import( "./components/Users/UsersContainer.jsx"));
const ProfileContainer = React.lazy(() =>import( "./components/Profile/ProfileContainer"));


class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <React.Suspense fallback={<Preloader />}  >
                <div className='app-wrapper-content'>
                    <Switch >
                        <Route exact path='/'
                               render={() => <Redirect to={"/profile"}
                               />}/>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer
                           />}/>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/login'
                           render={() => <LoginPage/>}/>
                     <Route path='*'
                            render={() => {return <div className='lols'><div><img src={error404}/></div><h2>Not found</h2></div>}}/>
                    </Switch>
                </div>
                </React.Suspense>
            </div>

        );
    }
}
const mapStateToProps = (state) => ({
    initialized : state.app.initialized
})
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps,{initializeApp}))(App)

let CoolApp = (props) => {
    return <BrowserRouter>
        <Provider store ={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default CoolApp