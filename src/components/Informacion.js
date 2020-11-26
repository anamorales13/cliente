import React, { Component } from 'react';
import Sidebar from './Sidebar';
import imagen from '../assets/images/Ayuda-Estrella.png';
import Header from './Header';

class Informacion extends Component {
    render() {
        return (
            <div  className="informacion">
                <h1 className="titulo-doc"> INFORMACIÓN </h1>
                <div className="ayuda">
                        <img src={imagen} alt="Ayuda" />
                        <a href="http://www.uhu.es/sric/uploads/2019/05/paso_a_paso_E_19-20.pdf" target="_blanck">¡Ayuda! Paso a Paso </a>
                    </div>
                <div className="grid-informacion">

                    <div>
                        <h2> Antes de la movilidad </h2>

                        <ul>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/Modelo_renuncia_19-20.pdf" target="_blank"> Modelo de renuncia</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/Fechas-limites.pdf" target="_blank">Fechas limite</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/CPRA_1920.doc" target="_blank">CPRA</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/Learning_Agreement_1920.doc" target="_blank">Learning agreement</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2017/04/docs_Codigos_erasmus.pdf" target="_blank">Códigos Erasmus</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2017/04/docs_codigosCINE.pdf" target="_blank">Códigos CINE 2013</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/Steps_to_fill_in_the_learning_agreement.pdf" target="_blank">Pasos para rellenar el Learning agreement</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/Justificacion_creditos_erasmus.pdf" target="_blank">Justificación de exceso de créditos Erasmus</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/Plantilla_Extrato_notas_ingles_19-20.pdf" target="_blank">Extracto de notas</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                    <h2> Durante la movilidad</h2>
                        <ul>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/Certificado_estancia.pdf" target="_blank">Certificado de estancia</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/CPRA_Mod_1920.doc" target="_blank">Modificacioón CPRA</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/LA_Mod_1920.doc" target="_blank">Modificación Learning agreement</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/Solicitud-ampliacion-reduccion-estancia.pdf" target="_blank">Solicitud Ampliación/Reducción de Estancia</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                    <h2> Después de la movilidad</h2>
                        <ul>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/LA_after_mobility.doc" target="_blank">Learning agreement after the mobility (Transcript)</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/Reconocimientos_Estudios.pdf" target="_blank">Solicitud Reconocimiento de Estudios</a>
                            </li>
                            <li>
                                <a href="http://www.uhu.es/sric/uploads/2019/03/ACTA_RECONOCIMIENTO.pdf" target="_blank">Acta de Reconocimiento</a>
                            </li>
                        </ul>
                    </div>
                </div>




            </div>

        );
    }


}


export default Informacion;