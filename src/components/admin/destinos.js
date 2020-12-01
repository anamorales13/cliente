import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Menu from './menu-admin';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import swal from 'sweetalert';
import Alert from 'bootstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import '../../assets/css/admin.css';
import { ColorizeRounded } from '@material-ui/icons';

class destinos extends Component {


    state = {

        profesores: [],
        destino: {},
        identity: JSON.parse(localStorage.getItem('user')),
        status: 'false',
        pais: "",
        ciudad: "",
        carrera: "",
        profesor: "",
        coordinador: {},
        error:""

    }
    constructor(props) {
        super(props)

        this.listarProfesores();
        this.getcoordinador();
        this.handleChangeProf = this.handleChange.bind(this);

    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }

    handleChangeProf(e) {

        console.log("hola");
        this.setState({ profesor: e.target.value });
        console.log("h" + this.state.profesor);
    }

    formularioEnBlanco = () => {
        this.setState({
            texto: "",
            asunto: "",
            tags: ""

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

    getcoordinador() {
        console.log("getcoordinador");
        axios.get('https://plataforma-erasmus.herokuapp.com/apiProfesor/get-coordinador-centro')
            .then(res => {
                this.setState({
                    coordinador: res.data.profesor
                })
                console.log("h" + this.state.coordinador.nombre);
                console.log("h" + this.state.coordinador._id);

            });

        this.forceUpdate();
    }


    añadirDestino = (e) => {

        var body = {
            pais: this.state.pais,
            ciudad: this.state.ciudad,
            carrera: this.state.carrera,
            profesor: this.state.profesor,
            coordinador: this.state.coordinador._id
        };        

        axios.post('https://plataforma-erasmus.herokuapp.com/apiDestino/' + 'save', body)
            .then(res => {
                
                this.setState({
                    destino: res.data.destino,

                })
            })
            .catch(err => {
                this.setState({
                    destino: {},
                    status: 'failed',
                    error: 'El destino ya esta registrado'
                });

            });
    }



    render() {
        return (
            <div >
                <div  className="grid-mensajeria-col">

                    <Menu></Menu>
                    <div>

                        <h1 className="titulo-doc"> NUEVO DESTINO </h1>
                        <div className="form-destino" >
                        {this.state.error !="" &&
                        <label style={{color:'red', textAlign:'center', display:'block', fontWeight:'bold', marginTop:'20px'}}>{this.state.error}</label>
                        }
                            <Form className="form-añadir-destino" onSubmit={this.añadirDestino}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Pais</Form.Label>
                                    <Form.Control type="pais" placeholder="Introduce el pais" onChange={this.handleChange('pais')} />

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control type="ciudad" placeholder="Introduce la ciudad" onChange={this.handleChange('ciudad')} />

                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Grado universitario</Form.Label>
                                    <Form.Control as="select" onChange={this.handleChange('carrera')} type="carrera">
                                        <option></option>
                                        <option>Grado en Ingeniería Informática</option>
                                        <option>Grado en Ingeniería Agrícola</option>
                                        <option>Grado en Ingeniería Química industrial</option>
                                        <option>Grado en Ingeniería Eléctrica</option>
                                        <option>Grado en Ingeniería Mecánica</option>
                                        <option>Grado en Ingeniería Forestal y del medio natural</option>
                                        <option>Grado en Ingeniería Electrónica industrial</option>
                                        <option>Grado en Ingeniería Energética</option>
                                        <option>Grado de Ingeniería en Exp. Minas y Rec. Energéticos</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label> Coordinador de destino</Form.Label>
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

                                <Button className="button-join " type="submit" >
                                    CREAR
                            </Button>
                            </Form>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default destinos;