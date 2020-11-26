import React, { Component } from 'react';

import axios from 'axios';

import Menu from './menu-admin';
import ReactPaginate from "react-paginate";


class borrar extends Component {

    state = {
        destinos: [],
        profesores: [],
        destino: "",
        open: false,
        profesor: "",
        update: {},
        status: "",
        pages:"",
        currentPage:0,
        mensajesPerPage: 5,
        offset: 0,

    }


    constructor(props) {
        super(props);
        this.listarDestinos();
        this.listarProfesores();
    }

    

    openModal = (id) => {
        console.log("id:" + id)
        this.setState({ open: true, destino: id });

    }


    onCloseModal = () => { this.setState({ open: false }); }

    handlePageClick = mensajes => {
       
        const selectedPage = mensajes.selected;
        const offset = selectedPage * this.state.mensajesPerPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
      
       }, () => 
            this.listarDestinos());
        
    }

    listarDestinos() {

        var pages= this.state.currentPage+1;
        axios.get('https://plataforma-erasmus.herokuapp.com/apiDestino/destinos/'+ pages)
            .then(res => {
                this.setState({
                    destinos: res.data.destino,
                    pages:res.data.pages

                });
            });
    }

    listarProfesores() {
        axios.get('https://plataforma-erasmus.herokuapp.com/apiProfesor/' + 'profesores')
            .then(res => {

                this.setState({
                    profesores: res.data.profesor,

                });
            });
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    delete = (id) => {



        axios.put('https://plataforma-erasmus.herokuapp.com/apiDestino/delete/' + id)
            .then(res => {
                this.setState({
                    status: 'sucess'

                });
            });
        this.onCloseModal();
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
        const listarDestinos = this.state.destinos.map((destino) => {
            return (

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td >
                                    {destino.pais}
                                </td>
                                <td >
                                    {destino.ciudad}
                                </td>
                                <td>
                                    {destino.carrera}
                                </td>
                                <td>
                                    {destino.profesor.nombre + "  " + destino.profesor.apellido1 + " " + destino.profesor.apellido2}


                                </td>
                                <td>
                                    {destino.coordinador.nombre + " " + destino.coordinador.apellido1 + " " + destino.coordinador.apellido2}
                                </td>
                                <td>
                                    <button variant="primary" onClick={() => { if (window.confirm('\n' + 'Estas seguro de eliminar el destino ' + destino.ciudad + "(" + destino.pais + ") ?")) this.delete(destino._id); }}
                                        style={{ border: 'none', backgroundColor: 'transparent', marginLeft: '3px' }}>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>
                                </td>

                            </tr>

                        </tbody>
                    </table>

                </div>

            )
        })
        return (

            <div className="grid-admin">

                <Menu></Menu>
                <div>
                    <div>
                        <h1 className="titulo-doc">    BORRAR DESTINOS </h1></div>

                    <div >

                    </div>
                    <div >
                        {/* NUEVOOOOO TABLAS */}

                        <table style={{ marginTop: '20px' }} >
                            <thead >
                                <tr className="table-admin">
                                    <th >Pais</th>
                                    <th >Ciudad</th>
                                    <th>Grado</th>
                                    <th>Coordinador de destino</th>
                                    <th>Coordinador de centro</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                        {listarDestinos}
                        {paginationElement}

                    </div>
                </div>
            </div>



        );
    }
}

export default borrar;