import React, { Component, useEffect } from 'react';

import Menu from './menu-mensajes';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Global from '../../GlobalMensaje';
import GlobalPerfil from '../../Global';
import Moment from 'react-moment';
import ReactPaginate from "react-paginate";
import { Link, Redirect } from 'react-router-dom';



class recibidos extends Component {

    state = {
        title: 'Bandeja de entrada',
        mensaje: [],
        pages: "",
        identity: JSON.parse(localStorage.getItem('user')),
        currentPage: 0,
        elements: [], //los que cargamos en la pagina actual
        mensajesPerPage: 5,
        offset: 0,
        eliminado: {},

    }


    url = Global.url;
    urlperfil = GlobalPerfil.url;


    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })

        this.getMessage();
    }




    getMessage = () => {

        var pages = this.state.currentPage + 1;
        console.log(pages);

        axios.get(this.url + 'myMessages/' + this.state.identity._id + '/' + pages)
            .then(res => {

                this.setState({
                    mensaje: res.data.mensajes,
                    pages: res.data.pages,
                    status: 'sucess',
                });

                /* }, () => this.setElementsForCurrentPage());*/

            })
            .catch(err => {
                this.setState({
                    mensaje: {},
                    status: 'failed'
                });
            });
    }




    /* setElementsForCurrentPage() {
         let elements = this.state.mensaje.slice(this.state.offset, this.state.offset + this.state.mensajesPerPage)
         this.setState({ elements: elements });
     }*/

    handlePageClick = mensajes => {
        console.log("hola");
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


    render() {

        /*const {currentPage, mensajesPerPage, mensaje, pages} =this.state;
 
         const indexOfLastPost= currentPage * mensajesPerPage;
         const indexOfFirstPost= indexOfLastPost - mensajesPerPage;
 
         const paginate= pageNum => this.setState({ currentPage: pageNum});
         const currentPost= mensaje.slice(indexOfFirstPost, indexOfLastPost);*/

        let paginationElement;

        if (this.state.pages > 1) {
            paginationElement = (
                <ReactPaginate
                    previousLabel={"← Anterior"}
                    nextLabel={"Siguiente →"}
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
                    <div >
                        {mensajes.visto == 'true' &&


                            <Card style={{ width: '70em' }} className="card-mensajes row no-gutters ">
                                {mensajes.emisor.profesor != null &&
                                    <Card.Img variant="left" src={this.urlperfil + '/get-image-user/' + mensajes.emisor.profesor.image} className="image-user" />
                                }
                                {mensajes.emisor.alumno != null &&
                                    <Card.Img variant="left" src={this.urlperfil + '/get-image-user/' + mensajes.emisor.alumno.image} className="image-user" />
                                }

                                <Card.Body id="cardbody">
                                    <Link to={'/mensajes/' + mensajes._id}>
                                    <div className="mensaje-header">
                                        {mensajes.emisor.profesor != null &&
                                            <h4 id="mensaje-nombre">{mensajes.emisor.profesor.nombre + "  " + mensajes.emisor.profesor.apellido1 + "    " + mensajes.emisor.profesor.apellido2} </h4>
                                        }
                                        {mensajes.emisor.alumno != null &&
                                            <h4 id="mensaje-nombre">{mensajes.emisor.alumno.nombre + "  " + mensajes.emisor.alumno.apellido1 + "    " + mensajes.emisor.alumno.apellido2} </h4>
                                        }

                                        <h6 className="fecha"> <Moment format="DD-MM-YYYY">{mensajes.fecha}</Moment></h6>
                                    </div>
                                    
                                        <Card.Text className="mensaje-texto">
                                            <strong>{mensajes.asunto}        </strong>
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



                        }

                        {mensajes.visto == 'false' &&
                           
                                <Card style={{ width: '70em' }} className="card-mensaje-novisto row no-gutters ">
                                    {mensajes.emisor.profesor != null &&
                                        <Card.Img variant="left" src={this.urlperfil + '/get-image-user/' + mensajes.emisor.profesor.image} className="image-user" />
                                    }
                                    {mensajes.emisor.alumno != null &&
                                        <Card.Img variant="left" src={this.urlperfil + '/get-image-user/' + mensajes.emisor.alumno.image} className="image-user" />
                                    }
                                    <Card.Body id="cardbody">
                                    <Link to={'/mensajes/' + mensajes._id}>
                                        <div className="mensaje-header-novisto">
                                            {mensajes.emisor.profesor != null &&
                                                <h4 id="mensaje-nombre">{mensajes.emisor.profesor.nombre + "  " + mensajes.emisor.profesor.apellido1 + "    " + mensajes.emisor.profesor.apellido2} </h4>
                                            }
                                            {mensajes.emisor.alumno != null &&
                                                <h4 id="mensaje-nombre">{mensajes.emisor.alumno.nombre + "  " + mensajes.emisor.alumno.apellido1 + "    " + mensajes.emisor.alumno.apellido2} </h4>
                                            }
                                            <h6 className="fecha"> <Moment format="DD-MM-YYYY">{mensajes.fecha}</Moment></h6>
                                        </div>

                                        <Card.Text className="mensaje-texto-novisto">
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
                            
                        }

                    </div>

                )
            })
            return (

                <div className="grid-mensajeria-col">

                    <Menu />



                    <div>
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
                        <h3>No hay mensajes </h3>


                    </div>
                </div>



            );
        }

    }
}


export default recibidos;