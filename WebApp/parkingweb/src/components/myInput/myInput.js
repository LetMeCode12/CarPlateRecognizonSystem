import React, { Component } from 'react';
import "./myInput.scss"

class MyInput extends Component {
    render() {
        // console.log("propsy",this.props)
        const{field:{name},form:{errors,touched}} = this.props;
        return (
            <div className="myInput">
               <label>{name}:</label>
               <input className="form-control" placeholder={name} {...this.props.field} {...this.props} />
                {touched[name] && errors[name] &&
                    <label className="error">{errors[name]}</label>
                }
            </div>
        );
    }
}

export default MyInput;
