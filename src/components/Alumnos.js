import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ReactPaginate from "react-paginate";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


class Alumnos extends Component {

    state = {
        identity: JSON.parse(localStorage.getItem('user')),
        status: '',
        alumnos: [],
        alumnosCord: [],
        pages: "",
        currentPage: 0,
        elements: [], //los que cargamos en la pagina actual
        mensajesPerPage: 5,
        offset: 0,

    }

    url = Global.urlprofesor;
    urlalumnos = Global.url;

    componentWillMount() {
        if(this.state.identity.rol==='coordinador_de_destino'){
            this.getalumno();
        }else{
            this.getalumnosCoordinador();
        }
       
       
    }

    getalumno = () => {

        var pages= this.state.currentPage+1;

        axios.get(this.urlalumnos + 'get-alumnos-profesor/' + this.state.identity._id + '/'+ pages)
            .then(res => {
                this.setState({
                    alumnos: res.data.users, 
                    pages: res.data.pages,
                    status: 'sucess',

                });

            })
            .catch(err => {
                this.setState({
                    alumnos: {},
                    status: 'failed'
                });
            });


    }

    getalumnosCoordinador = () => {
        var pages= this.state.currentPage+1;
        axios.get(this.urlalumnos + 'coordinador/' + this.state.identity._id + '/' + pages)
            .then(res => {
                this.setState({
                    alumnosCord: res.data.users,
                    pages: res.data.pages,
                    status: 'sucess',

                });

            })
            .catch(err => {
                this.setState({
                    alumnosCord: {},
                    status: 'failed'
                });
            });

    }
    handlePageClick = mensajes => {
      

        const selectedPage = mensajes.selected;
        const offset = selectedPage * this.state.mensajesPerPage;
        if( this.state.identity.rol === "coordinador_de_destino"){
            this.setState({
                currentPage: selectedPage,
                offset: offset
          
           }, () => 
                this.getalumno());
           }else{
            this.setState({
                currentPage: selectedPage,
                offset: offset
          
           }, () => 
                this.getalumnosCoordinador());
            
           }
       
        
    }

    componentDidMount() {
      
       if(this.state.identity.rol==='coordinador_de_destino'){
           this.getalumno();
       }else{
           this.getalumnosCoordinador();
       }
      
    }

    render() {

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

        if (this.state.alumnos != [] && this.state.identity.rol === "coordinador_de_destino") {
            var listaralumnos = this.state.alumnos.map((alumno) => {
                return (


                    <Card className="card-root">
                        <CardActionArea>
                            <CardMedia
                                className="card-media"
                                image={this.urlalumnos + '/get-image-user/' + alumno.image}
                                title="Contemplative Reptile"
                            />
                            <hr />
                            <CardContent>
                                <div className="group-nombre">
                                    <h3 className="card-nombre">{alumno.nombre + " " + alumno.apellido1 + " " + alumno.apellido2}</h3>

                                    <Link size="small" color="primary" style={{ color: 'grey' }} className="card-link-perfil" to={"/user/profile/" + alumno._id}>ver perfil</Link>
                                </div>
                                <div className="card-nombre-uni" >
                                    <h4 className="card-nombre-uni">{alumno.destino.ciudad + " (" + alumno.destino.pais + ")  -" + alumno.destino.carrera}</h4>

                                </div>

                            </CardContent>
                            <hr></hr>
                        </CardActionArea>
                        <CardActions>
                            <Link size="small" color="secondary" style={{ color: 'rgb(16,8,168)' }} to={"/documentos/" + alumno._id} >
                                Documentos
                         </Link>
                            <Link size="small" color="primary" style={{ color: 'rgb(39,149,192)' }} to={"/nube/" + alumno._id + '/' + alumno.nombre + "/" + alumno.apellido1 + "/" + alumno.apellido2}>
                                Nube Compartida
                         </Link>



                        </CardActions>
                    </Card>

                )

            })
            return (
                <div>
                    <h1 className="titulo-doc" > ALUMNOS</h1>
                    {listaralumnos}
                    {paginationElement}

                </div>
            );

        }
        else if (this.state.alumnosCord != [] && this.state.identity.rol === "coordinador_de_centro") {
            var listaralumnos2 = this.state.alumnosCord.map((alumno) => {
                return (


                    <Card className="card-root">
                        <CardActionArea>
                            <CardMedia
                                className="card-media"
                                image={this.urlalumnos + '/get-image-user/' + alumno.image}
                                title="Contemplative Reptile"
                            />
                            <hr />
                            <CardContent>
                                <div className="group-nombre">
                                    <h3 className="card-nombre">{alumno.nombre + " " + alumno.apellido1 + " " + alumno.apellido2}</h3>

                                    <Link size="small" color="primary" style={{ color: 'grey' }} className="card-link-perfil" to={"/user/profile/" + alumno._id}>ver perfil</Link>
                                </div>
                                <div className="card-nombre-uni" >
                                    <h4 className="card-nombre-uni">{alumno.destino.ciudad + " (" + alumno.destino.pais + ")  -" + alumno.destino.carrera}</h4>

                                </div>

                            </CardContent>
                            <hr></hr>
                        </CardActionArea>
                        <CardActions>
                            <Link size="small" color="secondary" style={{ color: 'rgb(16,8,168)' }} to={"/documentos/" + alumno._id} >
                                Documentos
                         </Link>
                            <Link size="small" color="primary" style={{ color: 'rgb(39,149,192)' }} to={"/nube/" + alumno._id + "/" + alumno.nombre + "/" + alumno.apellido1 + "/" + alumno.apellido2}>
                                Nube Compartida
                         </Link>



                        </CardActions>
                    </Card>

                )

            })
            return (
                <div>
                    <h1 className="titulo-doc" > ALUMNOS</h1>

                    {listaralumnos2}
                    {paginationElement}
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1 className="titulo-doc" > ALUMNOS</h1>
                    <h2>No hay alumno</h2>
                </div>
            );
        }

    }
}

    export default Alumnos