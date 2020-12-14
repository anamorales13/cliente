import React, { Component } from 'react';

import Global from '../../Global';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';



class DeleteProfesor extends Component {

    state = {

        status: null,
        message: "",
        profesores: [],
        profesor: {},
        getprofesor: {},



    };

    urlprofesor = Global.urlprofesor;


    constructor(props) {
        super(props);

        this.listarProfesores();

    }


    getcoordinador() {
        axios.get(this.urlprofesor + 'get-coordinador-centro')
            .then(res => {
                this.setState({
                    coordinador: res.data.profesor,

                });
            });


    }

    bajaProfesor(e) {



        axios.delete(this.urlprofesor + 'dardebaja/' + this.state.profesor)
            .then(res => {
                this.setState({
                    status: 'sucess'
                })

            });



    }

    listarProfesores() {
        axios.get('https://plataforma-erasmus.herokuapp.com/apiProfesor/' + 'profesores')
            .then(res => {

                this.setState({
                    profesores: res.data.profesor,

                });
            });
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }


    mostrarFormulario() {
        var elem = document.getElementById('form-baja-profesor');
        elem.style.display = 'block';
    }

    render() {
        return (
            <div id="delete-profesor">
                <h1 className="titulo-doc" style={{ marginBottom: '25px' }}>DAR DE BAJA PROFESOR</h1>

                <Card className="card-bajas">
                    <div className="bajas">
                        <h3 style={{ fontSize: '24px', color: '#BB0909' }}>¡IMPORTANTE!</h3>
                        <h5 style={{ fontSize: '18px' }}><strong>Antes de dar de baja a un profesor debes de tener en cuenta:</strong></h5>
                        <h5 style={{ fontSize: '16px' }}><strong>1.</strong> El profesor no puede ser coordinador de centro. </h5>
                        <h5 style={{ fontSize: '16px' }}><strong>2.</strong> El profesor no puede tener ningún destino a su cargo, es decir, no puede ser coordinador de algún destino </h5>
                        <h5 style={{ fontSize: '16px' }}>Si alguna de las anteriores condiciones se cumple, deberá ir a gestión de destino y modificar los datos necesarios. </h5>
                        <h5 style={{ fontSize: '20px' }}> <strong>Recuerda</strong></h5>
                        <h5 style={{ fontSize: '16px' }}>Al efectuar la baja del perfil todos sus datos desaparecerán de nuestro servidor,
                        por lo que para volver a acceder a la web el usuario deberá registrarse de nuevo.
                </h5>
                        <label>¿Quiere seguir con la solicitud de la baja? <button onClick={this.mostrarFormulario}> SI </button></label>
                        <div id="form-baja-profesor" style={{ display: 'none' }}>
                            <Form className="form-borrar-profesor" >
                                <Form.Group>
                                    <Form.Label style={{ fontSize: '16px' }}> Elige al profesor que desea dar de baja</Form.Label>
                                    <Form.Control as="select" onChange={this.handleChange('profesor')} type="profesor" >
                                        <option> </option>
                                        {this.state.profesores.map((prof) => (
                                            <option key={prof._id} value={prof._id} >
                                                {prof.nombre + " " + prof.apellido1 + " " + prof.apellido2}
                                            </option>
                                        ))

                                        }

                                    </Form.Control>
                                </Form.Group>

                                <label id="toast" style={{ display: 'none', color: 'red' }}> No se puede dar de baja al usuario. Revisa las condiciones descritas arribas </label>



                            </Form>
                            <button onClick={() => { if (window.confirm('\n' + '¿Esta usted seguro? El profesor será eliminado del sistema ')) this.bajaProfesor(); }} className="btn-style"> DAR DE BAJA </button>
                        </div>
                    </div>
                </Card>



            </div>


        );
    }
}

export default DeleteProfesor;