import React, { Component } from 'react';
import Global from '../Global';
import GlobalProfesor from '../GlobalProfesor';
import axios from 'axios';

import imagenlogo from '../assets/images/logoUni.png';
import { Link, Redirect } from 'react-router-dom';


import imagenalumno from '../assets/images/boton-alumno.png';
import imagenprof from '../assets/images/boton-profesor.png';
import '../assets/css/InicialScreen.css';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import {withRouter} from 'react-router-dom';


class InicioSesion extends Component {

    passwordRef = React.createRef();
    usuarioRef = React.createRef();
    gettoken = true;

    url = Global.url;
    urlProfesor = GlobalProfesor.url;
    navigate=false;

    state = {
        alumno: {},
        status: 'waiting',
        nuevoAlumno: {},
        token: "",
        navigate: false,
        message: "",
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

    getProfesor = (e) => {
        e.preventDefault();
        this.change();
        var elem = document.getElementById('fp-container');
        elem.style.display = 'block'

        axios.post(this.urlProfesor + 'login', this.state.nuevoAlumno)
            .then(res => {

               this.setState({
                    // alumno: res.data.users,
                    sucess: 'sucess',
                    alumno: res.data.users,
                    token: res.data.token,
                    navigate: true
               });

            //   this.navigate=true;

                //persistir los datos del usuario
                localStorage.setItem('user', JSON.stringify(res.data.users));
               
                elem.style.display = 'none'
                this.props.history.push('/inicio');
            })
            .catch(err => {
                this.setState({
                    alumno: {},
                    status: 'failed',
                    message: "Nombre de usuario o contraseña incorrecto."
                });
                elem.style.display = 'none'
            });
        this.forceUpdate();
    }
    
   
        
   
  

    getAlumno = (e) => {
        e.preventDefault();
        this.change();

        var elem = document.getElementById('fp-container');
        elem.style.display = 'block'

        axios.post('https://plataforma-erasmus.herokuapp.com/apiErasmus/login', this.state.nuevoAlumno)
            .then(res => {

                this.setState({
                    sucess: 'sucess',
                    alumno: res.data.users,
                    token: res.data.token,
                    navigate:true

                });
               

                localStorage.setItem('user', JSON.stringify(this.state.alumno));
               
                elem.style.display = 'none'
                this.props.history.push('/inicio');
               // return <Redirect to="/inicio" push={true} />
                
            })
            .catch(err => {
                this.setState({
                    alumno: {},
                    status: 'failed',
                    message: "Nombre de usuario o contraseña incorrecto"
                });
                elem.style.display = 'none'
            });
        this.forceUpdate();

    }

    get_identity() {
        return JSON.parse(localStorage.getItem('user'));
    }



    render() {

        
        if (this.state.navigate && JSON.parse(localStorage.getItem('user')) != null) {
            console.log("navigate");
            return <Redirect to="/inicio" push={true} />
        }


        const { tipo } = this.props.location.state
        return (

            <div>
                {tipo === 'profesor' &&
                    <div className="grid-inicio">
                        <div className="logo-titulo">
                            <img src={imagenlogo} width="60px" height="60px" alt="logo"></img>
                            <div className="titulo-completo">
                                <h3>Universidad de Huelva</h3>
                                <h1> ERASMUS+ </h1>
                            </div>
                        </div>
                        <hr className="linea"></hr>

                        <div className="grid-logo-inicioSesion">
                            <div className="inicio-logo-alumno">

                                <h3 id="header-boton"> ALUMNOS </h3>
                                <NavLink exact to={{
                                    pathname: '/inicioSesion',
                                    state: {
                                        tipo: 'alumno'
                                    }
                                }} replace>
                                    <img src={imagenalumno} width="200px" height="280px" alt="carta alumno"></img>
                                </NavLink>
                            </div>

                            <article className="formulario-inicioSesion">
                                <div className="cabecera-login">
                                    <h3 className="title-login" style={{ fontSize: '25px' }}>INICIAR SESIÓN </h3>
                                    <h1 className="title-login" style={{ fontSize: '18px' }}><strong>PROFESORES</strong>   </h1>
                                    {this.state.message !== "" &&

                                        <label style={{ color: '#A6250E', backgroundColor: '#F7A99C', width: '60%', textAlign: 'center', margin: 'auto', display: 'block', fontWeight: 'bold', marginTop: '20px' }}>
                                            {this.state.message}</label>
                                    }
                                    <Link to={{
                                        pathname: '/nuevoProfesor',
                                        state: {
                                            tipo: 'profesor'
                                        }
                                    }} className="link-nuevoUsuario" > Registrarse</Link>

                                </div>


                                <Form onSubmit={this.getProfesor} >
                                    {/*<div className="form-login">*/}

                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                </svg>
                                            </div>
                                            <input className="form-login-input" onChange={this.change} type="text" ref={this.usuarioRef} placeholder="Usuario" />
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
                                            <input className="form-login-input" onChange={this.change} type="password" ref={this.passwordRef} placeholder="Contraseña" />
                                        </div>
                                    </div>

                                    <input type="submit" value="INICIAR SESIÓN" className="btn-login " ></input>
                                </Form>
                            </article>
                        </div>
                        <div id="administrador">
                            <label>¿Eres administrador?</label> <Link to={"/inicioAdministrador"} style={{ color: 'blue' }}>Inicia sesión aquí</Link>
                        </div>
                    </div>


                }
                {tipo === 'alumno' &&
                    <div className="grid-inicio">
                        <div className="logo-titulo">
                            <img src={imagenlogo} width="60px" height="60px" alt="logo"></img>
                            <div className="titulo-completo">
                                <h3>Universidad de Huelva</h3>
                                <h1> ERASMUS+ </h1>
                            </div>
                        </div>
                        <hr className="linea"></hr>

                        <div className="grid-logo-inicioSesion">

                            <article className="formulario-inicioSesion form-alumno">
                                <div className="cabecera-login">
                                    <h3 className="title-login" style={{ fontSize: '25px' }}>INICIAR SESIÓN </h3>
                                    <h1 className="title-login" style={{ fontSize: '18px' }}><strong>ALUMNOS</strong>   </h1>
                                    {this.state.message !== "" &&

                                        <label style={{ color: '#A6250E', backgroundColor: '#F7A99C', width: '60%', textAlign: 'center', margin: 'auto', display: 'block', fontWeight: 'bold', marginTop: '20px' }}>
                                            {this.state.message}</label>
                                    }
                                    <Link to={{
                                        pathname: '/nuevoUsuario',
                                        state: {
                                            tipo: 'alumno'
                                        }
                                    }} className="link-nuevoUsuario" > Registrarse</Link>
                                </div>

                                <form onSubmit={this.getAlumno} >
                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                </svg>
                                            </div>
                                            <input className="form-login-input" onChange={this.change} type="text" ref={this.usuarioRef} placeholder="Usuario" />
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
                                            <input className="form-login-input" onChange={this.change} type="password" ref={this.passwordRef} placeholder="Contraseña"></input>
                                        </div>
                                    </div>

                                    <input type="submit" value="INICIAR SESIÓN" className="btn-login" ></input>
                                </form>
                            </article>

                            <div className="inicio-logo-profesor">

                                <h3 id="header-boton-prof"> PROFESORES </h3>
                                <NavLink exact to={{
                                    pathname: '/inicioSesion',
                                    state: {
                                        tipo: 'profesor'
                                    }
                                }} replace>
                                    <img src={imagenprof} width="200px" height="280px" alt="carta profesor"></img>
                                </NavLink>



                            </div>
                        </div>
                        <div id="administrador">
                            <label>¿Eres administrador?</label> <Link to={"/inicioAdministrador"}>Inicia sesión aquí</Link>
                        </div>
                    </div>
                }


                <div className="fp-container" id="fp-container">
                    <Spinner animation="border" role="status" className="fp-loader"></Spinner>
                </div>

            </div>






        );



    }
}

export default InicioSesion;