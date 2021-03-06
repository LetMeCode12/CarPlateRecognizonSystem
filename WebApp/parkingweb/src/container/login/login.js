import React, { Component } from 'react';
import "./login.scss";
import { Formik, Form, Field } from 'formik';
import MyInput from '../../components/myInput/myInput';
import {Button} from 'react-bootstrap';
import Logo from "../../icons/parking.png"
import {compose} from 'redux';
import {withRouter} from "react-router-dom"
import {NotificationManager} from 'react-notifications';
import { login } from './loginUtils';
import { connect } from 'react-redux';
import {addUser, removeUser} from "../../store/actions/userActions"


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            error:undefined
        }
    }

    componentDidMount(){
        localStorage.clear()
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                document.querySelector('#submit').click()
            }
        });
    }

    validate=(values)=>{
        const errors = {}
            if(!values.Login){
                errors.Login="Wymagane"
            }
            if(!values.Password){
                errors.Password="Wymagane"
            }

        return errors;
    }

    onSubmit=(values)=>{
        const {removeUser,addUser,history} = this.props;
        console.log("submit",values)
        NotificationManager.info("Logowanie")
        const body = {
            username:values.Login,
            password:values.Password
        }
        login(body).then(async(res)=>{
            console.log("res:",res.status)
            removeUser()
            switch(res.status){
                case 200:
                    NotificationManager.success("Logowanie","Zalogowano pomyslnie")
                    const token = res.headers.get("authorization")
                    const username = res.headers.get("username")
                    localStorage.setItem("token",token)
                    localStorage.setItem("username",username)
                    await addUser({username,token})
                    history.push("/mainpage")
                    break;
                case 403:
                    NotificationManager.error("Logowanie","B????dne has??o lub login")
                    this.setState({
                        error:"B????dne has??o lub login"
                    })
                    break;
                default:
                    NotificationManager.error("Logowanie","B????d serwera")
                    this.setState({
                        error:"B??ad serwera lub brak po????czenia z internetem"
                    })
            }
        }).catch(()=>{
            NotificationManager.error("Logowanie","Wyst??pi?? b????d")
            this.setState({
                error:"B??ad serwera lub brak po????czenia z internetem"
            })
        })
        
    }

    render() {
        const {error} = this.state;
        const {history} = this.props;
        return (
            <div className="Login">
                <img src={Logo}/>
                <h1>ParkingApp</h1>
                <Formik
                    initialValues={{
                        Login:"",
                        Password:""
                    }}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                >                    
                    <Form className="myForm"  >
                        {error &&
                        <label className="myError">{error}</label>
                        }
                        <Field name="Login"  type="text" component={MyInput}/>
                        <Field name="Password"  type="password" component={MyInput}/>

                        <Button id="submit" type="submit">Zaloguj</Button>
                        <Button onClick={()=>{history.push("/registration")}} >Zarejestruj</Button>
                    </Form>
                </Formik>
            </div>
        );
    }
}

export default compose(
    connect(null,dispatch=>({
      addUser:(data)=> dispatch(addUser(data)),
      removeUser:()=> dispatch(removeUser)   
    })),
    withRouter
)(Login);
