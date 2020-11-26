import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class donde extends Component {

    state = {
        user: {}
    }



    render() {
        return (
            <div >

                <h1 className="titulo-doc">Donde estamos</h1>
                <div className="quienes-somos" >
                    <div style={{width:'1000px', margin:'auto'}}>

                    <h4 style={{marginTop:'30px'}}>El Servicio de Relaciones Internacionales se encuentra en el Campus El Carmen, en el edificio "Juan Agustín de Mora" (pabellón Nº13),
                   justo al lado del Comedor Universitario.</h4>
            <br/><br/>
                    <h5>
                        Si se entra al edificio por la cara que da al Comedor Universitario,
             es el pasillo de planta baja que está a la derecha.</h5>
             <br/><br/>
                    <h5>En dicho pasillo se encuentran todo el personal del servicio. </h5>

                    <div className="donde-estamos">
                        <p>Pabellón Juan Agustín de Mora</p>
                        <p>Campus El Carmen</p>
                        <p>Avda. Fuerzas Armadas, s/n</p>
                        <p>21007 - Huelva</p>
                        </div>
                    </div>

                    <img style={{marginTop: '25px'}} src='https://www.huelvainformacion.es/2020/07/04/huelva/facultades-Campus-Carmen-Universidad-Huelva_1479762213_123442891_667x375.jpg'/>
                </div>
            </div>

        );
    }
}

export default donde;