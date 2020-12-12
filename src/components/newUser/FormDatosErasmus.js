import React, { Component } from 'react';

import imagenlogo from '../../assets/images/logo-erasmus.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReactPaginate from "react-paginate";
import Spinner from 'react-bootstrap/Spinner';
import Global from '../../Global';

export class FormDatosErasmus extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();

    }

    url= Global.url;

    state = {
        destinos: [],
        alumno: {},
        status: "",
        pages:"",
        currentPage:0,
        mensajesPerPage: 5,
        offset: 0,
    }



    constructor(props) {
        super(props);
        this.listarDestinos();
        
    }

    listarDestinos =(e) => {
        var pages= this.state.currentPage+1;
     

        axios.get('https://plataforma-erasmus.herokuapp.com/apiDestino/destinos/' + pages)
            .then(res => {
                this.setState({
                    destinos: res.data.destino,
                    pages: res.data.pages

                });
              
            });

    }

    componentDidMount(){
        this.listarDestinos();
    }

 


    guardarDestino(alumno, update, profesor, coordinador) {

        var body = {
            destino: update
        }
        var body2 = {
            profesor: profesor,
            coordinador: coordinador
        }
        var body3 = {
            alumno: alumno
        }
        var mensaje = {
            asunto: 'Nueva notificación Plataforma Erasmus+',
            texto: 'Se ha añadido un nuevo alumno'
                + '  Puede obtener más información en el apartado de ALUMNOS. ',
            emisor: { profesor: '5fbbfde011838fd11fac5944' },
            receptor: { profesor: profesor }
        }
        var mensaje2={
            asunto: 'Nueva notificación Plataforma Erasmus+',
            texto: 'Se ha añadido un nuevo alumno'
                + '  Puede obtener más información en el apartado de ALUMNOS. ',
            emisor: { profesor: '5fbbfde011838fd11fac5944' },
            receptor: { profesor: coordinador }
        }

        axios.put('https://plataforma-erasmus.herokuapp.com/apiErasmus/savedestino/' + alumno, body)
            .then(res => {
                this.setState({
                    alumno: res.data.alumno
                })
                axios.put('https://plataforma-erasmus.herokuapp.com/apiErasmus/saveprofesor/' + alumno, body2)
                    .then(res => {
                        this.setState({
                            alumno: res.data.alumno,
                            status: 'sucess'
                        })
                        console.log("Done")

                    })
                    console.log("mensaje");
          
                    this.notificarProfesor(profesor);
                    this.notificarProfesor(coordinador);
                   
                    var elem = document.getElementById('btn-continuar');
                    elem.style.display = 'block';

            })


    }


    notificarProfesor = (prof) => {

        var mensaje = {
            asunto: 'Alta de un nuevo alumno',
            texto: 'Se ha añadido un nuevo alumno'
                + '  Puede obtener más información en el apartado de ALUMNOS. ',
            emisor: { profesor: '5fbbfde011838fd11fac5944' },
            receptor: { profesor: prof }
        }

        axios.post('https://plataforma-erasmus.herokuapp.com/api/mensaje', mensaje)
            .then(res => {
                this.setState({
                    nuevoMensaje: res.data.mensaje,
                    status: 'sucess',
                });
            })
            .catch(err => {
                this.setState({
                    status: 'failed'
                });
            });
    }

    handlePageClick = mensajes => {
       
        const selectedPage = mensajes.selected;
        const offset = selectedPage * this.state.mensajesPerPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
      
       }, () => 
            this.listarDestinos());
        
    }

    


    render() {
        let paginationElement;

        if (this.state.pages > 1) {
            paginationElement = (
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={this.state.pages}
                    onPageChange={this.handlePageClick}
                    forcePage={this.state.currentPage}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-link"}
                    previousClassName={"page-link"}
                    previousLinkClassName={"page-item"}
                    nextClassName={"page-link"}
                    nextLinkClassName={"page-item"}
                    disabledClassName={"disabled"}
                    activeClassName={"page-item active"}
                    activeLinkClassName={"page-link"}
                />
            )
}

        const { values, handleChange, tipo } = this.props;


        const listarDestinos = this.state.destinos.map((destino) => {
            return (

                <div>
                    {tipo == 'alumno' &&
                        <table>
                            <tbody style={{overflow:'scroll'}}>
                                <tr>
                                    <td className="th-pequeño">
                                        {destino.pais}
                                    </td>
                                    <td className="th-pequeño">
                                        {destino.ciudad}
                                    </td>
                                    <td>
                                        {destino.carrera}
                                    </td>
                                    <td>
                                        {destino.profesor.nombre + " " + destino.profesor.apellido1 + " " + destino.profesor.apellido2}
                                    </td>
                                    <td className="th-pequeño">
                                        <button
                                            className="btn-continue btn-seleccionar"
                                            onClick={() => this.guardarDestino(values.alumno._id, destino._id, destino.profesor._id, destino.coordinador._id)}
                                        >seleccionar</button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    }
                </div>
            )
        })
        return (
            <div className="grid-inicio">
                <div className="logo-titulo">
                    <img src={imagenlogo} width="100px" height="80px"></img>
                    <div className="titulo-completo">
                        <h3>Universidad de Huelva</h3>
                        <h1> ERASMUS+ </h1>
                    </div>
                </div>
                <hr className="linea"></hr>

                <div className="registro-nuevoUsuario">
                    <h1 className="titulo titulo-registro "> ALTA DE ALUMNO/A</h1>
                    <h1 className="titulo titulo-registro titulo-registro-secundario"> DATOS ERASMUS </h1>
                    <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>
                    <Link to="/" className="link-cancelar">Cancelar registro de usuario</Link><br />
                    <div>
                        {this.state.status == 'sucess' &&
                            <div className="alert alert-success alert-sucess-middle">

                                <strong>¡Destino guardado correctamente!</strong>
                                <h5>Pulse <strong>CONTINUAR</strong> para completar el alta de usuario</h5>
                                <button classsName="close" data-dismiss="alert"> <span>&times;</span></button>
                            </div>

                        }
                        {this.state.status == 'failed' &&
                            <div className="alert alert-danger">

                                <strong>¡Error!</strong> El destino no se pudo guardar correctamente
                            <button classsName="close" data-dismiss="alert"> <span>&times;</span></button>
                            </div>
                        }
                    </div>
                    {/* NUEVOOOOO TABLAS */}
                  
                    <table >
                        <thead className="cabecera" >
                            <tr style={{background:'white'}}>
                                <th className="th-pequeño">Pais</th>
                                <th className="th-pequeño">Ciudad</th>
                                <th>Especialidad</th>
                                <th>Coordinador</th>
                            </tr>
                        </thead>
                       
                    </table>
                    {listarDestinos}
                      {paginationElement}
                    
                    <table>
                        <tbody>
                    <button
                        label="continue"
                        className="btn-continue form-login"
                        style={styles.button, styles.desaparecer}
                        onClick={this.continue}
                        id="btn-continuar"
                    > CONTINUAR </button>
                    <button
                        label="volver"
                        className="btn-back form-login"
                        style={styles.button}
                        onClick={this.back}
                    > VOLVER </button>
                    </tbody>
                    </table>

                    

                </div>
              

            </div>
        );

    }
}

const styles = {
    button: { margin: 15 },
    desaparecer: {display: 'none'}
}

export default FormDatosErasmus;