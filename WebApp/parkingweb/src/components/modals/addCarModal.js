import React, { Component } from 'react';
import { compose } from 'redux';
import { connectModal } from 'redux-modal';
import { Modal, Button } from "react-bootstrap"
import { Formik, Form, Field } from "formik";
import MyInput from "../myInput/myInput";
import { connect } from 'react-redux';
import { addCar } from '../../store/actions/carsActions';

const ModalName = "AddCarModal";

class AddCarModal extends Component {

    validate = (values) => {
        const errors = {};
        if (!values.Marka) {
            errors.Marka = "Wymagane"
        }
        if (!values.Model) {
            errors.Model = "Wymagane"
        }
        if (!values.Tablica) {
            errors.Tablica = "Wymagane"
        }
        return errors;
    }

    submit = (values) => {
        const {addCar,userId,handleHide} = this.props;
        const body = {
            model:values.Model,
            mark:values.Marka,
            plate:values.Tablica
        }
        addCar(userId,body);
        handleHide();
    }

    render() {
        const { handleHide, show } = this.props;
        return (
            <div className={ModalName}>
                <Modal show={show} onHide={handleHide}>
                    <Formik
                        initialValues={{
                            Model: "",
                            Marka: "",
                            Tablica: ""
                        }}

                        validate={this.validate}
                        onSubmit={this.submit}
                    >
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Dodawanie auta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Field name="Model" type="text" component={MyInput} />
                                <Field name="Marka" type="text" component={MyInput} />
                                <Field name="Tablica" type="text" component={MyInput} />

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleHide}>
                                    Zamknij
                            </Button>
                                <Button variant="primary" type="submit">
                                    Zapisz
                            </Button>
                            </Modal.Footer>
                        </Form>
                    </Formik>
                </Modal>
            </div>
        );
    }
}

export default compose(
    connect(state=>({
        userId: state.user.UserData.id,
    }),dispatch=>({
        addCar:(userId,body)=>dispatch(addCar(userId,body))
    })),
    connectModal({ name: ModalName })
)(AddCarModal);
