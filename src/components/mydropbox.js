import React, { Component } from 'react';
import NuevoDocumento from './NuevoDocumento';

import GlobalDocumentos from '../GlobalDocumentos';
import '../assets/css/dropbox.css';
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

import swal from 'sweetalert';

/*IMAGENES - BOTONES */
import btn1 from '../assets/images/word.png';
import btn2 from '../assets/images/pdf.png';
import btn3 from '../assets/images/powerpoint.jpg';
import btn4 from '../assets/images/default.png';
import SelectInput from '@material-ui/core/Select/SelectInput';


class mydropbox extends Component {

    url = GlobalDocumentos.url;


    state = {
        documentos:[],
        identity: null,
        pages:"",
        currentPage:0,
        mensajesPerPage: 5,
        offset: 0,


    };

    url = GlobalDocumentos.url;
 



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

        var pages= this.state.currentPage+1;

        if (this.state.identity.tipo === "profesor") {
            axios.get(this.url + "mydropboxProfesor/" + this.state.identity._id + '/'+ pages)
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
                        pages:res.data.pages
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
                    status: 'sucess'
                })
            })
        swal(
            'Documento eliminado con exito',
            'El documento ha sido eliminado correctamente',
            'success'
        )

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


        if (this.state.documentos != undefined ) {
            var listardocumentos = this.state.documentos.map((documentos) => {
                return (
                    <div className="documento-item">

                        <table aria-rowcount={this.state.documentos.length} className="table-dropbox">
                            <tbody>
                                <tr>
                                    <td style={{ width: '30%' }}>
                                        <div style={{ marginLeft: '20px', display: 'flex' }}>
                                            <div>

                                                {
                                                    documentos.tipoDocumento == "word.png" ? (
                                                        <img src={btn1} alt="prueba" className="image-wrap" />
                                                    ) : documentos.tipoDocumento == "pdf.png" ? (
                                                        <img src={btn2} alt="prueba" className="image-wrap" />
                                                    ) : documentos.tipoDocumento == "powerpoint.jpg" ? (
                                                        <img src={btn3} alt="prueba" className="image-wrap" />
                                                    ) : documentos.tipoDocumento == "imagen" ? (
                                                        <img src={this.url + 'get-image/' + documentos.url} alt={documentos.title} className="image-wrap" />
                                                    ) :
                                                                    (
                                                                        <img src={btn4} alt="prueba" className="image-wrap" />
                                                                    )
                                                }

                                            </div>
                                            <div>
                                                <a target="_blank" href={this.url + '/get-image/' + documentos.url}>{documentos.title}</a>
                                            </div>
                                        </div>
                                    </td >
                                   
                                    <td style={{ width: '30%' }}>
                                        {documentos.descripcion}
                                    </td>

                                    <td style={{ width: '30%' }}>
                                        <spain>
                                            <Moment format="DD-MM-YYYY">{documentos.date}</Moment>
                                        </spain>


                                    </td>
                                    <td className="th-pequeño" >
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
                            <h1 className="titulo-doc">MI NUBE </h1>
                        


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
        
           
        }else{
            return(
                <div className="grid-documentos">
                <div >
                    <h1 className="titulo-doc">MI NUBE</h1>
                    
                </div>
                <div className=" grid-documentos-col">
                    <div>
                        <div >
                            <Spinner animation="border" role="status" style={{textAlign:'center'}}>
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
