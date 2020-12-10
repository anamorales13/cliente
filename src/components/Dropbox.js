import React, { Component } from 'react';
import NuevoDocumento from './NuevoDocumento';

import GlobalDocumentos from '../GlobalDocumentos';
import '../assets/css/NuevoUsuario.css';
import Documentos from './Documentos';
import Spinner from 'react-bootstrap/Spinner';
import '../assets/css/dropbox.css';
import axios from 'axios';
import Moment from 'react-moment';
import Global from '../Global';
import ButtonIcon from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactPaginate from "react-paginate";
import Card from 'react-bootstrap/Card';
import swal from 'sweetalert';

/*IMAGENES - BOTONES */

import btn1 from '../assets/images/pdf.png';
import btn2 from '../assets/images/zip.png';
import btn3 from '../assets/images/default.png';



class Dropbox extends Component {

    url = GlobalDocumentos.url;


    state = {
        documentos: [],
        docprofesor: [],
        doccordinador:[],
        status: null,
        identity: null,
        eliminado: {},
        value: false,
        pages: "",
        currentPage: 0,
        mensajesPerPage: 5,
        offset: 0,



    };

    url = GlobalDocumentos.url;
    urlalumno = Global.urlalumno;


    constructor(props) {
        super(props);
        this.state = {
            identity: JSON.parse(localStorage.getItem('user')),
        };
        this.getDocumentos();
    }





    getDocumentos = (e) => {
        /*  e.preventDefault();*/

        var id = this.props.match.params.id;
        var pages = this.state.currentPage + 1;
        if (this.state.identity.tipo === 'Alumno') { //view: alumno

            /*axios.get(this.url + "documentosAlumnos/" + this.state.identity._id + '/' + this.state.identity.profesor)
                .then(res => {
                    this.setState({
                        documentos: res.data.documento,
                        status: 'sucess'
                    });
                });*/

            axios.get(this.url + "documentosProfesor/" + this.state.identity.profesor + '/' + this.state.identity._id + "/" + pages)
                .then(res => {
                    this.setState({
                        docprofesor: res.data.documento,
                        status: 'sucess',
                        pages: res.data.pages,
                    });
                    
                    axios.get(this.url + "documentosProfesor/" + this.state.identity.coordinador + '/' + this.state.identity._id + "/" + pages)
                .then(ress => {
                    var lista= res.data.documento.concat(ress.data.documento)
                    this.setState({
                        docprofesor: lista,
                        status: 'sucess',
                        pages: res.data.pages,
                    });
                });
                });
                


        }
        else {
            axios.get(this.url + "documentosProfesor/" + this.state.identity._id + '/' + id + '/' + pages)
                .then(res => {
                    this.setState({
                        docprofesor: res.data.documento,
                        status: 'sucess',
                        pages: res.data.pages,
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
        axios.delete(this.url + "delete/" + title)
            .then(res => {
                this.setState({

                    status: 'sucess',
                    value: true
                });
                window.location.reload(true);

            })




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

        if (this.state.docprofesor != undefined) {
            var listardocumentos = this.state.docprofesor.map((documentos) => {
                return (
                    <div className="documento-item">

                        <table aria-rowcount={this.state.docprofesor.length} className="table-dropbox" >
                            <tbody>
                                <tr>
                                    <td >
                                        <div>

                                            {
                                                 documentos.formato == "pdf" ? (
                                                    <img src={btn1} alt="prueba" className="image-wrap" />
                                                ) : documentos.formato === "zip"|| documentos.formato ==='rar' ? (
                                                    <img src={btn2} alt="prueba" className="image-wrap" />
                                                ) :  (                                        
                                                                    <img src={documentos.image} alt="prueba" className="image-wrap" />
                                                                )
                                            }

                                        </div>
                                        <div>
                                        <a target="_blank" href={ documentos.image} title="descargar">{documentos.title}</a>
                                        </div>
                                    </td>
                                    <td style={{ overflow: 'auto', maxHeight: '200px' }}>
                                        {documentos.descripcion}
                                    </td>
                                    <td>
                                        {documentos.propietario === 'Alumno' ? (
                                            documentos.alumno.nombre + " " + documentos.alumno.apellido1 + " " + documentos.alumno.apellido2
                                        ) :
                                            documentos.profesor.nombre + " " + documentos.profesor.apellido1 + " " + documentos.profesor.apellido2
                                        }

                                    </td>


                                    <td>
                                        <spain>
                                            <Moment format="DD-MM-YYYY">{documentos.date}</Moment>
                                        </spain>

                                    </td>
                                    <td className="th-pequeño">
                                        <ButtonIcon onClick={() => { if (window.confirm('\n' + 'Estas seguro de eliminar el archivo ' + documentos.title + '?')) this.delete(documentos.title); }}
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

                        {this.props.match.params.nombre != null &&
                            <div>
                                <h1 className="titulo-secundario">NUBE COMPARTIDA</h1>
                                <h4 className="subtitulo-doc">Alumno: {this.props.match.params.nombre + " " + this.props.match.params.apellido1 + "  " + this.props.match.params.apellido2}</h4>
                            </div>
                        }
                        {this.state.identity.tipo === "Alumno" &&
                            <h1 className="titulo-doc">NUBE COMPARTIDA</h1>
                        }

                    </div>
                    <div className=" grid-documentos-col-compartida">
                        <div>
                            <div >

                                <Card className="card-bajas" style={{ border: 'none', background:'transparent'}}>
                                    <div className="bajas">
                                        <h3 style={{ fontSize: '24px', color: '#BB0909' }}>¡Recuerda!!</h3>
                                        <h5 style={{ fontSize: '16px' }}> Sólo se pueden subir imagenes o archivos en formato .pdf .jpg ó .png </h5>
                                        <h5 style={{ fontSize: '16px' }}> Otros usuarios pueden ver el contenido de esta nube.</h5>

                               

                                    </div>
                                </Card>

                                <table className="table-dropbox dropbox-cabecera">
                                    <thead >
                                        <tr>
                                            <th className="table-dropbox-th" >Nombre</th>
                                            <th className="table-dropbox-th">Comentario</th>
                                            <th className="table-dropbox-th">Subido por:</th>
                                            <th className="table-dropbox-th">Fecha de subida</th>
                                            <th className="th-pequeño"></th>

                                        </tr>
                                    </thead>
                                </table>

                            </div>
                            {listardocumentos}
                            {paginationElement}

                        </div>
                        <div className="btn-docOficial">
                            <NuevoDocumento type="documento" alumno={this.props.match.params.id} message="hola" />
                        </div>

                    </div>

                </div>

            );
        } else if (this.state.docprofesor === undefined) {
            return (
                <div className="grid-documentos">
                    <div >
                        <h1 className="titulo-secundario">NUBE COMPARTIDA</h1>
                        {this.props.match.params.nombre != null &&
                            <h4 className="subtitulo-doc">{this.props.match.params.nombre + " " + this.props.match.params.apellido1 + "  " + this.props.match.params.apellido2}</h4>
                        }
                        <h1 className="titulo-doc"></h1>
                    </div>
                    <div className=" grid-documentos-col">
                        <div>
                            <div style={{ textAlign: 'center' }}>
                            
                                 <h4 className="subheader">No hay documentos para mostrar</h4>
                                 <p>Todavia no hay contenido en esta sección</p>
                    

                            </div>

                        </div>
                        <div className="btn-docOficial">


                            <NuevoDocumento type="documento" alumno={this.props.match.params.id} message="hola" />


                        </div>

                    </div>

                </div>
            );

        }else{
            <div className="grid-documentos">
            <div >
                <h1 className="titulo-secundario">NUBE COMPARTIDA</h1>
                {this.props.match.params.nombre != null &&
                    <h4 className="subtitulo-doc">{this.props.match.params.nombre + " " + this.props.match.params.apellido1 + "  " + this.props.match.params.apellido2}</h4>
                }
                <h1 className="titulo-doc"></h1>
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


                    <NuevoDocumento type="documento" alumno={this.props.match.params.id} message="hola" />


                </div>

            </div>

        </div>
        }


    }
}

export default Dropbox;