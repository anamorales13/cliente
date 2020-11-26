import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import imagenlogo from '../../assets/images/logo-erasmus.png';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

import { Link } from 'react-router-dom';

export class FormDatosPlataforma extends Component {

    state = {
        errors: {}
    }

    validate = e => {
        const errors = {};
        let regex = new RegExp("[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~ ]+");
        let regexnumeros = new RegExp("[0-9]{9,}");

        //USUARIO 
        if (!this.props.values.usuario) {
            errors.usuario = "Campo obligatorio";
        }


        //PASSWORD 
        if (!this.props.values.password1) {
            errors.password1 = "Campo obligatorio";
        } else {
            if (regex.test(this.props.values.password1)) {
                errors.password1 = "No puede contener carácteres especiales o espacios";
            }
            if (this.props.values.password1.length < 8 || this.props.values.password1.length > 12) {
                errors.password1 = "Debe de tener entre 8-12 carácteres";
            }
        }

        if (!this.props.values.password2) {
            errors.password2 = "Campo obligatorio";
        } else {
            if (regex.test(this.props.values.password2)) {
                errors.password2 = "No puede contener carácteres especiales o espacios";
            }
            if (this.props.values.password2.length < 8 || this.props.values.password2.length > 12) {
                errors.password2 = "Debe de tener entre 8-12 carácteres";
            }
        }

        if (this.props.values.password1 != this.props.values.password2) {
            errors.password1 = "Las contraseñas deben de coincidir"
            errors.password2 = "Las contraseñas deben de coincidir"
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
            <div className="grid-inicio">
                <div className="logo-titulo">
                    <img src={imagenlogo} width="100px" height="80px"></img>
                    <div className="titulo-completo">
                        <h3>Universidad de Huelva</h3>
                        <h1> ERASMUS+ </h1>
                    </div>
                </div>
                <hr className="linea"></hr>

                <div className="registro-nuevoUsuario">
                    {tipo === 'alumno' &&
                        <h1 className="titulo titulo-registro "> ALTA DE ALUMNO/A</h1>
                    }
                    {tipo === 'profesor' &&
                        <h1 className="titulo titulo-registro " > ALTA DE PROFESOR/A</h1>
                    }
                    <h1 className="titulo titulo-registro titulo-registro-secundario"> DATOS PLATAFORMA </h1>
                    <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>
                    <Link to='/' className="link-cancelar">Cancelar registro de usuario</Link><br />
                    <Card className="card-nuevoUser">
                        <Form>
                            <Form.Group >
                                <Form.Control
                                    placeholder="Usuario"
                                    onChange={handleChange('usuario')}
                                    defaultValue={values.usuario} />
                                {this.state.errors.usuario && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.usuario}</Form.Label>}
                            </Form.Group>
                            <label style={{ colore: 'grey', fontSize: '12px' }}>La contraseña debe de contener entre 8-12 carácteres. No incluir espacios, carácteres especiales o iconos</label>
                            <Form.Row>

                                <Form.Group as={Col} >

                                    <Form.Control
                                        onChange={handleChange('password1')}
                                        defaultValue={values.password1}
                                        type="password"
                                        type="password"
                                        placeholder="Contraseña" />

                                    {this.state.errors.password1 && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.password1}</Form.Label >}

                                </Form.Group>
                                <Form.Group as={Col}>

                                    <Form.Control
                                        onChange={handleChange('password2')}
                                        defaultValue={values.password2}
                                        type="password"
                                        type="password"
                                        placeholder="Repetir contraseña" />


                                    {this.state.errors.password1 && <Form.Label style={{ color: 'red', fontSize: '12px' }}>{this.state.errors.password1}</Form.Label >}

                                </Form.Group>
                            </Form.Row>

                            <button
                                label="continue"
                                className="btn-continue form-login"
                                style={styles.button}
                                onClick={this.continue}
                            >   CONTINUAR </button>
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
        );
    }
}

const styles = {
    button: { margin: 15 }
}

export default FormDatosPlataforma;