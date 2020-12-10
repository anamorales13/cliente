import React, { Component } from 'react';
import Global from '../Global';
import GlobalProfesor from '../GlobalProfesor';
import axios from 'axios';
import swal from 'sweetalert';
import imagenlogo from '../assets/images/logo-erasmus.png';
import { Link, Redirect } from 'react-router-dom';

import imagen from '../assets/images/InicialScreen.png';
import imagenalumno from '../assets/images/boton-alumno.png';
import imagenprof from '../assets/images/boton-profesor.png';
import '../assets/css/InicialScreen.css';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

class InicioSesion extends Component {

    
    gettoken = true;

    url = Global.urlprofesor;
    

    state = {
        alumno: {},
        status: 'waiting',
        usuario:"",
        password:"",
        token: "",
        navigate: false
    };


    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }



    getProfesor = (e) => {
        e.preventDefault();
        
        var admin={
            usuario: this.state.usuario,
            password: this.state.password
        }
        var elem = document.getElementById('fp-container');
        elem.style.display = 'block'

        axios.post(this.url + 'login-admin', admin)
            .then(res => {
                this.setState({
                    // alumno: res.data.users,
                    sucess: 'sucess',
                    alumno: res.data.users,
                    token: res.data.token,
                    navigate: true

                });
            
                //persistir los datos del usuario
                console.log(JSON.stringify(this.state.alumno));
                localStorage.setItem('user', JSON.stringify(this.state.alumno));
                localStorage.setItem('token', this.state.token);
                elem.style.display = 'none'
                //  this.get_token();
            })
            .catch(err => {
                this.setState({
                    alumno: {},
                    status: 'failed'
                });
                swal(
                    '¡Error!',
                    'Nombre de usuario o contraseña incorrectos',
                    'error'
                )
            });
        this.forceUpdate();
    }

    

    get_identity() {
        return JSON.parse(localStorage.getItem('user'));
    }



    render() {

        const { navigate } = this.state
        if (navigate && JSON.parse(localStorage.getItem('user')) != null) {
            return <Redirect to="/inicio" push={true} />
        }


        
        return (

            <div>
                
                    <div className="grid-inicio">
                        <div className="logo-titulo">
                            <img src={imagenlogo} width="100px" height="80px"></img>
                            <div className="titulo-completo">
                                <h3>Universidad de Huelva</h3>
                                <h1> ERASMUS+ </h1>
                            </div>
                        </div>
                        <hr className="linea"></hr>

                        <div className="centar-inicio-administrador">
                            <article className="formulario-inicioAdministrador ">
                            <div className="cabecera-login" >
                                    <h3 className="title-login" style={{ fontSize: '25px' }}>INICIAR SESIÓN </h3>
                                    <h1 className="title-login" style={{ fontSize: '18px' }}><strong>ADMINISTRADOR</strong>   </h1>
                                </div>
                                <form onSubmit={this.getProfesor} >
                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                </svg>
                                            </div>
                                            <input className="form-login-input" onChange={this.handleChange('usuario')} type="text"  placeholder="Usuario" />
                                        </div>
                                    </div>
                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />
                                                    <path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" />
                                                </svg>
                                            </div>
                                            <input className="form-login-input" onChange={this.handleChange('password')} type="password" ref={this.passwordRef} placeholder="Contraseña"></input>
                                        </div>
                                    </div>
                                   
                                    <input type="submit" value="INICIAR SESIÓN" className="btn-login"></input>
                                </form>
                            </article>
                        </div>  
                    </div>
                    <div id="administrador" style={{marginTop:'20px'}}>
                    <label>¿No eres administrador?</label> <Link to={"/"}>Inicia sesión aquí</Link>
                 </div>
                 <div className="fp-container" id="fp-container">
                    <Spinner animation="border" role="status" className="fp-loader"></Spinner>
                </div>
            </div>






        );



    }
}

export default InicioSesion;