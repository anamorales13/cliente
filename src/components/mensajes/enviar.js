import React, { Component } from 'react';

import Menu from './menu-mensajes';
import Global from '../../GlobalMensaje';
import axios from 'axios';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Spinner from 'react-bootstrap/Spinner';
import SimpleReactValidator from 'simple-react-validator';

class enviar extends Component {

    state = {
        title: 'Enviar mensaje',
        usuarios: [],
        profesor: [],
        identity: JSON.parse(localStorage.getItem('user')),
        status: 'false',
        tags: "",
        texto: "",
        asunto: "",

    }


    paraRef = React.createRef();
    asuntoRef = React.createRef();
    mensajeRef = React.createRef();

    urlprofesor = Global.urlprofesor;
    url = Global.url;

    constructor(props) {
        super(props)

        this.listarProfesores();
        this.listarAlumnos();

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio',
            }
        });
    }

    /*componentWillMount() {

        this.listarProfesores();
        this.listarAlumnos();


    }*/

    listarProfesores() {
        axios.get('https://plataforma-erasmus.herokuapp.com/apiProfesor/' + 'profesores')
            .then(res => {

                this.setState({
                    profesor: res.data.profesor,

                });
            });

        console.log(this.state.usuarios.length)

    }

    listarAlumnos() {
        axios.get('https://plataforma-erasmus.herokuapp.com/apiErasmus/alumnos')
            .then(res => {
                this.setState({
                    usuarios: res.data.alumno
                })
            })



    }


    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }

    addMessage = (e) => {
        e.preventDefault();
        console.log(this.state.tags.tipo);
        console.log(this.state.identity.tipo)

        if (this.state.identity.tipo == 'Alumno' && this.state.tags.tipo == 'Alumno') {
            var mensaje = {
                texto: this.state.texto,
                asunto: this.state.asunto,
                emisor: { alumno: this.state.identity._id },
                receptor: { alumno: this.state.tags._id },
                tipo: this.state.tags.tipo,
            }
        } else if (this.state.identity.tipo == 'Alumno' && this.state.tags.tipo == 'profesor') {
            var mensaje = {
                texto: this.state.texto,
                asunto: this.state.asunto,
                emisor: { alumno: this.state.identity._id },
                receptor: { profesor: this.state.tags._id },
                tipo: this.state.tags.tipo,
            }
        } else if (this.state.identity.tipo == 'profesor' && this.state.tags.tipo == 'Alumno') {
            var mensaje = {
                texto: this.state.texto,
                asunto: this.state.asunto,
                emisor: { profesor: this.state.identity._id },
                receptor: { alumno: this.state.tags._id },
                tipo: this.state.tags.tipo,
            }
        } else if (this.state.identity.tipo == 'profesor' && this.state.tags.tipo == 'profesor') {
            var mensaje = {
                texto: this.state.texto,
                asunto: this.state.asunto,
                emisor: { profesor: this.state.identity._id },
                receptor: { profesor: this.state.tags._id },
                tipo: this.state.tags.tipo,
            }
        } else if(this.state.identity.tipo==='administrador' && this.state.tags.tipo=='profesor'){
            var mensaje={
                texto: this.state.texto,
                asunto: this.state.asunto,
                emisor: { profesor: this.state.identity._id },
                receptor: { profesor: this.state.tags._id },
                tipo: this.state.tags.tipo,
            }
        }else if(this.state.identity.tipo==='administrador' && this.state.tags.tipo ==='Alumno'){
            var mensaje={
                texto: this.state.texto,
                asunto: this.state.asunto,
                emisor: { profesor: this.state.identity._id },
                receptor: { alumno: this.state.tags._id },
                tipo: this.state.tags.tipo,
            }
        }

        var elem = document.getElementById('fp-container');
        elem.style.display='block'


          if (this.validator.allValid()) {
        axios.post(this.url + 'mensaje', mensaje)
            .then(res => {

                elem.style.display='none'
                this.setState({
                    nuevoMensaje: res.data.mensaje,
                    status: 'sucess',

                });
                this.formularioEnBlanco();
                
            })
            .catch(err => {
                this.setState({

                    status: 'failed'
                });
            });
        }else{
            elem.style.display='none'
            this.forceUpdate();
            this.validator.showMessages();
        }
       
    }

    formularioEnBlanco = () => {
        this.setState({
            texto: "",
            asunto: "",
            tags: ""

        });
    }



    onTagsChange = (event, values) => {
        this.setState({
            tags: values
        }, () => {
            // This will output an array of objects
            // given by Autocompelte options property.

        });
    }


    render() {

        if (this.props.location.state != null) {
            const { mensajeId, emisor, texto } = this.props.location.state;
            console.log(this.texto)
        }


        return (

            <div>

                <div className="grid-mensajeria-col">

                    <Menu />

                    <div>
                        {this.state.status == 'sucess' &&
                            <div className="alert alert-success">

                                <strong>¡Correo enviado correctamente!</strong>
                                <button classsName="close" data-dismiss="alert"> <span>&times;</span></button>
                            </div>

                        }
                        {this.state.status == 'failed' &&
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
                                       
                                            <Autocomplete
                                                className="autocomplete"
                                                value={this.state.usuarios._id}
                                                name="destino"
                                                options={this.state.usuarios.concat(this.state.profesor)}
                                                onChange={this.onTagsChange}
                                                getOptionLabel={(option) => option.nombre + " " + option.apellido1 + " " + option.apellido2 + "  <" + option.email + "> "}
                                                style={{ width: 750 }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                          
                                    </div> <div style={{color: 'red', fontSize: '12px', marginLeft:'10em'}}> {this.validator.message('destino', this.state.tags, 'required') }</div>

                                    <p className="mensaje-asunto">
                                        <label>Asunto</label>
                                        <input type="text" onChange={this.handleChange('asunto')} ref={this.asuntoRef} name="asunto" id="asunto" value={this.state.asunto}></input>
                                        <div style={{color: 'red', fontSize: '12px', marginLeft:'10em'}}> {this.validator.message('asunto', this.state.asunto, 'required')}</div> 
                                    </p>
                                </div>
                                <div className="mensaje-estilo-dos">
                                
                                    {this.props.location.state != null
                                        ? <textarea type="text" name="text" onChange={this.handleChange('texto')} ref={this.mensajeRef} value={this.state.texto} placeholder="Escribe tu mensaje" className="textarea-mensaje">     {this.texto}</textarea>
                                        : <textarea type="text" name="text" onChange={this.handleChange('texto')} ref={this.mensajeRef} value={this.state.texto} placeholder="Escribe tu mensaje" className="textarea-mensaje"> </textarea>
                                    }
                                  <div style={{color: 'red', fontSize: '12px', marginLeft:'10em'}}>{this.validator.message('text', this.state.texto, 'required')}</div> 
                                </div>
                                <input type="submit" value="ENVIAR" className="btn-enviar" ></input>
                            </form>
                        </div>

                    </div>
                </div>

                <div className="fp-container" id="fp-container">
                    <Spinner animation="border" role="status" className="fp-loader"></Spinner>
                </div>

            </div>

        );


    }
}


export default enviar;