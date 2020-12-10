import React, { Component } from 'react';


import axios from 'axios';
import Global from '../../Global';
import ReactPaginate from "react-paginate";

import Menu from './menu-admin';




class editdestinos extends Component {

    state = {
        destinos: [],
        profesores:[],
        destino:"",
        open: false,
        profesor:"",
        update:{},
        pages:"",
        currentPage:0,
        mensajesPerPage: 5,
        offset: 0,


    }

    url=Global.url;


    constructor(props) {
        super(props);
        this.listarDestinos();
       
    }


   

    openModal = (id) => {
        console.log("id:" + id)
        this.setState({ open: true, destino:id });
        
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


    onCloseModal = () => { this.setState({ open: false }); }

    listarDestinos() {
        var pages= this.state.currentPage+1;


        axios.get('https://plataforma-erasmus.herokuapp.com/apiDestino/destinos/' + pages)
            .then(res => {
                this.setState({
                    destinos: res.data.destino,
                    pages:res.data.pages

                });
            });
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
                    <table >
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
                        <h1 className="titulo-doc">    TODOS LOS DESTINOS </h1></div>

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

export default editdestinos;