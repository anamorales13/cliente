import React, { Component } from 'react';

import Global from '../../Global';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';




class Coordinador extends Component {

    state = {

        status: null,
        coordinador: {},
        profesores: [],
        profesor: {},
        


    };

    urlprofesor = Global.urlprofesor;


    constructor(props) {
        super(props);
        this.getcoordinador();
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

    cambiarcoordinador=()=>{

        console.log(this.state.coordinador._id);

        var body={
            profesor: this.state.profesor,
            coordinador: this.state.coordinador._id
        }

        axios.put( 'https://plataforma-erasmus.herokuapp.com/apiProfesor/updatecoordinador', body)
        .then(res => {
            this.setState({
              status:'sucess'

            });

            axios.put('https://plataforma-erasmus.herokuapp.com/apiDestino/update_coordinador/'+ this.state.profesor)
            .then(res => {
                this.setState({
                   status:'sucess'
    
                });
            });

            axios.put('https://plataforma-erasmus.herokuapp.com/apiErasmus/setcoordinador/' + this.state.profesor)
                .then(res=>{
                    this.setState({
                        status:'sucess'
                    })
                });    
                this.forceUpdate();
    });
    this.forceUpdate();
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


    render() {
        return (
            <div id="delete-profesor">
                <h1 className="titulo-doc" style={{ marginBottom: '25px' }}>CAMBIAR COORDINADOR DE CENTRO </h1>

                <Card className="card-bajas">
                    <div className="bajas">
                        <h3 style={{ fontSize: '24px', color: '#BB0909' }}>Coordinador de Centro actual</h3>
                        <h5 style={{ fontSize: '16px' }}><strong>Nombre:</strong> {this.state.coordinador.nombre + " " + this.state.coordinador.apellido1 + " " + this.state.coordinador.apellido2} </h5>
                        <h5 style={{ fontSize: '16px' }}><strong>Correo electrónico: </strong>{this.state.coordinador.email}  </h5>
                        <h5 style={{ fontSize: '16px' }}><strong>Télefono:</strong> {this.state.coordinador.telefono}  </h5>
                    </div>
                </Card>
                <Card className="card-bajas">
                    <div className="bajas">
                        <h3 style={{ fontSize: '24px', color: '#BB0909' }}> Nuevo coordinador de Centro</h3>
                        <Form className="form-añadir-destino">
                            <Form.Group>
                                <Form.Label style={{ fontSize: '16px' }}> Elige al nuevo coordinador de centro:</Form.Label>
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
                        </Form>
                        <button onClick={this.cambiarcoordinador} className="btn-style" style={{ marginTop: '15px' }}> GUARDAR </button>
                    </div>
                </Card>


            </div>


        );
    }
}

export default Coordinador;