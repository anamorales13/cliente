

import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import imagenlogo from '../../assets/images/logo-erasmus.png';
import Card from 'react-bootstrap/Card';
import '../../assets/css/NuevoUsuario.css';
import { Link } from 'react-router-dom';
import Global from '../../Global';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';



export class FormDatosPersonales extends Component {

    url = Global.url;


    state = {
        errors: {}
    }

    validate = e => {
        const errors = {};
        let regex = new RegExp("^[a-z A-Z À-ÿ\u00f1\u00d1 ]+$");
        let regexnumeros = new RegExp("[0-9]{9}");

        //NOMBRE 
        if (!this.props.values.nombre) {
            errors.nombre = "Campo obligatorio";
        } else {
            if (!regex.test(this.props.values.nombre)) {
                console.log(regex.test(this.props.values.nombre));
                errors.nombre = "No puede contener caracteres numéricos";
            }
        }

        //APELLIDOS
        if (!this.props.values.apellido1) {

            errors.apellido1 = "Campo obligatorio";
        } else {
            if (!regex.test(this.props.values.apellido1)) {
                errors.apellido1 = "No puede contener caracteres numéricos";
            }
        }
        if (!this.props.values.apellido2) {
            errors.apellido2 = "Campo obligatorio";
        } else {
            if (!regex.test(this.props.values.apellido2)) {
                errors.apellido2 = "No puede contener caracteres numéricos";
            }
        }

        //EMAIL 
        if (!this.props.values.email1) {
            errors.email1 = "Campo obligatorio";
        }

        if (!this.props.values.email2) {
            errors.email2 = "Campo obligatorio";
        }


        if (this.props.values.email1 != this.props.values.email2) {
            errors.email1 = "Los correos electrónicos deben de coincidir"
            errors.email2 = "Los correos electrónicos deben de coincidir"
        }

        //TELEFONO

        if (this.props.tipo === 'alumno') {


            if (this.props.values.telefono) {
                if (!regexnumeros.test(this.props.values.telefono)) {
                    errors.telefono = "Número no valido";
                }
            } else {
                errors.telefono = "Campo obligatorio";
            }
        }



        return errors;
    }


    continue = e => {
        e.preventDefault();
        console.log("hey");
        const { errors, ...sinErrors } = this.state;
        const result = this.validate(sinErrors);

        console.log(result);
        this.setState({ errors: result })
        if (!Object.keys(result).length) {
            console.log("hey2");
            this.props.nextStep();
        }
    }



    render() {


        const { values, handleChange, tipo } = this.props;


        return (
            <div>

                < div className="grid-inicio">

                    <div className="logo-titulo">
                        <img src={imagenlogo} width="100px" height="80px"></img>
                        <div className="titulo-completo">
                            <h3>Universidad de Huelva</h3>
                            <h1> ERASMUS+ </h1>
                        </div>
                    </div>
                    <hr className="linea"></hr>

                    < div className="registro-nuevoUsuario">
                        {tipo == 'alumno' &&
                            <h1 className="titulo titulo-registro "> ALTA DE ALUMNO/A</h1>
                        }
                        {tipo == 'profesor' &&
                            <h1 className="titulo titulo-registro " > ALTA DE PROFESOR/A</h1>
                        }
                        <h1 className="titulo titulo-registro titulo-registro-secundario" style={{ fontSize: '21px' }}> DATOS PERSONALES </h1>

                        <div className="subtitulo">Asegúrese de que todos los datos introducidos sean correctos </div>
                        
                        <Link to='/' className="link-cancelar">Cancelar registro de usuario</Link>
                        
                        <br />
                        
                        <Card className="card-nuevoUser">
                        
                            <Form>
                            {values.message != "" &&
                            <label className="subtitulo" style={{color: '#A6250E', backgroundColor: '#F7A99C', fontSize:'15px', textAlign:'center', display:'block'}}>Los datos coinciden con el de un usuario registrado</label>
                            }
                                <Form.Row>
                                    <Form.Group as={Col} >
                                        <Form.Control
                                            onChange={handleChange('nombre')}
                                            defaultValue={values.nombre}
                                            type="text"
                                            placeholder="Nombre *"
                                            name="nombre"
                                            value={values.nombre}
                                            required
                                            title="Introduce tu nombre."
                                        />
                                        {this.state.errors.nombre && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.nombre}</Form.Label>}
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} >

                                        <Form.Control
                                            onChange={handleChange('apellido1')}
                                            defaultValue={values.apellido1}
                                            type="text"
                                            name="apellido1"
                                            placeholder="Primer apellido *" />
                                        {this.state.errors.apellido1 && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.apellido1}</Form.Label>}
                                    </Form.Group>

                                    <Form.Group as={Col} >

                                        <Form.Control
                                            onChange={handleChange('apellido2')}
                                            defaultValue={values.apellido2}
                                            name="apellido2"
                                            type="text"
                                            placeholder="Segundo apellido *" />
                                        {this.state.errors.apellido2 && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.apellido2}</Form.Label>}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} >
                                        <InputGroup>
                                            <Form.Control
                                                onChange={handleChange('email1')}
                                                defaultValue={values.email1}
                                                type="email"
                                                placeholder="Correo electrónico *"
                                                name="email1" />

                                            {tipo == "alumno" &&
                                                < div className="input-group-append">
                                                    <span className="input-group-text" style={{ fontSize: '14px', border: 'solid 1px rgb(153, 153, 153)' }}>@alu.uhu.es</span>
                                                </div>
                                            }
                                            {tipo === 'profesor' &&
                                                < div className="input-group-append">
                                                    <span className="input-group-text" style={{ fontSize: '14px', border: 'solid 1px rgb(153, 153, 153)' }}>.uhu.es</span>
                                                </div>
                                            }





                                        </InputGroup>

                                        {this.state.errors.email1 && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.email1}</Form.Label>}

                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <InputGroup>
                                            <Form.Control
                                                onChange={handleChange('email2')}
                                                defaultValue={values.email2}
                                                type="email"
                                                placeholder="Repetir correo electrónico*"
                                                name="email2" />
                                            {tipo == "alumno" &&
                                                < div className="input-group-append">
                                                    <span className="input-group-text" style={{ fontSize: '14px', border: 'solid 1px rgb(153, 153, 153)' }}>@alu.uhu.es</span>
                                                </div>
                                            }
                                              {tipo === 'profesor' &&
                                                < div className="input-group-append">
                                                    <span className="input-group-text" style={{ fontSize: '14px', border: 'solid 1px rgb(153, 153, 153)' }}>.uhu.es</span>
                                                </div>
                                            }

                                        </InputGroup>
                                        {this.state.errors.email2 && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.email2}</Form.Label>}
                                    </Form.Group>
                                </Form.Row>
                                {tipo === 'alumno' &&
                                    <Form.Group >

                                        <Form.Control
                                            onChange={handleChange('telefono')}
                                            defaultValue={values.telefono}
                                            type="phone"
                                            name="phone"
                                            placeholder="Teléfono" />
                                        {this.state.errors.telefono && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.telefono}</Form.Label>}
                                    </Form.Group>
                                }

                                <button
                                    label="continue"
                                    className="btn-continue form-login"
                                    style={styles.button}
                                    onClick={this.continue}
                                >   CONTINUAR </button>
                            </Form>

                            <br></br>


                        </Card>

                    </div>


                </div>

            </div >
        );
    }
}

const styles = {
    button: { margin: 15 }
}

export default FormDatosPersonales;