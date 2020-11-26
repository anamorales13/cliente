import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';
import Global from '../../Global';
import MenuPerfil from './MenuPerfil';
import Card from 'react-bootstrap/Card';

class MiPerfil extends Component {

    state = {
        identity: null,
        destino: {},
        status: "",
        profesor: {},
        coordinador: {}
    }

    url = Global.url;

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
        this.getInfoDestino();
    }

    getInfoDestino() {
        axios.get('https://plataforma-erasmus.herokuapp.com/apiDestino/destino/' + JSON.parse(localStorage.getItem('user')).destino)
            .then(res => {
                this.setState({
                    destino: res.data.destinoget,
                    status: 'sucess'
                })

                axios.get('https://plataforma-erasmus.herokuapp.com/apiProfesor/profesor/' + JSON.parse(localStorage.getItem('user')).profesor)
                    .then(res => {
                        this.setState({
                            profesor: res.data.userget
                        })
                    })

                axios.get('https://plataforma-erasmus.herokuapp.com/apiProfesor/profesor/' + JSON.parse(localStorage.getItem('user')).coordinador)
                    .then(res => {
                        this.setState({
                            coordinador: res.data.userget
                        })
                    })

            })

    }


    render() {



        return (

            <div id="content" className="grid-passw">
                <MenuPerfil />
                

                <div >
                    <h1 className="titulo"> Información ERASMUS </h1>
                    <Card className="elemt-one-passw">
                        <Card.Body>
                            <Card.Title className="form-perfil-title" style={{ borderBottom: '1px solid grey' }}>Coordinador de destino</Card.Title>
                            <div className="profesor-erasmus">
                                <h6><strong>Nombre: </strong> {this.state.profesor.nombre + " " + this.state.profesor.apellido1 + " " + this.state.profesor.apellido2}</h6>
                                <h6><strong>Correo electrónico: </strong>{this.state.profesor.email}</h6>
                                <h6><strong>Télefono: </strong> {this.state.profesor.telefono}</h6>
                                <h6><strong>Edificio: </strong> {this.state.profesor.edificio} <strong>Nº despacho: </strong>{this.state.profesor.despacho}</h6>
                                <h6>{this.state.profesor.datos}</h6>
                            </div>
                        </Card.Body>


                    </Card>

                    <Card className="elemt-one-passw">
                        <Card.Body>
                            <Card.Title className="form-perfil-title" style={{ borderBottom: '1px solid grey' }}>Coordinador de Centro</Card.Title>
                            <div className="profesor-erasmus">
                                <h6><strong>Nombre: </strong> {this.state.coordinador.nombre + " " + this.state.coordinador.apellido1 + " " + this.state.coordinador.apellido2}</h6>
                                <h6><strong>Correo electrónico: </strong>{this.state.coordinador.email}</h6>
                                <h6><strong>Télefono: </strong> {this.state.coordinador.telefono}</h6>
                                <h6><strong>Edificio: </strong> {this.state.coordinador.edificio} <strong>Nº despacho: </strong>{this.state.coordinador.despacho}</h6>
                                <h6>{this.state.coordinador.datos}</h6>
                            </div>
                        </Card.Body>


                    </Card>

                    
                </div>
            </div>
        );



    }



}

export default MiPerfil;