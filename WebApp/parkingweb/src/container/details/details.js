import React, { Component } from 'react';
import {compose} from 'redux';
import {withRouter} from "react-router-dom"
import { connect } from 'react-redux';
import "./details.scss"


class DetailsPage extends Component {
  
    render() {
        const {username,email,phone,name,surName}=this.props;
        return (
         
            <div className="DetailsPage">
               <div className="Central">
                    <h2>Login: {username}</h2>
                    <h2>Imie: {name}</h2>
                    <h2>Nazwisko: {surName}</h2>
                    <h2>Phone: {phone}</h2>
                    <h2>Email: {email}</h2>
               </div>
                
            </div>
            
        );
    }
}

export default compose(
    connect(state=>({
        email:state.user.UserData.email,
        phone:state.user.UserData.phone,
        name:state.user.UserData.name,
        surName:state.user.UserData.surName,
        username:state.user.UserData.username
    })),
    withRouter
)(DetailsPage);
