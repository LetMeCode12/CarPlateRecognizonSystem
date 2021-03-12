import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import logo from "../icons/parking.png"
import { Button, View, StyleSheet, Text, Image, AsyncStorage } from "react-native";
import MyImput from "../components/imput/myImput"
import { getToken, isToken } from "../functions/tokenUtils";

class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            loginError:undefined
        }
    }

    validator = (value) => {
        const errors = {}


        if (!value.Login) {
            errors.Login = "Wymagane"
        }

        if (!value.Password) {
            errors.Password = "Wymagane"
        }

        return errors;
    }


   async componentDidMount() {
        const { history } = this.props;
       
       console.log("GetToken", await getToken())
        console.log("Is token", await isToken())
        if ( await isToken()) {
            history.push("/gatePanel")
        }
    }

    submit = (values) => {
        const { Login, Password } = values;
        console.log("value", values)

        fetch("http://192.168.1.1:8080/login", {
            method: "POST",
            body: JSON.stringify({ username: Login, password: Password })
        }).then(resp => {
            switch (resp.status) {
                case 200:

                    console.log(resp.headers.get('authorization'))
                    console.log(resp.headers.get('username'))
                    AsyncStorage.setItem("@username",resp.headers.get('username'))
                    AsyncStorage.setItem("@token",resp.headers.get('authorization'))
                    
                    setTimeout(() => {
                        this.props.history.push("/gatePanel")
                    }, 500)

                    break;
                case 401:
                    this.setState({
                        loginError:"Login lub hasło są błędne"
                    })
                    break;
                default:
                    this.setState({
                        loginError:"Wystąpił błąd podczas logowania"
                    })
            }
        }).catch(err => {
            this.setState({
                loginError:"Wystąpił błąd podczas logowania"
            })
        })


    }

    render() {
        const {loginError} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image style={styles.image} source={logo} />
                    <Text style={styles.text}>ParkingApp</Text>
                </View>

                <Formik
                    initialValues={{
                        Login: "",
                        Password: ""
                    }}
                    validate={this.validator}
                    onSubmit={this.submit}
                >
                    {({ handleSubmit, values, errors, touched, handleChange, handleBlur }) => (

                        < View  style={styles.login} >
                            {loginError &&
                                <Text style={styles.error}>{loginError}</Text>
                            }
                            
                            <MyImput title="Login" value={values.Login} error={errors.Login} touched={touched.Login} onChangeText={handleChange('Login')} onBlur={handleBlur('Login')} />
                            <MyImput title="Password" value={values.Password} error={errors.Password} touched={touched.Password} password onChangeText={handleChange('Password')} onBlur={handleBlur('Password')} />
                            <View style={styles.button}>
                                <Button  onPress={handleSubmit} title="Zaloguj" />
                            </View>


                        </View>
                    )}
                </Formik>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    login: {
        display: "flex",
        marginHorizontal: 60,
        marginVertical: 20,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        padding: 25,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
           
        
    },
    container: {
        display: "flex",

    },
    logo: {
        display: "flex",
        flexDirection: "column",
        marginHorizontal: 60,
        marginVertical: 20,
        alignItems: "center"

    },
    text: {
        fontSize: 32,
        fontWeight: "700",

    },
    image: {
        width: 300,
        height: 300
    },
    button:{
      marginHorizontal:30,       
    },
    error:{
        color:"red",
        marginBottom:10
    }
});

export default Login;
