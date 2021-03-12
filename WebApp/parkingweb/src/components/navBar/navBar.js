import React, { Component } from 'react';
import { Nav , Navbar, NavDropdown} from "react-bootstrap";
import icon from "../../icons/parking.png";
import "../navBar/navBar.scss";
import {withRouter} from "react-router-dom";

class MyNavBar extends Component {

    logOut = () =>{
        const {history} = this.props;     
        localStorage.clear();
        history.push('/')
    }

    render() {
        const {history} =this.props;
        return (
            <div className="MyNavBar">
                <Navbar  bg="dark" variant="dark" expand="lg">
                    <img src={icon} height="40"/>
                    <Navbar.Brand >ParkingApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto w-100">
                            <Nav.Link onClick={()=>history.push("/mainpage")} >Strona główna</Nav.Link>
                            <NavDropdown title="Opcje" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>history.push("/cars")} >Samochody</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={()=>history.push("/details")} >Szczegóły</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className="ml-auto" onClick={()=>this.logOut()}>Wyloguj</Nav.Link>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Navbar >
            </div>
        );
    }
}

export default withRouter(MyNavBar);
