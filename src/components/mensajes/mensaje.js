import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Global from '../../GlobalMensaje';
import GlobalPerfil from '../../Global';

import { NavLink } from 'react-router-dom';
import Menu from './menu-mensajes';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';

import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class mensaje extends Component {

    state = {
        identity: JSON.parse(localStorage.getItem('user')),
        mensaje: [],
        mensajeguardar: {},

    }

    componentWillMount() {
        this.getMessage();

    }

    url = Global.url;
    urlperfil = GlobalPerfil.url;


    getMessage = (e) => {

        var id = this.props.match.params.id;
        console.log("id " + id);

        axios.put(this.url + 'marcar-leido/' + id)
            .then(res => {
                if (res.data.mensajes) {
                    this.setState({
                        // mensaje: res.data.mensajes,
                        status: 'sucess'
                    })
                }
            });

        axios.get(this.url + 'mensaje/' + id)
            .then(res => {
                if (res.data.mensajes) {
                    this.setState({
                        mensaje: res.data.mensajes,
                        status: 'sucess'
                    });
                }
            });
    }

    back() {
        window.history.back();
    }


    render() {
        var listarmensajes = this.state.mensaje.map((mensajes) => {

            return (
                <div >
                    <Breadcrumb >
                        <Breadcrumb.Item> <NavLink exact to="/inicio">Home</NavLink></Breadcrumb.Item>
                        <Breadcrumb.Item><NavLink exact to="/mensajes"> Bandeja de entrada</NavLink>
                           
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>ver mensaje</Breadcrumb.Item>
                    </Breadcrumb>
                    <hr className="linea-bajo"></hr>

                    <Card style={{ width: '70em' }} className="card-mensajes-individual row no-gutters " >

                        {mensajes.emisor.profesor != null &&
                            <Card.Img variant="left" src={'https://plataforma-erasmus.herokuapp.com/public/' + mensajes.emisor.profesor.image} className="image-user" />
                        }
                        {mensajes.emisor.alumno != null &&
                            <Card.Img variant="left" src={'https://plataforma-erasmus.herokuapp.com/public/' + mensajes.emisor.alumno.image} className="image-user" />
                        }


                        <Card.Body id="cardbody">
                            <div className="mensaje-header">
                                {mensajes.emisor.profesor != null &&
                                    <h4 id="mensaje-nombre-novisto">{mensajes.emisor.profesor.nombre + " " + mensajes.emisor.profesor.apellido1 + "    " + mensajes.emisor.profesor.apellido2} </h4>

                                }
                                {mensajes.emisor.alumno != null &&
                                    <h4 id="mensaje-nombre-novisto">{mensajes.emisor.alumno.nombre + " " + mensajes.emisor.alumno.apellido1 + "    " + mensajes.emisor.alumno.apellido2} </h4>

                                }


                                <h6 className="fecha"> <Moment format="DD-MM-YYYY">{mensajes.fecha}</Moment></h6>
                            </div>
                            {mensajes.emisor.profesor != null &&
                                <h5 style={{ fontSize: '15px' }}> {"    <" + mensajes.emisor.profesor.email + ">"} </h5>

                            }
                            {mensajes.emisor.alumno != null &&
                                <h5 style={{ fontSize: '15px' }} > {"    <" + mensajes.emisor.alumno.email + ">"} </h5>

                            }


                            <hr></hr>
                            <div className="pruebaresponder">
                                <strong style={{ fontSize: '16px' }}>{mensajes.asunto}</strong>
                                {mensajes.emisor.profesor != null &&
                                    <Link to={'/responder/' + mensajes._id} params={{ mensajeId: mensajes._id, emisor: mensajes.emisor.profesor.email, texto: mensajes.texto }} className="responder" title="responder">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-90deg-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                                        </svg>
                                    </Link>
                                }
                                {mensajes.emisor.alumno != null &&
                                    <Link to={'/responder/' + mensajes._id} params={{ mensajeId: mensajes._id, emisor: mensajes.emisor.alumno.email, texto: mensajes.texto }} className="responder" title="responder"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-90deg-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                                    </svg></Link>

                                }


                            </div>


                            <Card.Text >
                                <br />
                                <label className="textarea-mostrarmensaje" readonly>{mensajes.texto}</label>

                            </Card.Text>

                        </Card.Body>
                    </Card>


                </div>
            );
        });
        return (
            <div className="grid-mensajeria-col">

                <Menu />


                <div>
                    {listarmensajes}
                </div>
            </div>
        );
    }
}


export default mensaje;