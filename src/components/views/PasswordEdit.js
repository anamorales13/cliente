import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';
import Global from '../../Global';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import "../../assets/css/Password.css";
import MenuPerfil from './MenuPerfil';
import SimpleReactValidator from 'simple-react-validator';
var bcrypt = require('bcrypt-nodejs');


class PasswordEdit extends Component {

  /*  passwordNuevaDos = React.createRef();
    passwordNueva = React.createRef();
    passwordActual = React.createRef();
*/


    url = Global.url;
    urlprofesor=Global.urlprofesor;

    constructor(props) {
        super(props);
        this.state = {
            identity: null,
            alumno: {},
            passwordNueva:"",
            passwordNuevaDos: "",
            passwordActual:"",
           /* passwordActual: {},*/
            errores: {
                actual: null,
                nueva: null,
                nuevarep: null,
            },
            numerador: 0,

        }

    }




    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido', //PERSONALIZAR MENSAJES DE ERROR
                min: 'La contraseña debe contener como mínimo 8 caracteres'

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
                password: this.passwordNueva.current.value,
            },

            passwordNuevaDos: this.passwordNuevaDos.current.value,
            passwordActual: {
                password: this.passwordActual.current.value
            }

        });


    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }

    cambiarError(name) {
        document.getElementById(name).style.borderColor = 'rgb(251,13,13,1)';

    }



    updatePassword = (e) => {
        e.preventDefault();

        var currentlypassword={
            password: this.state.passwordActual
        }

        var nueva={
            password: this.state.passwordNueva
        }

        console.log(currentlypassword);
        console.log(nueva);

        if(this.state.identity==='Alumno'){
        if (this.state.passwordActual != "" && this.state.passwordNuevaDos != "" && this.state.passwordNueva != "") {
            if (this.validator.fieldValid('min')) {
                /* if(this.validator.allValid()){*/
                   
                axios.post(this.url + 'compararPassword/' + this.state.identity._id, currentlypassword)
                    .then(res => {
                        if (res.data.status == 'sucess') {
                            if (this.state.passwordNueva == this.state.passwordNuevaDos) {
                                
                                axios.put(this.url + 'update-password/' + this.state.identity._id, nueva)
                                    .then(res => {
                                        if (res.data.alumno) {
                                            this.setState({
                                                alumno: res.data.alumno,
                                                status: 'sucess'
                                            });

                                        } else {
                                            this.setState({
                                                status: 'failed'
                                            });
                                        }
                                    });
                            } else {
                                this.setState({
                                    errores: {
                                        nueva: 'No coinciden las contraseñas',
                                        nuevarep: 'No coinciden las contraseñas'
                                    },
                                    
                                });
                               /* this.cambiarError('input-error2');
                                this.cambiarError('input-error3');*/
                            }
                        } else //no son iguales
                        {
                            this.setState({
                                errores: {
                                    actual: 'Contraseña incorrecta'
                                },
                                

                            });
                           /* this.cambiarError('input-error')*/

                            console.log("error");
                        }
                    });
            } else {
                this.validator.showMessages();
                this.forceUpdate();
            }
        } else {
            this.validator.showMessages();

        }
    }else{
        console.log("profesor")
        if (this.state.passwordActual != null && this.state.passwordNuevaDos != null && this.state.passwordNueva != null) {
           // if (this.validator.fieldValid('min')) {
                console.log("no estan vacias");
                /* if(this.validator.allValid()){*/
                axios.post(this.urlprofesor + 'compararPassword/' + this.state.identity._id, currentlypassword)
                    .then(res => {
                        console.log("2");
                        if (res.data.status == 'sucess') {
                            if (this.state.passwordNueva == this.state.passwordNuevaDos) {
                                console.log("son iguales");
                                axios.put(this.urlprofesor + 'update-password/' + this.state.identity._id, nueva)
                                    .then(res => {
                                        if (res.data.profesor) {
                                            this.setState({
                                                alumno: res.data.profesor,
                                                status: 'sucess'
                                            });

                                            swal({
                                                title: 'Documento creado con exito',
                                                text: "El documento ha sido creado correctamente",
                                                icon: "sucess",
                                                buttons: true,
                                            })
                                        } else {
                                            this.setState({
                                                status: 'failed'
                                            });
                                        }
                                    });
                            } else {
                                this.setState({
                                    errores: {
                                        nueva: 'No coinciden las contraseñas',
                                        nuevarep: 'No coinciden las contraseñas'
                                    },
                                    
                                });
                               /* this.cambiarError('input-error2');
                                this.cambiarError('input-error3');*/
                            }
                        } else //no son iguales
                        {
                            this.setState({
                                errores: {
                                    actual: 'Contraseña incorrecta'
                                },
                                

                            });
                           /* this.cambiarError('input-error')*/

                            console.log("error");
                        }
                    });
           /* } else {
                console.log("no");
                this.validator.showMessages();
                this.forceUpdate();
            }*/
        } else {
            console.log("no2")
            this.validator.showMessages();

        }

    }

        this.forceUpdate();
        this.formularioEnBlanco();

    }

    formularioEnBlanco=()=>{
        this.setState({
            passwordActual:"",
            passwordNueva:"",
            passwordNuevaDos:""
        })
    }

    render() {
        this.validator.purgeFields();
        return (

            <div id="content" className="grid-passw">
                <MenuPerfil />
                <div>
                    <h1 className="titulo"> Contraseña </h1>

                    <article className="elemt-one-passw">

                        <form className="elemt-form-passw" onSubmit={this.updatePassword} noValidate>
                            <div className="form-edit">
                            
                                <label className="form-editpassw-value-title">Contraseña actual</label>
                                <input id="input-error" className="form-editpassw-value" name="actual" value={this.state.passwordActual} onChange={this.handleChange('passwordActual')} type="password" ref={this.passwordActual} required></input>
                                <div className="error" >
                                    {this.validator.message('actual', this.state.passwordActual, 'required')}
                                </div>

                                {this.state.errores.actual != undefined &&
                                    <label className="error"> {this.state.errores.actual.toString()}</label>

                                }

                            </div>
                            <label style={{ colore: 'grey', fontSize: '12px' }}>Las contraseñas deben de contener entre 8-12 caracteres. No incluir espacios, caracteres especiales o iconos</label>
                            <div className="form-edit">
                                <label className="form-editpassw-value-title">Nueva contraseña</label>
                                <input id="input-error2" className="form-editpassw-value" name="nueva" value={this.state.passwordNueva}  onChange={this.handleChange('passwordNueva')} type="password" ref={this.passwordNueva} required></input>
                                <div className="error">
                                    {this.validator.message('nueva', this.state.passwordNueva, 'required|min:8')}
                                </div>
                                {this.state.errores.nueva != undefined &&
                                    <label className="error"> {this.state.errores.nueva.toString()}</label>
                                }
                            </div>
                            <div className="form-edit">
                                <label className="form-editpassw-value-title">Vuelve a escribir la nueva contraseña</label>
                                <input id="input-error3" className="form-editpassw-value" name="nuevarep" value={this.state.passwordNuevaDos}  onChange={this.handleChange('passwordNuevaDos')} type="password" ref={this.passwordNuevaDos} required></input>
                                <div className="error">
                                    {this.validator.message('nuevarep', this.state.passwordNuevaDos, 'required|min:8')}
                                </div>
                                {this.state.errores.nuevarep != undefined &&
                                    <label className="error"> {this.state.errores.nuevarep.toString()}</label>
                                }
                            </div>
                            <input type="submit" value="ACTUALIZAR" className="btn-update" ></input>
                        </form>
                    </article>
                </div>
            </div>
        );
    }




}

export default PasswordEdit;