import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux';
import "./cars.scss"
import List from "../../components/list/list"
import { addCars,deleteCar } from '../../store/actions/carsActions';
import { Button } from "react-bootstrap";
import addIcon from "../../icons/add.png"
import { show } from 'redux-modal';
import AddCarModal from '../../components/modals/addCarModal';


class CarsPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { userId, addCars } = this.props;
        console.log("UserID", userId)
        addCars(userId);
    }

    onDelete =(value)=>{
        const {deleteCar} = this.props;
        console.log("Click",value)
        deleteCar(value.id);
    }

    render() {
        const { cars ,show} = this.props;
        const headers = [
            {
                name: "#",
            },
            {
                name: "Marka",
                data: "mark"
            },
            {
                name: "Model",
                data: "model"
            },
            {
                name: "Tablica",
                data: "plate"
            },
            {
                remove:<Button className="Buttonek btn btn-danger" >Usuń</Button>,
                func:(e,value)=>this.onDelete(e,value)
            }
        ]

        return (
            <div className="CarsPage">
                <div className="Central">
                    <List headers={headers} data={[...cars,{component:<img src={addIcon} width="30" onClick={()=>show("AddCarModal")}/>}]} />
                </div>

                <AddCarModal/>
            </div>
        );
    }
}

export default compose(
    connect(state => ({
        userId: state.user.UserData.id,
        cars: state.car.Cars,
    }), dispatch => ({
        addCars: (userId) => dispatch(addCars(userId)),
        deleteCar: (carId) => dispatch(deleteCar(carId)),
        show:(name,props)=>dispatch(show(name,props))
    })),
    withRouter
)(CarsPage);
