import React, { Component, useState } from 'react';
import GlobalDocumentos from '../GlobalDocumentos';
import Global from '../Global';

import axios from 'axios';
import swal from 'sweetalert';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


import Modal from 'react-bootstrap/Modal';
import "../assets/css/dropbox.css";
import SimpleReactValidator from 'simple-react-validator';


class NuevoDocumento extends Component {

    titleRef = React.createRef();
    nombreRef = React.createRef();
    fileRef = React.createRef();
    contentRef = React.createRef();
    descripcionRef = React.createRef();

    url = GlobalDocumentos.url;
    urldocoficial = Global.url;

    constructor(props) {
        super(props);
        this.state = {
            documento: {},
            documentoOficial: {},
            nombre: "",
            status: null,
            statuss: null,
            value: null,
            selectedFile: null,
            open: false,
            identity: JSON.parse(localStorage.getItem('user')),
            message: "",



        };
    }

    componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio',
            }
        });
    }

    changeState = () => {


        if (this.props.type === "documento-particular") {
            this.setState({
                documento: {
                    title: this.titleRef.current.value,
                    //  url: this.fileRef.current.value,
                    nombre: this.state.identity._id,
                    tipoDocumento: null,
                    tipousuario: this.state.identity.tipo,
                    descripcion: this.descripcionRef.current.value,
                    tipo_nube: 'particular'
                }
            });
        }
        else {
            if (this.state.identity.tipo === "profesor") {
                var alumnoid = { alumno: this.props.alumno }
                console.log("change - profesor" + alumnoid.alumno)
                console.log("message:" + this.props.message);
                this.setState({
                    documento: {
                        title: this.titleRef.current.value,
                        //    url: this.fileRef.current.value,
                        nombre: this.state.identity._id, //propietario
                        nombre2: alumnoid.alumno,
                        tipoDocumento: null,
                        tipousuario: this.state.identity.tipo,
                        descripcion: this.descripcionRef.current.value,
                        tipo_nube: "compartida"
                    }
                });
            } else {
                this.setState({
                    documento: {
                        title: this.titleRef.current.value,
                        //   url: this.fileRef.current.value,
                        nombre: this.state.identity._id, //propietario
                        nombre2: this.state.identity.profesor,
                        tipoDocumento: null,
                        tipousuario: this.state.identity.tipo,
                        descripcion: this.descripcionRef.current.value,
                        tipo_nube: "compartida"
                    }
                });
            }

        }
    }


    changeStateDocOficial = (e) => {
        this.setState({
            documentoOficial: {
                nombre: this.nombreRef.current.value,
            }
        })
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }


    openModal = () => {
        this.setState({ open: true });
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }


    saveDocument = (e) => {
        e.preventDefault();

        // 1- Rellenar el state con el formulario
        this.changeState();

        const formData = new FormData();


        var docId;
        if (this.validator.allValid()) {
            formData.append(
                'file0',
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            axios.post(this.url + 'saveDoc', this.state.documento)
                .then(res => {
                    if (res.data.documento) {

                        this.setState({
                            documento: res.data.documento,
                            status: 'waiting'
                        });


                        docId = this.state.documento._id;
                        
                        axios.post('https://plataforma-erasmus.herokuapp.com/apiImages/images-add', formData)
                            .then(res => {
                                

                                if (res.data.image) {

                                    axios.put(this.url + 'add-files/' + docId, res.data.image)
                                        .then(res => {
                                            this.setState({
                                                status: 'sucess',
                                            })

                                            swal({
                                                title: 'Archivo subido con éxito',
                                                text: "El archivo se ha subido correctamente",
                                                icon: "sucess",
                                                buttons: true,
                                            })
                                              .then((value) => {
                                                    if (value) {
                                                        window.location.reload(true);
                                                    }
                                                });

                                        });
                                }


                            });
                    }
                });
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }


    }


    saveDocOficial = (e) => {

        e.preventDefault();
        const formDatadoc = new FormData();


        console.log(this.state.selectedFile);


        // VENTANA ALUMNO
        if (this.props.type === "nuevo") {

            if (this.validator.allValid()) {

                formDatadoc.append(
                    'file0',
                    this.state.selectedFile,
                    this.state.selectedFile.name
                );

                axios.post('https://plataforma-erasmus.herokuapp.com/apiImages/images-add', formDatadoc)
                    .then(res => {
                        axios.put(this.urldocoficial + 'add-files-oficial/' + this.state.identity._id + '/' + this.state.nombre, res.data.image)
                            .then(res => {
                                this.setState({
                                    status: 'sucess',
                                    message: "",
                                })

                                swal({
                                    title: 'Documento subido con éxito',
                                    text: "El documento se ha subido correctamente",
                                    icon: "sucess",
                                    buttons: true,
                                })
                                    .then((value) => {
                                        if (value) {
                                            window.location.reload(true);
                                        }
                                    });

                            });


                    })
                    .catch(err => {
                        this.setState({
                            message: 'Formato incorrecto'
                        });
                    });

            } else {
                this.forceUpdate();
                this.validator.showMessages();
            }

            //VENTANA PROFESOR
        } else {

            if (this.validator.allValid()) {

                formDatadoc.append(
                    'file0',
                    this.state.selectedFile,
                    this.state.selectedFile.name
                );


                axios.post('https://plataforma-erasmus.herokuapp.com/apiImages/images-add', formDatadoc)
                    .then(res => {

                        axios.put(this.urldocoficial + 'add-files-oficial/' + this.props.type + '/' + this.state.nombre, res.data.image)
                            .then(res => {
                                this.setState({
                                    status: 'sucess',
                                    message: ""
                                })
                                swal({
                                    title: 'Documento subido con éxito',
                                    text: "El documento se ha subido correctamente",
                                    icon: "sucess",
                                    buttons: true,
                                })
                                    .then((value) => {
                                        if (value) {
                                            window.location.reload(true);
                                        }
                                    });

                            });
                    })
                    .catch(err => {
                        this.setState({
                            message: 'Formato incorrecto'
                        });
                    });

            } else {
                this.forceUpdate();
                this.validator.showMessages();
            }

        }

    }


    notificarProfesor = () => {
        var mensaje = {
            asunto: 'Modificación del documento ' + this.state.nombre,
            texto: 'El documento ' + this.state.nombre + ' se ha subido por parte del alumno ' + this.state.identity.nombre + " " + this.state.identity.apellido1 + " " + this.state.identity.apellido2
                + '  Puede obtener más información en el apartado de ALUMNOS. ',
            emisor: { profesor: '5fbbfde011838fd11fac5944' },
            receptor: { profesor: this.state.identity.profesor }
        }

        var mensaje2 = {
            asunto: 'Modificación del documento ' + this.state.nombre,
            texto: 'El documento ' + this.state.nombre + ' se ha subido por parte del alumno ' + this.state.identity.nombre + " " + this.state.identity.apellido1 + " " + this.state.identity.apellido2
                + 'Puede obtener más información en el apartado de ALUMNOS',

            emisor: { profesor: '5fbbfde011838fd11fac5944' },
            receptor: { profesor: this.state.identity.coordinador }
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

        if (this.state.documentoOficial.nombre == 'CPRA' || this.state.documentoOficial.nombre == 'Modificacion_CPRA') {
            axios.post('https://plataforma-erasmus.herokuapp.com/api/mensaje', mensaje2)
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
    }


    notificarAlumno = () => {
        var mensaje = {
            asunto: ' Modificación del documento ' + this.state.nombre,
            texto: 'El documento ' + this.state.nombre + ' se ha subido por parte del profesor ' + this.state.identity.nombre + " " + this.state.identity.apellido1 + " " + this.state.identity.apellido2
                + '  Puede obtener más información en el apartado de DOCUMENTOS. ',
            emisor: { profesor: '5fbbfde011838fd11fac5944' },
            receptor: { alumno: this.props.type }
        }

        axios.post('https://plataforma-erasmus.herokuapp.com/mensaje', mensaje)
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

    fileChange = (event) => {

        this.setState({

            selectedFile: event.target.files[0] //aqui tengo el fichero que quiero subir.

        });

    }


    render() {


        /* if (this.state.status === 'sucess' || this.state.statuss=== 'sucess') {
             window.location.reload(true);
     
         }
         const { open } = this.state.open;*/


        if (this.props.type === 'documento') {
            return (


                <div>
                    <Fab color="primary" aria-label="add" onClick={this.openModal}>
                        <AddIcon onClick={this.openModal} />
                    </Fab>


                    <Modal show={this.state.open} onHide={this.onCloseModal} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>SUBIR ARCHIVO</Modal.Title>
                        </Modal.Header>
                        <strong style={{ textAlign: 'center', fontSize: '16px' }}>¡Recuerda!</strong>
                        <h5 style={{ textAlign: 'center', fontSize: '16px' }}>Solo se pueden subir imágenes o archivos con formato .pdf .jpg ó .png</h5>
                        <Modal.Body>

                            <form onSubmit={this.saveDocument} className="nuevo-doc" enctype="multipart/form-data">
                                <div >
                                    {/*<label for="tittle">Titulo:</label>*/}
                                    <input type="text" id="tittle" name="tittle" ref={this.titleRef} placeholder="Titulo" className="form-input-nuevo" maxlength="35" />
                                    {this.validator.message('tittle', this.state.documento.title, 'required')}
                                </div>
                                <div >
                                    {/*<label for="tittle">Titulo:</label>*/}
                                    <textarea type="text" id="descripcion" name="descripcion" ref={this.descripcionRef} maxlength="80" placeholder="Comentario (opcional)" className="form-input-nuevo" style={{ resize: 'none' }} />

                                </div>
                                <div id="div_file" >
                                    {/*} <label htmlFor="file0"> URL: </label>*/}
                                    <input type="file" name="file0" onChange={this.fileChange} ref={this.fileRef} className="form-input-nuevo" />
                                    {this.validator.message('file0', this.state.selectedFile, 'required')}
                                </div>
                                <input type="submit" value="SUBIR" className="btn-submit" ></input>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button variant="secondary" onClick={this.onCloseModal} className="btn-cerrar">
                                Cerrar
                             </button>

                        </Modal.Footer>
                    </Modal>

                </div>
            );
        } else if (this.props.type === "documento-particular") {
            return (
                <div>
                    <Fab color="primary" aria-label="add" onClick={this.openModal}>
                        <AddIcon onClick={this.openModal} />
                    </Fab>


                    <Modal show={this.state.open} onHide={this.onCloseModal} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>SUBIR ARCHIVO</Modal.Title>

                        </Modal.Header>
                        <strong style={{ textAlign: 'center', fontSize: '16px' }}>¡Recuerda!</strong>
                        <h5 style={{ textAlign: 'center', fontSize: '16px' }}>Solo se pueden subir imágenes o archivos con formato .pdf .jpg ó .png</h5>
                        <Modal.Body>
                            <form onSubmit={this.saveDocument} className="nuevo-doc" encType="multipart/form-data">
                                <div >
                                    {/*<label for="tittle">Titulo:</label>*/}
                                    <input type="text" id="tittle" name="tittle" ref={this.titleRef} placeholder="Titulo" maxlength="35" className="form-input-nuevo" />
                                    {this.validator.message('tittle', this.state.documento.title, 'required')}
                                </div>
                                <div >
                                    {/*<label for="tittle">Titulo:</label>*/}
                                    <textarea type="text" id="descripcion" name="descripcion" ref={this.descripcionRef} maxlength="80" placeholder="Comentario (opcional)" className="form-input-nuevo" style={{ resize: 'none' }} />

                                </div>
                                <div id="div_file" >
                                    {/*} <label htmlFor="file0"> URL: </label>*/}
                                    <input type="file" name="file0" onChange={this.fileChange} ref={this.fileRef} className="form-input-nuevo" />
                                    {this.validator.message('file0', this.state.selectedFile, 'required')}
                                </div>
                                <input type="submit" value="SUBIR" className="btn-submit" ></input>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button variant="secondary" onClick={this.onCloseModal} className="btn-cerrar">
                                Cerrar
                         </button>

                        </Modal.Footer>
                    </Modal>


                </div>
            );
        } else {

            return (
                <div>
                    <Fab color="primary" aria-label="add" onClick={this.openModal} >
                        <AddIcon onClick={this.openModal} />
                    </Fab>

                    <Modal show={this.state.open} onHide={this.onCloseModal} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>SUBIR DOCUMENTO</Modal.Title>
                        </Modal.Header>
                        <strong style={{ textAlign: 'center', fontSize: '16px' }}>¡Recuerda!</strong>
                        <h5 style={{ textAlign: 'center', fontSize: '16px' }}>Solo se pueden subir documentos con formato .pdf </h5>
                        <Modal.Body>

                            <form onSubmit={this.saveDocOficial} className="nuevo-doc" enctype="multipart/form-data">
                                <div className="form-subir">
                                    <label for="tittle">Seleccionar documento:</label>
                                    <select className="form-input-nuevo" ref={this.nombreRef} onChange={this.handleChange('nombre')}>
                                        <option selected value=""></option>
                                        <option value="CPRA">CPRA</option>
                                        <option value="Learning_Agreement">Learning Agreement</option>
                                        <option value="Modificacion_CPRA">Modificacion CPRA</option>
                                        <option value="Modificacion_LA">Modificacion LA</option>
                                    </select>
                                    {this.validator.message('tittle', this.state.nombre, 'required')}
                                </div>
                                <div id="div_file" className="form-subir">
                                    {/*} <label htmlFor="file0"> URL: </label>*/}
                                    {this.state.message != "" &&
                                        <label id="toast" style={{ display: 'none', color: 'red' }}>{this.state.message}</label>
                                    }
                                    <input type="file" name="file0" onChange={this.fileChange} ref={this.fileRef} className="form-input-nuevo" />
                                    {this.validator.message('file0', this.state.selectedFile, 'required')}
                                </div>
                                <input type="submit" value="SUBIR" className="btn-submit" ></input>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button variant="secondary" onClick={this.onCloseModal} className="btn-cerrar">
                                Cerrar
                             </button>

                        </Modal.Footer>
                    </Modal>


                </div>

            );
        }
    }
}

export default NuevoDocumento;