import React, { Component } from 'react';
import NuevoDocumento from './NuevoDocumento';

import GlobalDocumentos from '../GlobalDocumentos';
import '../assets/css/dropbox.css';
import Spinner from 'react-bootstrap/Spinner';
import '../assets/css/dropbox.css';
import axios from 'axios';
import Moment from 'react-moment';
import ButtonIcon from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import ReactPaginate from "react-paginate";


/*IMAGENES - BOTONES */

import btn1 from '../assets/images/pdf.png';
import btn2 from '../assets/images/zip.png';

import Card from 'react-bootstrap/Card';

class mydropbox extends Component {

    url = GlobalDocumentos.url;


    state = {
        documentos: [],
        identity: null,
        pages: "",
        currentPage: 0,
        mensajesPerPage: 5,
        offset: 0,


    };

   

    constructor(props) {
        super(props);
        this.state = {
            identity: JSON.parse(localStorage.getItem('user')),
        };

    }


    componentWillMount() {
        this.getDocumentos();
    }

    componentDidMount() {
        this.getDocumentos();
    }


    getDocumentos() {

        var pages = this.state.currentPage + 1;

        if (this.state.identity.tipo === "profesor") {
            axios.get(this.url + "mydropboxProfesor/" + this.state.identity._id + '/' + pages)
                .then(res => {
                    this.setState({
                        documentos: res.data.documento,
                        status: 'sucess',
                        pages: res.data.pages
                    });
                });
        } else {
            axios.get(this.url + "mydropboxAlumno/" + this.state.identity._id + '/' + pages)
                .then(res => {
                    this.setState({
                        documentos: res.data.documento,
                        status: 'sucess',
                        pages: res.data.pages
                    });
                });
        }
    }


    handlePageClick = mensajes => {

        const selectedPage = mensajes.selected;
        const offset = selectedPage * this.state.mensajesPerPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset

        }, () =>
            this.getDocumentos());

    }

    delete(title) {

        console.log("delete");
        console.log("titulo" + title);
        axios.delete(this.url + "delete/" + title)
            .then(res => {
                this.setState({
                    status: 'sucess'
                })
                window.location.reload(true);
            })

       this.forceUpdate();
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


        if (this.state.documentos !== undefined) {
            var listardocumentos = this.state.documentos.map((documentos) => {
                return (
                    <div className="documento-item">

                        <table aria-rowcount={this.state.documentos.length} className="table-dropbox">
                            <tbody>
                                <tr>
                                    <td style={{ width: '30%' }}>

                                        <div>

                                            {
                                                documentos.formato === "pdf" ? (
                                                    <img src={btn1} alt="prueba" className="image-wrap" />
                                                ) : documentos.formato === "zip" || documentos.formato === 'rar' ? (
                                                    <img src={btn2} alt="prueba" className="image-wrap" />
                                                ) : (
                                                            <img src={documentos.image} alt="prueba" className="image-wrap" />
                                                        )
                                            }

                                        </div>
                                        <div>

                                            <a target="_blank" rel="noopener noreferrer" href={documentos.image} >{documentos.title}</a>
                                        </div>

                                    </td >

                                    <td style={{ overflow: 'auto', width: '30%' }}>
                                        {documentos.descripcion}
                                    </td>

                                    <td style={{ width: '30%' }}>
                                        <span>
                                            <Moment format="DD-MM-YYYY">{documentos.date}</Moment>
                                        </span>


                                    </td>
                                    <td className="th-pequeño" >
                                        <ButtonIcon onClick={() => { if (window.confirm('\n' + '¿Estás seguro de eliminar el archivo -' + documentos.title + '-?')) this.delete(documentos.title); }}
                                            className="btn-delete" startIcon={<DeleteIcon />}></ButtonIcon>
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                        <div className="clearfix"></div>
                    </div>
                );
            });

            return (

                <div className="grid-documentos">
                    <div >
                        <h1 className="titulo-doc">MI NUBE </h1>


                        <Card className="card-bajas" style={{ border: 'none' }}>
                            <div className="bajas">
                                <h3 style={{ fontSize: '24px', color: '#BB0909' }}>¡Recuerda!</h3>
                                <h5 style={{ fontSize: '16px' }}> Solo se pueden subir imágenes o archivos en formato .pdf .jpg ó .png    </h5>
                                <h5 style={{ fontSize: '16px' }}> El contenido de esta nube solo puede ser visto por usted.</h5>

                            </div>
                        </Card>

                    </div>
                    <div className=" grid-documentos-col">
                        <div>
                            <div >

                                <table className="table-dropbox dropbox-cabecera">
                                    <thead >
                                        <tr >
                                            <th style={{ width: '30%' }}>Nombre</th>

                                            <th style={{ width: '30%' }}>Descripción</th>
                                            <th style={{ width: '30%' }}>Fecha de subida</th>
                                            <th className="th-pequeño"></th>

                                        </tr>
                                    </thead>
                                </table>

                            </div>
                            {listardocumentos}
                            {paginationElement}

                        </div>
                        <div className="btn-docOficial">
                            <NuevoDocumento type="documento-particular" />
                        </div>

                    </div>

                </div>


            )


        } else if (this.state.documentos === undefined) {
            return (
                <div className="grid-documentos">
                    <div >
                        <h1 className="titulo-doc">MI NUBE</h1>

                    </div>
                    <div className=" grid-documentos-col">
                        <div>
                            <div style={{ textAlign: 'center' }}>

                                <h4 className="subheader">No hay archivos para mostrar</h4>
                                <p>Todavía no hay contenido en esta sección</p>


                            </div>

                        </div>
                        <div className="btn-docOficial">
                            <NuevoDocumento type="documento-particular" />
                        </div>

                    </div>

                </div>
            )
        } else {
            return (
                <div className="grid-documentos">
                    <div >
                        <h1 className="titulo-doc">MI NUBE</h1>

                    </div>
                    <div className=" grid-documentos-col">
                        <div>
                            <div style={{ textAlign: 'center' }}>

                                <Spinner animation="border" role="status" style={{ textAlign: 'center' }}>
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>

                        </div>
                        <div className="btn-docOficial">
                            <NuevoDocumento type="documento-particular" />
                        </div>

                    </div>

                </div>
            )
        }
    }

}

export default mydropbox;
