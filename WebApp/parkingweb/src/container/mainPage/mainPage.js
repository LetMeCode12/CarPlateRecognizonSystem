import React, { Component } from 'react';
import {compose} from 'redux';
import {withRouter} from "react-router-dom"
import { connect } from 'react-redux';
import "./mainPage.scss"


class MainPage extends Component {
  
    render() {
        const {username}=this.props;
        return (
            
            <div className="MainPage">
               <div className="welcomePanel">
                    <h1>Witaj {username}!</h1>
               </div>
                
            </div>
        );
    }
}

export default compose(
    connect(state=>({
        username:state.user.UserData.username
    })),
    withRouter
)(MainPage);
