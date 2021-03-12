import React, { Component } from 'react';
import "./registration.scss";
import { Formik, Form, Field } from 'formik';
import MyInput from '../../components/myInput/myInput';
import {Button} from 'react-bootstrap';
import { register } from './registrationUtils';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { withRouter } from 'react-router-dom';
import {compose} from "redux"

class Registration extends Component {
  

    phoneValid(p) {
        var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{3}$/;
        var digits = p.toString().replace(/\D/g, "");
        return phoneRe.test(digits);
    }

    validate=(values)=>{
        const errors = {}
            if(!values.Login){
                errors.Login="Wymagane"
            }
            if(!values.Hasło){
                errors.Hasło="Wymagane"
            }
            if(!values.Imię){
                errors.Imię="Wymagane"
            }
            if(!values.Nazwisko){
                errors.Nazwisko="Wymagane"
            }
            if(!values.Email){
                errors.Email="Wymagane"
            }
            if(values.Telefon && !this.phoneValid(values.Telefon)){
                errors.Telefon="Telefon posiada zły format"
            }
            if(!values.NrBudynku){
                errors.NrBudynku="Wymagane"
            }
            if(!values.NrPokoju){
                errors.NrPokoju="Wymagane"
            }

        return errors;
    }

    onSubmit=(values)=>{
        const {history} = this.props;
        console.log("submit",values)
        register(values).then((res)=>{
            switch(res.status){
                case 200:
                    NotificationManager.success("Sukces")
                    history.push("/")
                    break;
                default:
                    NotificationManager.error("Operacja nie powiodła się")
            }
        }).catch(()=>{
            NotificationManager.error("Operacja nie powiodła się")
        })
    }

    render() {
        return (
            <div className="Registration">
                <h1>Rejestracja</h1>
                <Formik
                    initialValues={{
                        Login:"",
                        Hasło:"",
                        Imię:"",
                        Nazwisko:"",
                        Email:"",
                        Telefon:"",
                        NrBudynku:"",
                        NrPokoju:"",
                    }}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                >                    
                    <Form className="myForm"  >
                        <Field name="Login"  type="text" component={MyInput}/>
                        <Field name="Hasło"  type="password" component={MyInput}/>
                        <Field name="Imię"  type="text" component={MyInput}/>
                        <Field name="Nazwisko"  type="text" component={MyInput}/>
                        <Field name="Email"  type="email" component={MyInput}/>
                        <Field name="Telefon"  type="text" component={MyInput}/>
                        <Field name="NrBudynku"  type="text" component={MyInput}/>
                        <Field name="NrPokoju"  type="text" component={MyInput}/>

                        <Button type="submit">Zatwierdź</Button>
                    </Form>
                </Formik>
            </div>
        );
    }
}

export default compose(
    withRouter
)(Registration);
