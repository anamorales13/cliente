import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/css/MiPerfil.css";

import Global from '../../Global';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import MenuPerfil from './MenuPerfil';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

import SimpleReactValidator from 'simple-react-validator';

class EditPerfil extends Component {

    state = {
        identity: null,
        alumno: {},
        profesor: {},
        alumnoNuevo: {},
        profesorNuevo: {},
        selectedFile: null,
        token: "",
        navigate: false,
    }



    nombreRef = React.createRef();
    usuarioRef = React.createRef();
    emailRef = React.createRef();
    telefonoRef = React.createRef();
    edificioRef = React.createRef();
    despachoRef = React.createRef();
    apellido1Ref = React.createRef();
    apellido2Ref = React.createRef();
    imageRef = React.createRef();
    datosRef = React.createRef();
    tutoriasRef = React.createRef();

    url = Global.url;

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio',
                alpha_space: 'No puede contener carácteres numéricos',
                phone: 'Debe de ser un número de teléfono válido'
            },
            email: {
                messages: 'Correo invalido. Ej: usuario.usuario@alu.uhu.es',
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /([a-zA-Z]+.[a-zA-Z]+(@alu.uhu.es)$)/i) && params.indexOf(val) === -1
                }
            }
        });
    }

    componentDidMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
    }


    changeState = () => {
        this.setState({
            alumno: {
                nombre: this.nombreRef.current.value,
                usuario: this.usuarioRef.current.value,
                apellido1: this.apellido1Ref.current.value,
                apellido2: this.apellido2Ref.current.value,
                email: this.emailRef.current.value,
                telefono: this.telefonoRef.current.value,




            }
        });

    }

    changeStateProfesor = () => {
        this.setState({
            profesor: {
                nombre: this.nombreRef.current.value,
                usuario: this.usuarioRef.current.value,
                apellido1: this.apellido1Ref.current.value,
                apellido2: this.apellido2Ref.current.value,
                email: this.emailRef.current.value,
                telefono: this.telefonoRef.current.value,
                edificio: this.edificioRef.current.value,
                despacho: this.despachoRef.current.value,
                datos: this.datosRef.current.value,
                tutoria: this.tutoriasRef.current.value,



            }
        });
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0] //aqui tengo el fichero que quiero subir.

        });

    }

    updateUser = (e) => {
        e.preventDefault();

        this.changeState();
        console.log("HOLA");
        if (this.validator.allValid()) {
            axios.put(this.url + 'update-user/' + this.state.identity._id, this.state.alumno)
                .then(res => {
                    console.log("HOLA2");
                    this.setState({
                        alumno: res.data.user,
                        status: 'sucess',

                    });
                    console.log("prueba alumno:" + this.state.alumno.telefono);
                    localStorage.setItem('user', JSON.stringify(this.state.alumno));

                    swal(
                        '¡Perfil Actualizado!',
                        'Su perfil ha sido actualizado correctamente',
                        'sucess'
                    )
                })
                .catch(err => {
                    this.setState({
                        alumno: {},
                        status: 'failed'
                    });
                });
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }



    }

    updateUserProfesor = (e) => {
        e.preventDefault();
        this.changeStateProfesor();

        if (this.validator.allValid()) {
            axios.put('https://plataforma-erasmus.herokuapp.com/apiProfesor/update-user/' + this.state.identity._id, this.state.profesor)
                .then(res => {
                    console.log("HOLA2");
                    this.setState({
                        profesor: res.data.user,
                        status: 'sucess',

                    });
                    console.log("prueba alumno:" + this.state.profesor.edificio);
                    localStorage.setItem('user', JSON.stringify(this.state.profesor));

                    swal(
                        '¡Perfil Actualizado!',
                        'Su perfil ha sido actualizado correctamente',
                        'sucess'
                    )
                })
                .catch(err => {
                    this.setState({
                        profesor: {},
                        status: 'failed'
                    });
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }


    }

    updateImage = (e) => {
        e.preventDefault();


        console.log(this.state.selectedFile.name);
        const formData = new FormData();
        formData.append(  //le vamos a vincular un fichero
            'file0',
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        //1º eliminamos la imagen anterior
        console.log("eliminar");
        axios.delete(this.url + '/delete-image/' + this.state.identity._id)
            .then(res => {
                console.log("sucess");

            });

        axios.post(this.url + '/upload-image-user/' + this.state.identity._id, formData)
            .then(res => {
                console.log("actualizacion realizada")
                this.setState({
                    alumnoNuevo: res.data.alumno,
                    status: 'sucess',
                    navigate: true
                })
                localStorage.setItem('user', JSON.stringify(this.state.alumnoNuevo));
            })

    }

    updateImageProfesor = (e) => {
        e.preventDefault();

        console.log(this.state.selectedFile.name);
        const formData = new FormData();
        formData.append(  //le vamos a vincular un fichero
            'file0',
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        //1º eliminamos la imagen anterior
        console.log("eliminar");
        axios.delete('https://plataforma-erasmus.herokuapp.com/apiProfesor/delete-image/' + this.state.identity._id)
            .then(res => {
                console.log("sucess");

            });

        axios.post('https://plataforma-erasmus.herokuapp.com/apiProfesor/upload-image-user/' + this.state.identity._id, formData)
            .then(res => {
                console.log("actualizacion realizada")
                this.setState({
                    profesorNuevo: res.data.profesor,
                    status: 'sucess',
                    navigate: true
                })
                localStorage.setItem('user', JSON.stringify(this.state.profesorNuevo));
            })
    }


    render() {
        const { navigate } = this.state
        if (navigate) {
            window.location.reload(true);
        }

        return (
            <div>
                {this.state.identity.tipo === 'Alumno' &&

                    <div id="content" className="grid">
                        <MenuPerfil />
                        <div className="avatar-edit" id="avatar-big">
                            <img src={this.url + '/get-image-user/' + this.state.identity.image} classname=" avatar-edit"></img>

                        </div>
                        <div>
                            <h1 className="titulo"> Editar Perfil </h1>
                            <div className="avatar-edit" id="avatar-responsive">
                                <img src={this.url + '/get-image-user/' + this.state.identity.image} classname=" avatar-edit"></img>

                            </div>
                            <article className=" elemt-one-edit">

                                <Form className="elemt-form" onSubmit={this.updateUser}>
                                    <Form.Group className="form-edit">
                                        <label className="form-edit-value-title">Nombre </label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeState}
                                            type="text"
                                            defaultValue={this.state.identity.nombre}
                                            ref={this.nombreRef} />
                                        {this.validator.message('nombre', this.state.alumno.nombre, 'required|alpha_space', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit">
                                        <label className="form-edit-value-title">Primer apellido</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeState}
                                            type="text"
                                            defaultValue={this.state.identity.apellido1}
                                            ref={this.apellido1Ref} />
                                        {this.validator.message('apellido1', this.state.alumno.apellido1, 'required|alpha_space', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit">
                                        <label className="form-edit-value-title">Segundo apellido</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeState}
                                            type="text"
                                            defaultValue={this.state.identity.apellido2}
                                            ref={this.apellido2Ref} />
                                        {this.validator.message('apellido2', this.state.alumno.apellido2, 'required|alpha_space', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit">
                                        <label className="form-edit-value-title">Usuario</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeState}
                                            type="text"
                                            defaultValue={this.state.identity.usuario}
                                            ref={this.usuarioRef} />
                                        {this.validator.message('usuario', this.state.alumno.usuario, 'required', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit">
                                        <label className="form-edit-value-title">Email</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeState}
                                            type="text"
                                            defaultValue={this.state.identity.email}
                                            ref={this.emailRef} />
                                        {this.validator.message('email', this.state.alumno.email, 'required', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit">
                                        <label className="form-edit-value-title">Teléfono</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeState}
                                            type="text"
                                            defaultValue={this.state.identity.telefono}
                                            ref={this.telefonoRef} />
                                        {/* {this.validator.message('telefono', this.state.alumno.telefono, 'phone', { className: 'text-danger' })}*/}
                                    </Form.Group>




                                    <input type="submit" value="ACTUALIZAR" className="btn-update" ></input>
                                </Form>


                            </article>

                            <article className="elemt-one">
                                <Form className="elemt-formImage" onSubmit={this.updateImage}>
                                    <div className="form-editImage">
                                        <label className="form-editImage-value-title">Imagen de perfil</label>
                                        <br />
                                        <input className="form-editImage-value" type="file" name="file0" onChange={this.fileChange} required />

                                    </div>
                                    <input type="submit" value="ACTUALIZAR" className="btn-update" ></input>
                                </Form>
                            </article>
                        </div>
                    </div>
                }
                {this.state.identity.tipo === 'profesor' || this.state.identity.tipo === 'administrador' &&
                    <div id="content" className="grid">
                        <MenuPerfil />
                        <div className="avatar" id="avatar-big">
                            <img src={'https://plataforma-erasmus.herokuapp.com/apiProfesor/get-image-user/' + this.state.identity.image} classname=" avatar-edit"></img>

                        </div>
                        <div>
                            <h1 className="titulo"> Editar Perfil </h1>
                            <div className="avatar" id="avatar-responsive">
                                <img src={'https://plataforma-erasmus.herokuapp.com/apiProfesor/get-image-user/' + this.state.identity.image} classname=" avatar-edit"></img>

                            </div>
                            <article className="elemt-one-edit">

                                <Form className="elemt-form" onSubmit={this.updateUserProfesor}>
                                    <Form.Group className="form-edit" style={{ marginBottom: '0.8em' }}>
                                        <label className="form-edit-value-title">Nombre </label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeStateProfesor}
                                            type="text"
                                            defaultValue={this.state.identity.nombre}
                                            ref={this.nombreRef} />

                                        {this.validator.message('nombre', this.state.profesor.nombre, 'required|alpha_space', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit" style={{ marginBottom: '0.8em' }}>
                                        <label className="form-edit-value-title">Primer apellido</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeStateProfesor}
                                            type="text"
                                            defaultValue={this.state.identity.apellido1}
                                            ref={this.apellido1Ref} />
                                        {this.validator.message('apellido1', this.state.profesor.apellido1, 'required|alpha_space', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit" style={{ marginBottom: '0.8em' }}>
                                        <label className="form-edit-value-title">Segundo apellido</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeStateProfesor}
                                            type="text"
                                            defaultValue={this.state.identity.apellido2}
                                            ref={this.apellido2Ref} />
                                        {this.validator.message('apellido2', this.state.profesor.apellido2, 'required|alpha_space', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit" style={{ marginBottom: '0.8em' }}>
                                        <label className="form-edit-value-title">Usuario</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeStateProfesor}
                                            type="text"
                                            defaultValue={this.state.identity.usuario}
                                            ref={this.usuarioRef} />
                                        {this.validator.message('usuario', this.state.profesor.usuario, 'required', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit" style={{ marginBottom: '0.8em' }}>
                                        <label className="form-edit-value-title">Correo electrónico</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeStateProfesor}
                                            type="text"
                                            defaultValue={this.state.identity.email}
                                            ref={this.emailRef} />
                                        {this.validator.message('email', this.state.profesor.email, 'required', { className: 'text-danger' })}
                                    </Form.Group>
                                    <Form.Group className="form-edit" style={{ marginBottom: '0.8em' }}>
                                        <label className="form-edit-value-title">Teléfono</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeStateProfesor}
                                            type="text"
                                            defaultValue={this.state.identity.telefono}
                                            ref={this.telefonoRef} />
                                        {/*  {this.validator.message('telefono', this.state.profesor.telefono, 'phone', { className: 'text-danger' })}*/}
                                    </Form.Group>

                                    <Form.Group className="form-edit" style={{ marginBottom: '0.8em' }}>
                                        <label className="form-edit-value-title">Edificio</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeStateProfesor}
                                            type="text"
                                            defaultValue={this.state.identity.edificio}
                                            ref={this.edificioRef}
                                            maxLength="50" />
                                        {this.validator.message('edificio', this.state.profesor.edificio, 'required', { className: 'text-danger' })}
                                    </Form.Group>

                                    <Form.Group className="form-edit" style={{ marginBottom: '0.8em' }}>
                                        <label className="form-edit-value-title">Numero despacho</label>
                                        <Form.Control
                                            className="form-edit-value"
                                            onChange={this.changeStateProfesor}
                                            type="number"
                                            defaultValue={this.state.identity.despacho}
                                            ref={this.despachoRef} />
                                        {this.validator.message('despacho', this.state.profesor.despacho, 'required', { className: 'text-danger' })}
                                    </Form.Group>

                                    <Form.Group className="form-edit" style={{ marginBottom: '1.2em' }}>
                                        <label className="form-edit-value-title ">Datos de interes</label>
                                        <textarea
                                            className=" form-control form-edit-value form-edit-value-textarea"
                                            style={{ resize: 'none' }}
                                            onChange={this.changeStateProfesor}
                                            type="textarea"
                                            defaultValue={this.state.identity.datos}
                                            ref={this.datosRef}
                                            maxLength="80" />

                                    </Form.Group>
                                    <Form.Group className="form-edit" style={{ marginBottom: '1.5em' }}>
                                        <label className="form-edit-value-title">Tutorias</label>
                                        <textarea
                                            className=" form-control form-edit-value form-edit-value-textarea"
                                            style={{ resize: 'none' }}
                                            onChange={this.changeStateProfesor}
                                            type="textarea"
                                            defaultValue={this.state.identity.tutoria}
                                            ref={this.tutoriasRef}
                                            maxLength="80"
                                        />

                                    </Form.Group>

                                    <input type="submit" value="ACTUALIZAR" className="btn-update" style={{ float: 'right' }}></input>
                                </Form>


                            </article>

                            <article className="elemt-one-edit">
                                <form className="elemt-formImage" onSubmit={this.updateImageProfesor}>
                                    <div className="form-editImage">
                                        <label className="form-editImage-value-title">Imagen de perfil</label>
                                        <br />
                                        <input className="form-editImage-value" type="file" name="file0" onChange={this.fileChange} required />

                                    </div>
                                    <input type="submit" value="ACTUALIZAR" className="btn-update" ></input>
                                </form>
                            </article>
                        </div>
                    </div>
                }
            </div>
        );
    }




}

export default EditPerfil;
