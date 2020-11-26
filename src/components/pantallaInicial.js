import React, { Component } from 'react';
import Global from '../Global';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import imagenlogo from '../assets/images/logo-erasmus.png';


import imagen from '../assets/images/boton-alumno.png';
import imagenprof from '../assets/images/boton-profesor.png';
import '../assets/css/InicialScreen.css';



class pantallaInicial extends Component {

    passwordRef = React.createRef();
    usuarioRef = React.createRef();
    gettoken = true;

    url = Global.url;


    state = {
        alumno: {},
        status: 'waiting',
        nuevoAlumno: {},
        token: "",
        navigate: false
    };


    /* BUSCAR ALUMNOS EN LA BD */
    change = () => {
        this.setState({

            nuevoAlumno: {
                usuario: this.usuarioRef.current.value,
                password: this.passwordRef.current.value

            },

        });

    }







    render() {

        const { navigate } = this.state
        if (navigate) {
            return <Redirect to="/inicio" push={true} />
        }

        return (

            <div className="grid-inicio">
                <div className="logo-titulo">
                    <img src={imagenlogo} width="100px" height="80px"></img>
                    <div className="titulo-completo">
                        <h3>Universidad de Huelva</h3>
                        <h1> ERASMUS+ </h1>
                    </div>
                </div>
                <hr className="linea"></hr>

                <div className="grid-logo-inicio">
                    
                        <div className="boton-alumno">

                            <h3 id="header-boton"> ALUMNOS </h3>
                            <Link to={{
                                pathname: '/inicioSesion',
                                state: {
                                    tipo: 'alumno'
                                }
                            }}>
                                <img src={imagen} width="200px" height="280px"></img>
                            </Link>


                        </div>
                        <div className='boton-profesor' >
                            <h3 id="header-boton-prof"> PROFESOR </h3>
                            <Link to={{
                                pathname: '/inicioSesion',
                                state: {
                                    tipo: 'profesor'
                                }
                            }}>
                                <img src={imagenprof} width="200px" height="280px"></img>
                            </Link>
                        </div>
                   

                </div>
                <div id="administrador">
                    <label>¿Eres administrador?</label> <Link to={"/inicioAdministrador"}>Inicia sesión aquí</Link>
                </div>
            </div>













        );

    }
}

export default pantallaInicial;