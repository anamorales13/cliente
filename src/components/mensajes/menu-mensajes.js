import React, { Component } from 'react';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';

import "../../assets/css/mensajeria.css";

class MenuMensajes extends Component {
    render() {

        return (
                              
            <div className="menu-perfil menu-mensaje">
                
                <nav> <ul>
                    <li>
                        <NavLink exact to="/mensajes/enviar" activeClassName="active" style={{borderBottom:'1px solid grey'}}>  Enviar mensaje</NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/mensajes" activeClassName="active" style={{borderBottom:'1px solid grey'}}> Recibidos </NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/enviados" activeClassName="active" style={{borderBottom:'1px solid grey'}}>  Enviados </NavLink >
                    </li>
                </ul>
                </nav>
            </div>
        
        );
    }


}



export default MenuMensajes;








