import React, { Component } from 'react';
import imagen from '../assets/images/world-map-146505_1280.png';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

class Slider extends Component {

    state = {
        identity: JSON.parse(localStorage.getItem('user'))
    }

    render() {


        if (this.state.identity.tipo === "administrador") {
            return (

                <div>
                    <div id="slider" className="slider-big">
                        <img src={imagen} alt="Pantalla principal" style={{ width: '60%' }} />
                    </div >

                    <div className="grid-inicio-botones">
                        <div>
                            <Card className="inicio-botones" style={{backgroundColor:'#7BDE85'}}>
                                <Card.Body>
                                    <Card.Title>Gestión destinos</Card.Title>
                                    <Card.Text>
                                        Gestiona los destinos: edita, añade y elimina.
                            </Card.Text>
                                    <br></br>
                                    <div style={{display:'block'}}>
                                    <Link to="/destinos" className="boton-sin-deco">Nuevo destino
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg></Link>
                                        <Link to="/borrar-destinos" className="boton-sin-deco">Eliminar destino
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg></Link>
                                        <Link to="/editar-destinos" className="boton-sin-deco">Editar destino
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg></Link>
                                        <Link to="/listar-destinos" className="boton-sin-deco">Listar destino
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg></Link>
                                        </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <Card className="inicio-botones" style={{backgroundColor:'#98C6EB'}}>
                                <Card.Body>
                                    <Card.Title>Gestión del profesorado</Card.Title>
                                    <Card.Text>
                                        Gestión del profesorado: 
                         </Card.Text>
                         <div>
                         <Link to="/dar_de_baja" className="boton-sin-deco">Baja profesor
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg></Link>
                         <Link to="/cambiar-coordinador" className="boton-sin-deco">Modificar coordinador de centro
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg></Link>
                                       
                         </div>
                                    
                                </Card.Body>

                            </Card>
                        </div>
                        <div>
                            <Card className="inicio-botones">
                                <Card.Body>
                                    <Card.Title>Horario</Card.Title>
                                    <Card.Text>
                                        Horario de atención al público: 10:00 - 13:00 h
                            </Card.Text>

                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                </div>
            );
        }
        else {
            return (

                <div>

                    <div id="slider" className="slider-big">
                        <img src={imagen} alt="Pantalla principal" style={{ width: '60%' }} />
                    </div >

                    <div className="grid-inicio-botones">
                        <div>
                            <Card className="inicio-botones" style={{backgroundColor:'#EEEEEE'}} >
                                <Card.Body>
                                    <Card.Title>¿Quiénes somos?</Card.Title>
                                    <Card.Text>
                                        Encuentra toda la información necesaria (correos, telefonos...) del departamento de relaciones internacionales
                            </Card.Text>
                                    <br></br>
                                    <Link to="/quienes-somos" className="boton-sin-deco">ver
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg></Link>
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <Card className="inicio-botones" style={{backgroundColor:'#CCD5CD'}}>
                                <Card.Body>
                                    <Card.Title>¿Dónde estamos?</Card.Title>
                                    <Card.Text>
                                        El Servicio de Relaciones Internacionales se encuentra en el Campus El Carmen,
                                        en el edificio "Juan Agustín de Mora" (pabellón Nº13), justo al lado del Comedor Universitario.
                         </Card.Text>
                                    <Link to="/donde-estamos" className="boton-sin-deco">más información
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg></Link>
                                </Card.Body>

                            </Card>
                        </div>
                        <div>
                            <Card className="inicio-botones" style={{backgroundColor:'#B3B9B3'}}>
                                <Card.Body>
                                    <Card.Title>Horario</Card.Title>
                                    <Card.Text>
                                        Horario de atención al público: 10:00 - 13:00 h
                            </Card.Text>

                                </Card.Body>
                            </Card>
                        </div>

                    </div>


                </div>

            );
        }
    }

}


export default Slider;