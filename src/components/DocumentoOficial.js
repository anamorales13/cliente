import React, { Component } from 'react';

import axios from 'axios';

import '../assets/css/documentos.css';

import NuevoDocumento from './NuevoDocumento';
import Global from '../Global';
import doc from '../assets/images/default-document.png';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';
import Card from 'react-bootstrap/Card';
import { FaFileDownload } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';
import swal from 'sweetalert';
import { Image, Transformation } from 'cloudinary-react';


class DocumentoOficial extends Component {

    url = Global.url;
    nombre = "";
    estadoRef = React.createRef();
    documento1 = "";
    documento2 = "";
    document03 = "";
    documento4 = "";

    constructor(props) {
        super(props);
        this.state = {
            identity: JSON.parse(localStorage.getItem('user')),
            alumno: {},
            status: null,
            open: false,
            estado: "",

        };


    }


    openModal = (name) => {
        this.nombre = name;
        this.setState({ open: true });
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    componentWillMount() {
        this.getDocumentos();

    }


    componentDidMount() {
        this.getDocumentos();
    }

    getDocumentos() {

        //ventana del alumno
        if (this.props.match.params.id == null) {
            axios.get(this.url + "getdocumentos" + "/" + this.state.identity._id)
                .then(res => {
                    if (res.data.alumno) {
                        this.setState({
                            alumno: res.data.alumno,
                            status: 'sucess'
                        });

                       
                        this.documento1 = this.state.alumno[0].documentos[0].cloud_url;
                        this.documento2 = this.state.alumno[0].documentos[1].cloud_url;
                        this.documento3 = this.state.alumno[0].documentos[2].cloud_url;
                        this.documento4 = this.state.alumno[0].documentos[3].cloud_url;

                    }


                });
        } else {
            //ventana del profesor
            axios.get(this.url + "getdocumentos" + "/" + this.props.match.params.id)
                .then(res => {
                    if (res.data.alumno) {
                        this.setState({
                            alumno: res.data.alumno,
                            status: 'sucess'
                        });

                       

                    }


                });
        }


    }

    changeEstado = () => {
        this.setState({
            estado: this.estadoRef.current.value
        })

    }


    //SOLO PROFESOR
    modificarEstado = () => {

        var body = {
            estado: this.state.estado
        }

     

        axios.put(this.url + "cambioEstado/" + this.props.match.params.id + "/" + this.nombre, body)
            .then(res => {
                this.setState({
                    status: 'sucess'
                })
                this.nombre = "";
                swal({
                    title: 'Estado modificado con éxito',
                    text: "El estado se ha modificado correctamente",
                    icon: "sucess",
                    buttons: true,
                })
                    .then((value) => {
                        if (value) {
                            window.location.reload(true);
                        }
                    });
            })
            .catch(err => {
                this.setState({
                    status: 'failed'
                })
            })
        this.notificarAlumno();

    }



    notificarAlumno = () => {
        var mensaje = {
            asunto: 'Modificación documento ' + this.nombre,
            texto: 'El estado del documento ' + this.nombre + ' ha sido modificado por el profesor ' + this.state.identity.nombre + " " + this.state.identity.apellido1 + " " + this.state.identity.apellido2
                + '.  Puede obtener más información en el apartado de DOCUMENTOS. ',
            emisor: { profesor: '5fbbfde011838fd11fac5944' },
            receptor: { alumno: this.props.match.params.id }
        }

        axios.post('https://plataforma-erasmus.herokuapp.com/api/mensaje', mensaje)
            .then(res => {
                this.setState({
                    nuevoMensaje: res.data.mensaje,
                    status: 'sucess',
                });
                window.location.reload(true);
            })
            .catch(err => {
                this.setState({
                    status: 'failed'
                });
            });

    }

    render() {

        if (this.state.alumno.length == 1) {
            return (



                <div className="grid-documentos-oficiales">
                    {/* FILA 1 */}
                    <div>
                        {
                            this.state.identity.tipo === "profesor" &&
                            <div>
                                <h1 className="titulo-secundario">DOCUMENTOS OFICIALES</h1>
                                <h4 className="subtitulo-doc" style={{ marginBottom: '25px' }}>{this.state.alumno[0].nombre + " " + this.state.alumno[0].apellido1 + "  " + this.state.alumno[0].apellido2}</h4>
                            </div>
                        }
                        {
                            this.state.identity.tipo === "Alumno" &&
                            <h1 className="titulo-doc">DOCUMENTOS OFICIALES</h1>
                        }
                    </div>
                    {/* FILA 2 */}
                    <div className="grid-doc-oficial">
                        {/* COLUMNA 1 */}
                        <div className="left">
                            <h1 className="titulo-seccion-doc"> · Antes del Erasmus </h1>

                            <div className="bloque-uno-docOfi">


                                <Card style={{ marginRight: '30px' }} className="card-doc-ofi">
                                    <Card.Img variant="left" src={doc} className="doc-default">
                                        
                                    </Card.Img>

                                       <Card.Body id="cardbody">

                                        <Card.Text >
                                            <h4>CPRA</h4>
                                            <hr />
                                            {this.state.alumno[0].documentos[0].estado === 'En tramite' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'blue' }}>En trámite</strong>
                                                    <button onClick={() => this.openModal('CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'blue' } : { display: 'none' }}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg> </button> </h5>
                                            }
                                            {this.state.alumno[0].documentos[0].estado === 'Aceptado' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'green' }}>Aceptado</strong>
                                                    <button onClick={() => this.openModal('CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'green' } : { display: 'none' }}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button></h5>

                                            }
                                            {this.state.alumno[0].documentos[0].estado === 'No Aceptado' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'red' }}>No Aceptado</strong>
                                                    <button onClick={() => this.openModal('CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'red' } : { display: 'none' }}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button></h5>

                                            }
                                            {this.state.alumno[0].documentos[0].estado === 'No Presentado' &&
                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'grey' }}>No Presentado</strong> </h5>
                                            }
                                            {this.state.alumno[0].documentos[0].estado != 'No Presentado' &&
                                                <div>
                                                    <a id="link-doc" target="_blank" href={this.state.alumno[0].documentos[0].image}>
                                                        <FaFileDownload />
                                                    </a>
                                                    <h5 id="estado-doc" style={{ fontSize: '16px' }}>Última modificación:  <Moment format="DD-MM-YYYY">{this.state.alumno[0].documentos[0].fecha}</Moment></h5>
                                                </div>
                                            }
                                        </Card.Text>


                                    </Card.Body>



                                </Card>

                                <Card className="card-doc-ofi   ">

                                    <Card.Img variant="left" src={doc} className="doc-default" />

                                    <Card.Body id="cardbody">

                                        <Card.Text >
                                            <h4>Learning Agreement</h4>
                                            <hr />
                                            {this.state.alumno[0].documentos[1].estado === 'En tramite' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'blue' }}>En trámite</strong>
                                                    <button onClick={() => this.openModal('Learning_Agreement')} id="edit-style" style={this.props.match.params.id ? { color: 'blue' } : { display: 'none' }}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg> </button> </h5>
                                            }
                                            {this.state.alumno[0].documentos[1].estado === 'Aceptado' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'green' }}>Aceptado</strong>
                                                    <button onClick={() => this.openModal('Learning_Agreement')} id="edit-style" style={this.props.match.params.id ? { color: 'green' } : { display: 'none' }}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button></h5>

                                            }
                                            {this.state.alumno[0].documentos[1].estado === 'No Aceptado' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'red' }}>No Aceptado</strong>
                                                    <button onClick={() => this.openModal('Learning_Agreement')} id="edit-style" style={this.props.match.params.id ? { color: 'red' } : { display: 'none' }}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button></h5>

                                            }
                                            {this.state.alumno[0].documentos[1].estado === 'No Presentado' &&
                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'grey' }}>No Presentado</strong> </h5>
                                            }
                                            {this.state.alumno[0].documentos[1].estado != 'No Presentado' &&
                                                <div>
                                                    <a id="link-doc" target="_blank" href={this.state.alumno[0].documentos[1].image}>
                                                        <FaFileDownload />
                                                    </a>
                                                    <h5 id="estado-doc" style={{ fontSize: '16px' }}>Última modificación:  <Moment format="DD-MM-YYYY">{this.state.alumno[0].documentos[1].fecha}</Moment></h5>
                                                </div>
                                            }
                                        </Card.Text>


                                    </Card.Body>



                                </Card>
                            </div>
                            <h1 className="titulo-seccion-doc"> ·Durante el Erasmus</h1>

                            <div className="bloque-uno-docOfi">
                                <Card style={{ marginRight: '30px' }} className="card-doc-ofi   ">

                                    <Card.Img variant="left" src={doc} className="doc-default" />

                                    <Card.Body id="cardbody">

                                        <Card.Text >
                                            <h4>Modificación CPRA</h4>
                                            <hr />
                                            {this.state.alumno[0].documentos[2].estado === 'En tramite' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'blue' }}>En trámite</strong>
                                                    <button onClick={() => this.openModal('Modificacion_CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'blue' } : { display: 'none' }}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg> </button> </h5>
                                            }
                                            {this.state.alumno[0].documentos[2].estado === 'Aceptado' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'green' }}>Aceptado</strong>
                                                    <button onClick={() => this.openModal('Modificacion_CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'green' } : { display: 'none' }}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button></h5>

                                            }
                                            {this.state.alumno[0].documentos[2].estado === 'No Aceptado' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'red' }}>No Aceptado</strong>
                                                    <button onClick={() => this.openModal('Modificacion_CPRA')} id="edit-style" style={this.props.match.params.id ? { color: 'red' } : { display: 'none' }}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button></h5>

                                            }
                                            {this.state.alumno[0].documentos[2].estado === 'No Presentado' &&
                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'grey' }}>No Presentado</strong> </h5>
                                            }
                                            {this.state.alumno[0].documentos[2].estado != 'No Presentado' &&
                                                <div>
                                                    <a id="link-doc" target="_blank" href={this.state.alumno[0].documentos[2].image}>
                                                        <FaFileDownload />
                                                    </a>
                                                    <h5 id="estado-doc" style={{ fontSize: '16px' }}>Última modificación:  <Moment format="DD-MM-YYYY">{this.state.alumno[0].documentos[2].fecha}</Moment></h5>
                                                </div>
                                            }
                                        </Card.Text>


                                    </Card.Body>



                                </Card>
                                <Card className="card-doc-ofi   ">

                                    <Card.Img variant="left" src={doc} className="doc-default" />

                                    <Card.Body id="cardbody">

                                        <Card.Text >
                                            <h4>Modificación LA</h4>
                                            <hr />
                                            {this.state.alumno[0].documentos[3].estado === 'En tramite' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'blue' }}>En trámite</strong>
                                                    <button onClick={() => this.openModal('Modificacion_LA')} id="edit-style" style={this.props.match.params.id ? { color: 'blue' } : { display: 'none' }}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg> </button> </h5>
                                            }
                                            {this.state.alumno[0].documentos[3].estado === 'Aceptado' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'green' }}>Aceptado</strong>
                                                    <button onClick={() => this.openModal('Modificacion_LA')} id="edit-style" style={this.props.match.params.id ? { color: 'green' } : { display: 'none' }}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button></h5>

                                            }
                                            {this.state.alumno[0].documentos[3].estado === 'No Aceptado' &&

                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'red' }}>No Aceptado</strong>
                                                    <button onClick={() => this.openModal('Modificacion_LA')} id="edit-style" style={this.props.match.params.id ? { color: 'red' } : { display: 'none' }}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button></h5>

                                            }
                                            {this.state.alumno[0].documentos[3].estado === 'No Presentado' &&
                                                <h5 id="estado-doc">Estado : <strong style={{ color: 'grey' }}>No Presentado</strong> </h5>
                                            }
                                            {this.state.alumno[0].documentos[3].estado != 'No Presentado' &&
                                                <div>
                                                    <a id="link-doc" target="_blank" href={this.state.alumno[0].documentos[3].image}>
                                                        <FaFileDownload />
                                                    </a>
                                                    <h5 id="estado-doc" style={{ fontSize: '16px' }}>Última modificación:  <Moment format="DD-MM-YYYY">{this.state.alumno[0].documentos[3].fecha}</Moment></h5>
                                                </div>
                                            }
                                        </Card.Text>


                                    </Card.Body>



                                </Card>


                                <Modal show={this.state.open} onHide={this.onCloseModal} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title >MODIFICAR ESTADO <strong>-- {this.nombre} --</strong> </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={this.modificarEstado} className="nuevo-doc">
                                            <div className="form-subir">
                                                <label for="tittle">Seleccionar nuevo estado:</label>
                                                <select className="form-input-nuevo" ref={this.estadoRef} onChange={this.changeEstado}>
                                                    <option selected value=""></option>
                                                    <option value="No Aceptado">No Aceptado</option>
                                                    <option value="Aceptado">Aceptado</option>
                                                    <option value="En tramite">En trámite</option>

                                                </select>

                                            </div>

                                            <input type="submit" value="ACTUALIZAR" className="btn-submit" ></input>
                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button variant="secondary" onClick={this.onCloseModal} className="btn-cerrar">
                                            cerrar
                                        </button>

                                    </Modal.Footer>
                                </Modal>

                            </div>

                        </div>
                        {/* COLUMNA 2 */}
                        <div className="btn-docOficial" >

                            {
                                this.props.match.params.id != null
                                    ? <NuevoDocumento type={this.props.match.params.id} />
                                    : <NuevoDocumento type="nuevo" />
                            }

                        </div>
                    </div>


                </div >
            );
        } else {
            return (
                <div>
                    <div className="fp-container" id="fp-container">
                        <Spinner animation="border" role="status" className="fp-loader"></Spinner>
                    </div>
                </div>
            )

        }


    }

}

export default DocumentoOficial;