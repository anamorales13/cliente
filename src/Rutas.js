import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';

import RutasWeb from './RutasWeb';
import InicioSesion from './components/InicioSesion';
import InicioAdministrador from './components/InicioAdministrador';
import pantallaInicial from './components/pantallaInicial';
import Userform from './components/newUser/Userform';
import UseformProfesor from './components/newUser/UseformProfesor';
import Chat from './components/chat/Chat';
import Join from './components/chat/Join';


class Rutas extends Component {
    render() {
        return (
           

                <BrowserRouter>

                    <Switch>
                        <Route exact path="/" component={pantallaInicial} />
                        <Route exact path="/inicioSesion" component={InicioSesion} />
                        <Route exact path="/nuevoUsuario" component={Userform} />
                        <Route exact path='/nuevoProfesor' component={UseformProfesor} />
                        <Route exact path='/inicioAdministrador' component={InicioAdministrador} />

                        <Route exact path="/chat" component={Chat} />
                        <Route exact path="/join" component={Join} />
                        <RutasWeb />


                    </Switch>
                    <div className="clearfix"></div>
                </BrowserRouter>
           
        );
    }
}


export default Rutas;