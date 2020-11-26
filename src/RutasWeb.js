import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
import Inicio from './components/Inicio';
import Informacion from "./components/Informacion";
import Header from './components/Header';
import Footer from './components/Footer';
import Documento from './components/DocumentoOficial';
import Dropbox from './components/Dropbox';
import MiPerfil from './components/views/MiPerfil';
import EditPerfil from './components/views/EditPefil';
import RutasInicio from './Rutas';
import PasswordEdit from './components/views/PasswordEdit';
import perfilErasmus from './components/views/perfilErasmus';
import erasmus from './components/views/erasmus';
import './assets/css/App.css';
import enviar from './components/mensajes/enviar';
import recibidos from './components/mensajes/recibidos';
import enviados from './components/mensajes/enviados';
import mensaje from './components/mensajes/mensaje'
import Alumnos from './components/Alumnos';
import mydropbox from './components/mydropbox';
import quienes from './components/inicio/quienes-somos';
import donde from './components/inicio/donde-estamos';
import destinos from './components/admin/destinos';
import profesores from './components/admin/gestionProfesores';
import editardestino from './components/admin/editDestinos';
import borrardestino from './components/admin/borrardestino';
import baja from './components/baja';
import coordinador from './components/admin/coordinador';
import deleteProfesor from './components/admin/deleteProfesor';
import responder from './components/mensajes/responder';

import pruebas from './components/prueba';

class Rutas extends Component {

    render() {

        var user;
        return (
            <BrowserRouter>
               <div className="grid-general" >
                    <Header />
                    <div /*className="container"*/>
                        <Switch>
                            <Route exact path="/inicio" component={Inicio} />
                            <Route exact path="/informacion" component={Informacion}></Route>
                            <Route exact path="/documentos/:id?" component={Documento}></Route>
                            <Route exact path="/nube/:id?/:nombre?/:apellido1?/:apellido2?" component={Dropbox}></Route>
                            <Route exact path="/mi_nube" component={mydropbox}></Route>
                            <Route exact path="/user/profile/:id?" component={MiPerfil}></Route>
                            <Route exact path="/user/edit" component={EditPerfil}></Route>
                            <Route exact path="/user/erasmus" component={perfilErasmus}/>
                            <Route exact path="/profesor/erasmus" component={erasmus}/>
                            <Route exact path="/user/seguridad" component={PasswordEdit}></Route>
                            <Route exact path="/mensajes" component={recibidos} />
                            <Route exact path="/mensajes/enviar" component={enviar}/>
                            <Route exact path="/responder/:id" component={responder}/>
                            <Route exact path="/mensajes/:id" component={mensaje}></Route>
                            <Route exact path="/enviados" component={enviados}/>
                            <Route exact path="/Alumnos" component={Alumnos} />
                            <Route exact path="/quienes-somos" component={quienes}/>
                            <Route exact path="/donde-estamos" component={donde}/>
                            <Route exact path="/destinos" component={destinos}/>
                            <Route exact path="/gestino-profesores" component={profesores}/>
                            <Route exact path="/editar-destinos" component={editardestino}/>
                            <Route exact path="/borrar-destinos" component={borrardestino}/>
                            <Route exact path="/solicitar_baja" component={baja}/>
                            <Route exact path="/cambiar-coordinador" component={coordinador} />
                            <Route exact path="/dar_de_baja" component={deleteProfesor}/>

                          
                           
                            <RutasInicio />
                            {/*  <Route exact path="/" component={InicioSesion}/> */}
                            {/*} <Route exact path="/inicioSesion" component={InicioSesion}/>*/}


                        </Switch>
                    </div >
                    <div className="clearfix">
                      
                    </div>
                    

                </div>

            </BrowserRouter>

        );
    }
}


export default Rutas;