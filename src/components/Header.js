import React, { Component, useState } from 'react';
import logo from '../assets/images/logo-etsi.png';

import { NavLink, useHistory } from 'react-router-dom';
import '../assets/css/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Redirect, Link } from 'react-router-dom';
import InicioSesion from './InicioSesion';
import Global from '../Global';
import GlobalMensaje from '../GlobalMensaje';
import Badge from 'react-bootstrap/Badge';
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

import Button from 'react-bootstrap/Button';
import axios from 'axios';




class Header extends Component {


    url = Global.url;
    urlmensaje = GlobalMensaje.url;
    urlprofesor = Global.urlprofesor;

    state = {
        navigate: false,
        identity: JSON.parse(localStorage.getItem('user')),
        noleidos: 0,
        show: false,
        showadmin: false,
        open: 'cerrar',
        contador: 1,

    }

    showDropdownadmin = (e) => {
        this.setState({
            showadmin: true
        })
    }
    hideDropdownadmin = e => {
        this.setState({
            showadmin: false
        })
    }


    showDropdown = (e) => {
        this.setState({
            show: true
        })
    }
    hideDropdown = e => {
        this.setState({
            show: false
        })
    }



    constructor(props) {

        super(props);

    }



    componentDidMount() {

        this.getNotificaciones();
    }

    botonmenu = () => {
        console.log(this.state.contador);
        if (this.state.contador == 1) {
            console.log("entro");

            var elem = document.getElementById('menuvar-responsive');
            elem.style.left = '0';
            this.setState({
                contador: 0
            })

        }
        if (this.state.contador === 0) {
            console.log("entro2");
            this.setState({
                contador: 1
            })
            var elem = document.getElementById('menuvar-responsive');
            elem.style.left = '-100%';
        }

    }



    handleClickAbrir() {
        this.setState({
            open: 'abrir'
        });
    }

    handleClickCerrar() {
        this.setState({
            open: 'cerrar'
        });
    }



    getNotificaciones = () => {
        axios.get(this.urlmensaje + 'mensajes-no-leidos/' + JSON.parse(localStorage.getItem('user'))._id)
            .then(res => {
                this.setState({
                    // alumno: res.data.users,
                    sucess: 'sucess',
                    noleidos: res.data.noleidos,


                });

            })
            .catch(err => {
                this.setState({
                    noleidos: 0,

                });


            });
    }

    cerrarSesion() {
        console.log("modificar sesion");
        this.setState({ navigate: true })
    }



    render() {
        //<Redirect exact to="/" push={true} replace />
       // window.location.href = '/';

        if (this.state.navigate === true) {
            
            localStorage.clear();
            return window.location.href = 'https://anamorales13.github.io/cliente';
        }

        return (

            <header /*id="header"*/ className="background">

                {/***** LOGO  ****  */}
                <div >
                    <NavLink exact to="/inicio" id="logo">
                        <img src={logo} id="logo-img"></img>
                    </NavLink>
                </div>

                <div className="logo-responsive" >
                    <div className="menu_bar">
                        <a id="btn-menu" onClick={this.botonmenu}>
                            <FaBars></FaBars>
                        </a>
                    </div>
                    <Link
                        label="Mensajes"
                        id="icono-mensajes"
                        variant="primary"
                        className="notificacion-mensajes"
                        to={
                            '/mensajes'
                        }
                    > <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: 'black' }}>
                            <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                        </svg> <Badge variant="light" >{this.state.noleidos}</Badge> </Link>

                    <Link className="notificacion-mensajes" id="icono-chat" style={{ color: 'black' }} to="/join" activeClassName="active" title="iniciar chat" target="_blank" >
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-text-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                        </svg>
                    </Link>
                </div>


                {this.state.identity.tipo === 'Alumno' &&
                    <div className="menu">
                        <nav /*id="menu"*/ id="menuvar">
                            <ul >
                                <li >
                                    <NavLink exact to="/inicio" activeClassName="active"> HOME </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/informacion" activeClassName="active">    INFORMACIÓN </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/documentos" activeClassName="active"> DOCUMENTOS </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/nube" activeClassName="active">  NUBE COMPARTIDA </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/mi_nube" activeClassName="active">
                                        MI NUBE </NavLink >
                                </li>
                            </ul>
                            <Link
                                label="Mensajes"
                                variant="primary"
                                className="notificacion-mensajes"
                                to={
                                    '/mensajes'
                                }
                            ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: 'black' }}>
                                    <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                </svg> <Badge variant="light"  >{this.state.noleidos}</Badge> </Link>

                            <Link to="/join" activeClassName="active" target="_blank" className="notificacion-mensajes" style={{ color: 'black' }}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-text-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                            </svg></Link>

                            

                            {JSON.parse(localStorage.getItem('user')) != null &&
                                <div className="perfil-header">
                                    <img src={JSON.parse(localStorage.getItem('user')).image} className="mini-avatar" ></img>
                                    <h1>{JSON.parse(localStorage.getItem('user')).nombre}</h1>
                                    <DropdownButton id="dropdown-basic-button" style={{ left: "auto" }, { rigth: '85%' }} className="dropdown-menu.show drop-menu-peril"
                                        show={this.state.show}
                                        onMouseEnter={this.showDropdown}
                                        onMouseLeave={this.hideDropdown}
                                    >
                                        <Link to="/user/profile" className="drop-link">Perfil</Link>
                                        <Link to="/user/edit" className="drop-link">Editar Perfil</Link>
                                        <Link to="/user/erasmus" className="drop-link">Erasmus</Link>
                                        <Link to="/user/seguridad" className="drop-link">Constraseña</Link>
                                        <Link to="/solicitar_baja" className="drop-link">Solicitar baja</Link>
                                        <Link onClick={() => this.setState({ navigate: true })} className="drop-link"> Cerrar Sesion</Link>
                                    </DropdownButton>
                                </div>
                            }

                        </nav>

                        <nav /*id="menu"*/ id="menuvar-responsive">
                            <ul >
                                <li >
                                    <NavLink exact to="/inicio" activeClassName="active" > HOME </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/informacion" activeClassName="active" onClick={this.botonmenu}>    INFORMACIÓN </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/documentos" activeClassName="active" onClick={this.botonmenu}> DOCUMENTOS </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/nube" activeClassName="active" onClick={this.botonmenu}>  NUBE COMPARTIDA </NavLink >
                                </li>
                                <li>
                                    <div className="dropdown">
                                        <button className="dropbtn">PERFIL</button>
                                        <div class="dropdown-content">
                                            <Link to="/user/profile" className="drop-link" onClick={this.closemenu}>Perfil</Link>
                                            <Link to="/user/edit" className="drop-link" onClick={this.closemenu}>Editar Perfil</Link>
                                            <Link to="/user/erasmus" className="drop-link" onClick={this.closemenu}>Erasmus</Link>
                                            <Link to="/user/seguridad" className="drop-link" onClick={this.closemenu}>Constraseña</Link>
                                            <Link to="/solicitar_baja" className="drop-link" onClick={this.closemenu}>Solicitar baja</Link>


                                        </div>
                                    </div>
                                </li>
                                <br /><br /><br /><br />
                                <li>
                                    <Link onClick={() => this.setState({ navigate: true })} className="drop-link"> <FaSignOutAlt />  Cerrar Sesion</Link>
                                </li>


                            </ul>


                        </nav>


                    </div>

                }{this.state.identity.tipo === 'profesor' &&

                    <div className="menu">
                        <nav /*id="menu"*/ id="menuvar">

                            <ul >

                                <li >
                                    <NavLink exact to="/inicio" activeClassName="active">{/*<span className="glyphicon glyphicon-home"></span> */}  HOME  </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/informacion" activeClassName="active">    INFORMACIÓN </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/Alumnos" activeClassName="active"> ALUMNOS </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/mi_nube" activeClassName="active">   MI NUBE </NavLink >
                                </li>




                            </ul>

                            <Link
                                label="Mensajes"
                                variant="primary"
                                className="notificacion-mensajes"

                                to={
                                    '/mensajes'
                                }
                            > <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: 'black' }}>
                                    <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                </svg> <Badge variant="light" >{this.state.noleidos}</Badge> </Link>

                            <Link className="notificacion-mensajes" style={{ color: 'black' }} to="/join" activeClassName="active" title="iniciar chat" target="_blank" >
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-text-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                                </svg>
                            </Link>
                            {JSON.parse(localStorage.getItem('user')) != null &&
                                <div className="perfil-header">

                                    <img src={JSON.parse(localStorage.getItem('user')).image} className="mini-avatar" ></img>
                                    <h1>{JSON.parse(localStorage.getItem('user')).nombre}</h1>
                                    <DropdownButton id="dropdown-basic-button" style={{ left: "auto" }, { rigth: '85%' }} className="dropdown-menu.show"
                                        show={this.state.show}
                                        onMouseEnter={this.showDropdown}
                                        onMouseLeave={this.hideDropdown}>
                                        <Link to="/user/profile" className="drop-link">Perfil</Link>
                                        <Link to="/user/edit" className="drop-link" >Editar Perfil</Link>
                                        <Link to="/profesor/erasmus" className="drop-link">Erasmus</Link>
                                        <Link to="/user/seguridad" className="drop-link">Constraseña</Link>
                                        <Link onClick={() => this.setState({ navigate: true })} className="drop-link">Cerrar Sesion</Link>
                                    </DropdownButton>
                                </div>
                            }



                        </nav>

                        <nav /*id="menu"*/ id="menuvar-responsive">
                            <ul >
                                <li >
                                    <NavLink exact to="/inicio" activeClassName="active" onClick={this.botonmenu}> HOME </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/informacion" activeClassName="active" onClick={this.botonmenu}>    INFORMACIÓN </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/Alumnos" activeClassName="active" onClick={this.botonmenu}> ALUMNOS </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/mi_nube" activeClassName="active" onClick={this.botonmenu}>   MI NUBE </NavLink >
                                </li>
                                <li>
                                    <div className="dropdown">
                                        <button className="dropbtn">PERFIL</button>
                                        <div class="dropdown-content">
                                            <Link to="/user/profile" className="drop-link" onClick={this.botonmenu}>Perfil</Link>
                                            <Link to="/user/edit" className="drop-link" onClick={this.botonmenu}>Editar Perfil</Link>
                                            <Link to="/profesor/erasmus" className="drop-link" onClick={this.botonmenu}>Erasmus</Link>
                                            <Link to="/user/seguridad" className="drop-link" onClick={this.botonmenu}>Constraseña</Link>

                                        </div>
                                    </div>
                                </li>
                                <br /><br /><br /><br />
                                <li>
                                    <Link onClick={() => this.setState({ navigate: true })} className="drop-link"> <FaSignOutAlt />  Cerrar Sesion</Link>
                                </li>


                            </ul>


                        </nav>
                    </div>
                }{
                    this.state.identity.tipo === "administrador" &&

                    <div className="menu">
                        <nav /*id="menu"*/ id="menuvar">

                            <ul >
                                <li >
                                    <NavLink exact to="/inicio" activeClassName="active">{/*<span className="glyphicon glyphicon-home"></span> */}  HOME  </NavLink>
                                </li>
                            </ul>

                            <div class="dropdown">
                                <button class="dropbtn">DESTINOS</button>
                                <div class="dropdown-content">
                                    <Link to="/destinos" className="drop-link">Nuevo destino</Link>
                                    <Link to="/editar-destinos" className="drop-link">Editar destinos</Link>
                                    <Link to="/borrar-destinos" className="drop-link">Borrar destinos</Link>
                                    <Link to="/listar-destinos" className="drop-link">Ver destinos</Link>
                                </div>
                            </div>

                            <div class="dropdown">
                                <button class="dropbtn">GESTIÓN PROFESORES</button>
                                <div class="dropdown-content">
                                    <Link to="/dar_de_baja" className="drop-link">Baja profesor</Link>
                                    <Link to="/cambiar-coordinador" className="drop-link"> Cambiar coordinador de centro</Link>

                                </div>
                            </div>

                            <Link
                                label="Mensajes"

                                variant="primary"
                                className="notificacion-mensajes"
                                to={
                                    '/mensajes'
                                }
                            > <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: 'black' }}>
                                    <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                </svg> <Badge variant="light" >{this.state.noleidos}</Badge> </Link>

                            <Link className="notificacion-mensajes" style={{ color: 'black' }} to="/join" activeClassName="active" title="iniciar chat" target="_blank" >
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-text-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                                </svg>
                            </Link>

                            {JSON.parse(localStorage.getItem('user')) != null &&
                                <div className="perfil-header">

                                    <img src={JSON.parse(localStorage.getItem('user')).image} className="mini-avatar" ></img>
                                    <h1>{JSON.parse(localStorage.getItem('user')).nombre}</h1>
                                    <DropdownButton id="dropdown-basic-button" style={{ left: "auto" }, { rigth: '85%' }} className="dropdown-menu.show"
                                        show={this.state.show}
                                        onMouseEnter={this.showDropdown}
                                        onMouseLeave={this.hideDropdown}>
                                        <Link to="/user/profile" className="drop-link">Perfil</Link>
                                         <Link to="/user/edit" className="drop-link">Editar Perfil</Link>
                                        {/*   <Link to="/user/erasmus" className="drop-link">Erasmus</Link>*/}
                                        <Link to="/user/seguridad" className="drop-link">Constraseña</Link>
                                        {/*   <Link to="/solicitar_baja" className="drop-link">Solicitar baja</Link>*/}
                                        <Link onClick={() => this.setState({ navigate: true })} className="drop-link">Cerrar Sesion</Link>
                                    </DropdownButton>
                                </div>
                            }



                        </nav>

                        <nav /*id="menu"*/ id="menuvar-responsive">
                            <ul >
                                <li >
                                    <NavLink exact to="/inicio" activeClassName="active"> HOME </NavLink>
                                </li>
                                <li>
                                    <div class="dropdown">
                                        <button class="dropbtn">DESTINOS</button>
                                        <div class="dropdown-content">
                                            <Link to="/destinos" className="drop-link" onClick={this.botonmenu}>Nuevo destino</Link>
                                            <Link to="/editar-destinos" className="drop-link" onClick={this.botonmenu}>Editar destinos</Link>
                                            <Link to="/borrar-destinos" className="drop-link" onClick={this.botonmenu}> Borrar destinos</Link>
                                            <Link to="/listar-destinos" className="drop-link" onClick={this.botonmenu}>Ver destinos</Link>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown">
                                        <button class="dropbtn">GESTIÓN PROFESORES</button>
                                        <div class="dropdown-content">
                                            <Link to="/dar_de_baja" className="drop-link" onClick={this.botonmenu}>Baja profesor</Link>
                                            <Link to="/cambiar-coordinador" className="drop-link" onClick={this.botonmenu}> Cambiar coordinador de centro</Link>

                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="dropdown">
                                        <button className="dropbtn">PERFIL</button>
                                        <div class="dropdown-content">
                                            <Link to="/user/profile" className="drop-link" onClick={this.botonmenu}>Perfil</Link>
                                               <Link to="/user/edit" className="drop-link" onClick={this.botonmenu}>Editar Perfil</Link>
                                            {/*   <Link to="/user/erasmus" className="drop-link" onClick={this.botonmenu}>Erasmus</Link>*/}
                                            <Link to="/user/seguridad" className="drop-link" onClick={this.botonmenu}>Constraseña</Link>



                                        </div>
                                    </div>
                                </li>
                                <br /><br /><br /><br />
                                <li>
                                    <Link onClick={() => this.setState({ navigate: true })} className="drop-link"> <FaSignOutAlt />  Cerrar Sesion</Link>
                                </li>

                            </ul>


                        </nav>
                    </div>
                }
                <div className="clearfix"></div>

            </header>
        );
    }
}

export default Header;