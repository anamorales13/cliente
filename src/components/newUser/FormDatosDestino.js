
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

export class FormDatosUniversidad extends Component {

    url = Global.url;

    state = {
        errors: {}
    }

    validate = e => {
        const errors = {};
        let regexnumeros = new RegExp("[0-9]{9}");
        //EDIFICIO 
        if (!this.props.values.edificio) {
            errors.edificio = "Campo obligatorio";
        }

        //DESPACHO 
        if (!this.props.values.despacho) {
            errors.despacho = "Campo obligatorio";
        }
        if (!this.props.values.telefono) {
            errors.telefono = "Campo obligatorio";
        }
        else {
            if (!regexnumeros.test(this.props.values.telefono)) {
                errors.telefono = "Número no valido";
            }
        }

        return errors;
    }

    continue = e => {
        e.preventDefault();
        const { errors, ...sinErrors } = this.state;
        const result = this.validate(sinErrors);

        this.setState({ errors: result })
        if (!Object.keys(result).length) {
            this.props.nextStep();
        }
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
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
                        <h1 className="titulo titulo-registro "> ALTA DE PROFESOR/A</h1>
                        <h1 className="titulo titulo-registro titulo-registro-secundario"> DATOS UNIVERSIDAD </h1>
                        <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>
                        <Link to='/' className="link-cancelar">Cancelar registro de usuario</Link>
                        <br />
                        <Card className="card-nuevoUser">

                            <Form>
                                <Form.Group >

                                    <Form.Control
                                        onChange={handleChange('edificio')}
                                        defaultValue={values.edificio}
                                        type="text"
                                        name="edificio"
                                        placeholder="Edificio" />
                                    {this.state.errors.edificio && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.edificio}</Form.Label>}
                                </Form.Group>
                                <Form.Group >

                                    <Form.Control
                                        onChange={handleChange('despacho')}
                                        defaultValue={values.despacho}
                                        type="number"
                                        name="despacho"
                                        placeholder="Número de despacho" />
                                    {this.state.errors.despacho && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.despacho}</Form.Label>}
                                </Form.Group>
                                <Form.Group >

                                    <Form.Control
                                        onChange={handleChange('telefono')}
                                        defaultValue={values.telefono}
                                        type="phone"
                                        name="phone"
                                        placeholder="Teléfono" />
                                    {this.state.errors.telefono && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.telefono}</Form.Label>}
                                </Form.Group>
                                <Form.Group >

                                    <textarea
                                        className="form-control-textarea"
                                        style={{ width: '380px', height: '50px' }}
                                        onChange={handleChange('datos')}
                                        defaultValue={values.datos}
                                        type="textarea"
                                        name="datos"
                                        placeholder="Datos de interés" />

                                </Form.Group>


                                <button
                                    label="continue"
                                    className="btn-continue form-login"
                                    style={styles.button}
                                    onClick={this.continue}
                                    formnovalidate
                                > CONTINUAR </button>
                                <button
                                    label="volver"
                                    className="btn-back form-login"
                                    style={styles.button}
                                    onClick={this.back}
                                > VOLVER </button>
                            </Form>
                            <br></br>


                        </Card>

                    </div>


                </div>

            </div>
        );
    }
}

const styles = {
    button: { margin: 15 }
}

export default FormDatosUniversidad;