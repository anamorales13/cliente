import React, { Component } from 'react';

import Menu from './menu-mensajes';
import Global from '../../GlobalMensaje';
import axios from 'axios';
import GlobalPerfil from '../../Global';
import Moment from 'react-moment';
import Card from 'react-bootstrap/Card';
import ReactPaginate from "react-paginate";
import { Link, Redirect } from 'react-router-dom';

import {FaTelegramPlane, FaEnvelope, FaEnvelopeOpenText} from 'react-icons/fa';
class enviados extends Component {
    url = Global.url;
    state = {
        title: 'Mensajes enviados',
        mensaje: [],
        profesores: [],
        identity: JSON.parse(localStorage.getItem('user')),
        status: 'false',
        nuevoMensaje: {},
        pages:"",
        currentPage:0,
        mensajesPerPage: 5,
        offset: 0,
    }

    componentWillMount() {

        this.getMessage();
    }

   
    urlprofesor = Global.urlprofesor;


    getMessage = (e) => {

        var pages= this.state.currentPage+1;

        axios.get(this.url + 'messages/' + this.state.identity._id+"/"+ pages)
            .then(res => {

                this.setState({
                    mensaje: res.data.mensajes,
                    pages:res.data.pages,
                    status: 'sucess',

                });

            })
            .catch(err => {
                this.setState({
                    mensaje: {},
                    status: 'failed'
                });
            });
    }

    deleteMessage(id) {
        axios.delete(this.url + 'delete/' + id)
            .then(res => {
                this.setState({
                    eliminado: res.data.mensaje,
                    status: 'sucess',
                });
                window.location.reload(true);
            })
            .catch(err => {
                this.setState({
                    eliminado: {},
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
            this.getMessage());
        
    }

    componentDidMount() {
        this.getMessage();
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

        if (this.state.mensaje.length >= 1) {
            var listarmensajes = this.state.mensaje.map((mensajes) => {
                return (
                    <div>
                                            

                            <Card style={{ width: '70em' }} className="card-mensajes row no-gutters ">
                          
                                <Card.Img variant="left" src={ this.state.identity.image} className="image-user" />
                              
                                <Card.Body id="cardbody">
                                <Link to={'/mensajes/' + mensajes._id}>
                                    <div className="mensaje-header">
                                        {mensajes.receptor.profesor !=null &&
                                        <h4 id="mensaje-nombre">Para: {mensajes.receptor.profesor.nombre + "  " + mensajes.receptor.profesor.apellido1 + "    " + mensajes.receptor.profesor.apellido2} </h4>
                                       }
                                        {mensajes.receptor.alumno !=null &&
                                        <h4 id="mensaje-nombre">Para: {mensajes.receptor.alumno.nombre + "  " + mensajes.receptor.alumno.apellido1 + "    " + mensajes.receptor.alumno.apellido2} </h4>
                                       }
                                       
                                        <h6 className="fecha"> <Moment format="DD-MM-YYYY">{mensajes.fecha}</Moment></h6>
                                    </div>
                                    <Card.Text className="mensaje-texto">
                                    <strong>{mensajes.asunto}       </strong>
                                        {mensajes.texto}
                                    </Card.Text>
                                    </Link>
                                    <button href={"#"} className="mensaje-enlace boton-sin-estilo" onClick={() => { if (window.confirm('\n' + '¿Estas seguro de eliminar el mensaje ?')) this.deleteMessage(mensajes._id); }} >
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                                        </svg>
                                    </button>
                                </Card.Body>
                            </Card>


                        


                    </div>

                )
            })
            return (

                <div className="grid-mensajeria-col">
                    
                        <Menu />


                    <div>
                    <Link to="/mensajes/enviar" className="link-responsive" style={{backgroundColor:'#EEEEEE'}}><FaTelegramPlane/></Link>
                       <Link to='/mensajes' className="link-responsive" style={{backgroundColor:'#CCD5CD'}}><FaEnvelope></FaEnvelope></Link>
                       <Link to='/enviados' className="link-responsive" style={{backgroundColor:'#B3B9B3'}}><FaEnvelopeOpenText/></Link>

                        <h3 className="title-pantalla-mensaje">{this.state.title} </h3>
                                        
                       
                        {listarmensajes}
                        {paginationElement}

                    </div>


                </div>



            );
        } else {
            return (
                <div className="grid-mensajeria-col">
              
                    <Menu />

                   
                <div>
                <Link to="/mensajes/enviar" className="link-responsive" style={{backgroundColor:'#EEEEEE'}}><FaTelegramPlane/></Link>
                       <Link to='/mensajes' className="link-responsive" style={{backgroundColor:'#CCD5CD'}}><FaEnvelope></FaEnvelope></Link>
                       <Link to='/enviados' className="link-responsive" style={{backgroundColor:'#B3B9B3'}}><FaEnvelopeOpenText/></Link>

                    <h3 className="title-pantalla-mensaje">No hay mensajes </h3>
                    {listarmensajes}

                </div>
                </div>
        
            );

            }
        }
}


export default enviados;