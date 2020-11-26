import React, { Component } from 'react';

import Menu from './menu-mensajes';
import Global from '../../GlobalMensaje';
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'bootstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class responder extends Component {

    url = Global.url;

    state = {
        identity: JSON.parse(localStorage.getItem('user')),
        mensaje: [],
        status: "",
        texto:"",
        nuevoMensaje:{},
    }

    componentWillMount() {
        this.getMessage();

    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }

    getMessage=(e)=> {
        var id = this.props.match.params.id;

        axios.get(this.url + 'mensaje/' + id)
            .then(res => {
                this.setState({
                    mensaje: res.data.mensajes
                })
            })
    }

    addMessage = (e) => {
        e.preventDefault();

        if (this.state.identity.tipo === 'Alumno' && this.state.mensaje[0].emisor.alumno != null) {
            var mensaje = {
                texto: this.state.texto,
                asunto: this.state.mensaje[0].asunto,
                emisor: { alumno: this.state.identity._id },
                receptor: { alumno: this.state.mensaje[0].emisor.alumno._id },
                tipo: 'Alumno',
            }
        } else if (this.state.identity.tipo === 'Alumno' && this.state.mensaje[0].emisor.profesor != null) {
            var mensaje = {
                texto: this.state.texto,
                asunto: this.state.mensaje[0].asunto,
                emisor: { alumno: this.state.identity._id },
                receptor: { profesor: this.state.mensaje[0].emisor.profesor._id },
                tipo:'profesor',
            }
        } else if (this.state.identity.tipo === 'profesor' && this.state.mensaje[0].emisor.alumno != null) {
            var mensaje = {
                texto: this.state.texto,
                asunto:this.state.mensaje[0].asunto,
                emisor: { profesor: this.state.identity._id },
                receptor: { alumno: this.state.mensaje[0].emisor.alumno._id },
                tipo:'Alumno',
            }
        } else if (this.state.identity.tipo === 'profesor' && this.state.mensaje[0].emisor.profesor != null) {
            var mensaje = {
                texto: this.state.texto,
                asunto: this.state.mensaje[0].asunto,
                emisor: { profesor: this.state.identity._id },
                receptor: { profesor: this.state.mensaje[0].emsior.profesor._id },
                tipo:'profesor',
            }
        }

        console.log(mensaje);


        axios.post(this.url + 'mensaje', mensaje)
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

            this.formularioEnBlanco();
        }
    
        formularioEnBlanco = () => {
            this.setState({
                texto: "",
               
    
            });
        }

    render() {
        var listarmensajes = this.state.mensaje.map((mensaje) => {
            return (
            
                <div>
                {this.state.status === 'sucess' &&
                    <div className="alert alert-success">

                        <strong>¡Correo enviado correctamente!</strong>
                        <button classsName="close" data-dismiss="alert"> <span>&times;</span></button>
                    </div>

                }
                {this.state.status === 'failed' &&
                    <div className="alert alert-danger">

                        <strong>¡Error!</strong> El correo no se pudo enviar correctamente
                    <button classsName="close" data-dismiss="alert"> <span>&times;</span></button>
                    </div>
                }

                

                <div>
                    <form onSubmit={this.addMessage} className="form-mensajeria">
                        <div className="mensaje-estilo-uno">
                            <p>
                                <label>Remitente</label>
                                <label id="remitente">{this.state.identity.nombre + " " + this.state.identity.apellido1 + " " + this.state.identity.apellido2 + " <" + this.state.identity.email + "> "}</label>
                            </p>
                            <div className="destinatario">
                                <label>Para</label>
                                {mensaje.emisor.alumno != null &&
                                  <label id="remitente">{mensaje.emisor.alumno.nombre + " " + mensaje.emisor.alumno.apellido1+ " "+ mensaje.emisor.alumno.apellido2 + " <"+ mensaje.emisor.alumno.email+ ">"}</label>
                                }
                                {mensaje.emisor.profesor != null &&
                                <label id="remitente">{mensaje.emisor.profesor.nombre + " " + mensaje.emisor.profesor.apellido1+ " "+ mensaje.emisor.profesor.apellido2 +" <"+ mensaje.emisor.profesor.email+ ">"}</label>
                                }
                             

                            </div>

                            <p>
                                <label>Asunto</label>
                                <label  id="remitente" >Re: {mensaje.asunto}</label>
                            </p>
                        </div>
                        <div className="mensaje-estilo-dos">
                                
                                    <textarea type="text" name="text" onChange={this.handleChange('texto')}  className="textarea-mensaje">  
                                    { ' \n\n\n\n\n\n\n\n\n\n  Re: ' + mensaje.texto} 
                                    </textarea>
                                    
                                
                        </div>
                        <input type="submit" value="ENVIAR" className="btn-enviar" ></input>
                    </form>
                </div>

            </div>
            )

        });
        return(
            <div className="grid-mensajeria-col">

            <Menu />


            <div>
                {listarmensajes}
            </div>
        </div>
        )
}
}

export default responder;