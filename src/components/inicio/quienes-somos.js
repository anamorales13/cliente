import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class quienessomos extends Component {

    state = {
        user: {}
    }



    render() {
        return (
            <div>
                <h1 className="titulo-doc">¿Quienes somos?</h1>
                <div style={{ marginTop: '35px' }} className="quienes-somos">
                    <h3> <strong>Directora de Proyección Internacional y Movilidad </strong></h3>
                    <p>
                        <h4 style={{ color: 'grey' }}>Prof. Dra. Mª Teresa Aceytuno Pérez</h4>
                        <h5>direccion.internacionales@uhu.es</h5>
                        <h5>+34 646 13 65 41</h5>
                    </p>
                    <hr></hr>
                </div>
                <div style={{ marginTop: '25px' }} className="quienes-somos">
                    <h3> <strong>Director de Cooperación Internacional</strong></h3>
                    <p>
                        <h4 style={{ color: 'grey' }}>Prof. Dr. Francisco Marín Pageo</h4>
                        <h5>direccion.cooperacion@uhu.es</h5>
                        <h5>+34 689 17 58 62</h5>
                    </p>
                    <hr></hr>
                </div>
                <div style={{ marginTop: '25px' }} className="quienes-somos">
                    <h3> <strong>Responsable de Unidad de RR.II.</strong></h3>
                    <p>
                        <h4 style={{ color: 'grey' }}>Dª Inmaculada Martínez López</h4>
                        <h5>inmacu@uhu.es</h5>
                        <h5>+34 959 21 91 69</h5>
                    </p>

                </div>
                <div style={{ marginTop: '25px' }} className="quienes-somos">
                    <h3> <strong>Jefe de Negociado de RR.II.</strong></h3>
                    <p>
                        <h4 style={{ color: 'grey' }}> D. Eulogio Toscano Recamales</h4>
                        <h5>eulogio@uhu.es</h5>
                        <h5>drinter08@sc.uhu.es</h5>
                        <h5>959219453</h5>
                    </p>
                    <p>
                        <h4 style={{ color: 'grey' }}> D. Juan Carlos Jara Reyes Técnico Grado Superior</h4>
                        <h5>carlos.jara@sc.uhu.es| drinter12@sc.uhu.es</h5>
                        <h5>+34 959 21 99 32</h5>
                    </p>
                    <hr />

                </div>
                <div style={{ marginTop: '25px' }} className="quienes-somos">
                    <h3> <strong> Administrativos</strong></h3>
                    <p>
                        <h4 style={{ color: 'grey' }}>Dª Susana Díaz Fernández</h4>
                        <h5>susana.diaz@sc.uhu.es</h5>
                        <h5>+34 959 21 94 95</h5>
                    </p>
                    <p>
                        <h4 style={{ color: 'grey' }}>Dª Conchi Gómez Álvarez</h4>
                        <h5>concepcion.gomez@sc.uhu.es</h5>
                        <h5>+34 959 21 91 67</h5>
                    </p>
                    <p>
                        <h4 style={{ color: 'grey' }}>Dª Olga Núñez Prieto</h4>
                        <h5>drinter03@sc.uhu.es</h5>

                    </p>
                    <p>
                        <h4 style={{ color: 'grey' }}>Dª María Luz Capelo Álvarez</h4>
                        <h5>drinter09@sc.uhu.es</h5>
                        <h5>959219496</h5>

                    </p>
                    <hr />
                </div>
                <div style={{ marginTop: '25px' }} className="quienes-somos">
                    <h3> <strong>Contactos</strong></h3>
                    <p>
                        <h4 style={{ color: 'grey' }}>Para movilidad internacional de estudiantes UHU-OUTGOING</h4>
                        <h4 style={{ color: 'grey' }}>Dª Rosario Alamillo Granados</h4>
                        <h5>drinter01@sc.uhu.es</h5>
                        <h5>+34 959 21 96 40</h5>
                    </p>
                    <p>
                        <h4 style={{ color: 'grey' }}>Para estudiantes internacionales-INCOMING</h4>
                        <h4 style={{ color: 'grey' }}>D. Juan José Gómez Boullosa</h4>
                        <h5>drinter02@sc.uhu.es</h5>
                        <h5>+34 959 21 94 94</h5>
                    </p>
                    <p>
                        <h4 style={{ color: 'grey' }}>Para acuerdos bilaterales, movilidad PDI y PAS UHU- INCOMING,</h4>
                        <h4 style={{ color: 'grey' }}>Semana Internacional de la UHU</h4>
                        <h4 style={{ color: 'grey' }}>Dª Claire Martin</h4>
                        <h5>drinter06@sc.uhu.es</h5>
                        <h5>959218237</h5>
                    </p>
                    <p>
                        <h4 style={{ color: 'grey' }}>Becario/a del Servicio Técnico Informático</h4>
                       
                        <h5>drinter04@sc.uhu.es</h5>
                        <h5>959219436</h5>
                    </p>
                    <hr/>

                </div>
                <div style={{ marginTop: '25px' }} className="quienes-somos">
                    <h3> <strong>Dirección Postal</strong></h3>
                    <p>
                        <h4 style={{ color: 'grey' }}>Servicio de Relaciones Internacionales</h4>
                        <h4 style={{ color: 'grey' }}>Edificio Juan Agustín de Mora y Garrocho. Campus «El Carmen»</h4>
                        <h4 style={{ color: 'grey' }}>Avda. Fuerzas Armadas, s/n. 21007 Huelva</h4>
                        <h5>drinter@uhu.es</h5>
                      
                    </p>

                </div>
            </div>

        );
    }
}

export default quienessomos;