import {Route } from "react-router-dom";
import MainPage from '../container/mainPage/mainPage';
import DetailsPage from "../container/details/details";
import CarsPage from "../container/cars/cars";
import MyNavBar from "../components/navBar/navBar";
import React, { Component } from 'react';
import {isNil} from "lodash";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";

class InnerRoute extends Component {

    componentDidMount(){
        const {userToken,history,userId} =this.props;
        if(isNil(userToken) || isNil(userId)){
            console.log("Weszlo!")
            history.push("/") 
        }
    }

    render() {
        return (
            <div className="Container">
                <MyNavBar />
                <Route path="/mainpage" component={(props) => <MainPage {...props} />} />
                <Route path="/cars"  component={(props) => <CarsPage {...props} />} />
                <Route path="/details" component={(props) => <DetailsPage {...props} />} />
            </div>
        );
    }
}

export default compose(
    connect(state=>({
        userId: state.user.UserData.id,
        userToken:state.user.UserData.token
    })),
    withRouter
)(InnerRoute);;
