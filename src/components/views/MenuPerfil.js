import React, { Component } from 'react';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';

class MenuPerfil extends Component {
    render() {

        return (
            <div className="menu-perfil">
                <nav> <ul>
                    <li>
                        <NavLink exact to="/user/profile" activeClassName="active"> <span className="glyphicon glyphicon-user"></span> Perfil</NavLink >
                    </li>
                    <li>
                        <span className="glyphicon glyphicon-pencil"></span>
                        <NavLink exact to="/user/edit" activeClassName="active">   Editar Perfil </NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/user/seguridad" activeClassName="active"> <span className="glyphicon glyphicon-lock"></span> Cambiar Contraseña </NavLink >
                    </li>
                    {JSON.parse(localStorage.getItem('user')).tipo==='Alumno' 
                     ? ( <li>
                        <NavLink exact to="/user/erasmus" activeClassName="active"> <span className="glyphicon glyphicon-globe"/> Erasmus</NavLink >
                    </li> ): (
                        <li>
                        <NavLink exact to="/profesor/erasmus" activeClassName="active"> <span className="glyphicon glyphicon-globe"/> Erasmus</NavLink >
                    </li>

                    ) }
                   

                </ul>
                </nav>
            </div>
        );
    }


}



export default MenuPerfil;