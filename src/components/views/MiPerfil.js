import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';
import Global from '../../Global';
import MenuPerfil from './MenuPerfil';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';

class MiPerfil extends Component {

    state = {
        identity: {},
        tipo: null,
    }

    url = Global.url;

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        var id = this.props.match.params.id;
        if (id == null) {
            console.log("hola")
            this.setState({
                identity: JSON.parse(localStorage.getItem('user')),

            });
        } else {
            console.log("hola2")
            this.getalumno();
        }
    }

    getalumno = () => {

        console.log("dentro");
        var id = this.props.match.params.id;
        axios.get(this.url + 'user/' + id)
            .then(res => {
                this.setState({
                    identity: res.data.user
                })
                console.log(this.state.identity.nombre);
            })
    }



    render() {


        return (
            <div>

                <div id="content" className="grid">

                    {this.props.match.params.id == null &&
                        <MenuPerfil />
                    }
                    {this.props.match.params.id != null &&
                        < Breadcrumb >
                            <Breadcrumb.Item href="/inicio" > Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="/Alumnos" >
                                Alumnos
               </Breadcrumb.Item>
                            <Breadcrumb.Item active >{this.state.identity.nombre + " " + this.state.identity.apellido1 + " " + this.state.identity.apellido2}</Breadcrumb.Item>
                        </Breadcrumb>
                    }

                    <div className="avatar" id="avatar-big">
                        <img src={'https://plataforma-erasmus.herokuapp.com/public/' + this.state.identity.image} classname="avatar"></img>
                    </div>

                    <div >

                        <h1 className="titulo"> Información personal </h1>
                        <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>

                        <div className="avatar" id="avatar-responsive">
                            <img src={'https://plataforma-erasmus.herokuapp.com/public/' + this.state.identity.image} classname="avatar"></img>
                        </div>
                        <article className="elemt-one">

                            <div className="elemt-form">
                                <header >
                                    <h2 className="form-perfil-title">Perfil</h2>
                                    <hr />
                                </header>
                                <div className="profesor-erasmus">
                                    <h5><strong>Nombre: </strong> {this.state.identity.nombre}</h5>
                                    <h5><strong>Apellidos: </strong>{this.state.identity.apellido1 + " " + this.state.identity.apellido2}</h5>
                                    <h5><strong>Usuario: </strong> {this.state.identity.usuario}</h5>




                                </div>



                            </div>
                        </article>

                        <article className="elemt-one">
                            <div className="elemt-form">
                                <header >
                                    <h2 className="form-perfil-title">Información de contacto</h2>
                                    <hr />

                                </header>
                                <div className="profesor-erasmus">

                                    <h5><strong>Correo electrónico: </strong>{this.state.identity.email}</h5>
                                    <h5><strong>Teléfono: </strong> {this.state.identity.telefono}</h5>

                                    {this.state.identity.tipo === 'profesor' &&
                                        <div>
                                            <h5><strong>Edificio: </strong>{this.state.identity.edificio}</h5>
                                            <h5>{this.state.identity.datos}</h5>
                                            <h5><strong>Nº Despacho: </strong>{this.state.identity.despacho}</h5>
                                            <h5><strong>Tutoria</strong></h5>
                                            <h5>{this.state.identity.tutoria}</h5>
                                        </div>
                                    }




                                </div>
                            </div>
                        </article>
                    </div>
                </div>

            </div >
        );
    }
}

export default MiPerfil;
