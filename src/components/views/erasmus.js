import React, { Component } from 'react';
import MenuPerfil from './MenuPerfil';
import { Link } from 'react-router-dom';
import Global from '../../Global';
import axios from 'axios';
import Card from 'react-bootstrap/Card';



class erasmus extends Component {

    state = {
        identity: JSON.parse(localStorage.getItem('user')),
        coordinador: {},
        destinos: [],
        status: null,
    }

    constructor(props) {
        super(props);
        this.getcoordinador();
        this.getdestinos();


    }

    urlprofesor = Global.urlprofesor;


    getcoordinador() {
        axios.get(this.urlprofesor + 'get-coordinador-centro')
            .then(res => {
                this.setState({
                    coordinador: res.data.profesor,

                });
            });

    }

    getdestinos() {
        axios.get('https://plataforma-erasmus.herokuapp.com/apiDestino/destinoByProfesor/' + this.state.identity._id)
            .then(res => {
                this.setState({
                    destinos: res.data.destino,

                });
            });
    }



    render() {

        if (this.state.destinos != undefined) {
            var listardocumentos = this.state.destinos.map((destino, index) => {
                return (
                    <div>
                        <h6><strong>{index+1 +". " }</strong>{destino.ciudad + " (" + destino.pais + ") --- "+ destino.carrera}</h6>
                        <br></br>
                        
                    </div>

                );
            })
        }else{
            return(
                <h6>No hay elementos</h6>
            )
        }
        return (

            <div id="content" className="grid-passw">
                <MenuPerfil />
                
                <div >
                    <h1 className="titulo"> Información ERASMUS </h1>
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

                    <Card className="elemt-one-passw">
                        <Card.Body>
                            <Card.Title className="form-perfil-title" style={{ borderBottom: '1px solid grey' }}>Tus destinos</Card.Title>
                            <div className="profesor-erasmus">
                                {listardocumentos}
                            </div>
                        </Card.Body>


                    </Card>
                </div>



            </div>

        );


    }
}

export default erasmus;