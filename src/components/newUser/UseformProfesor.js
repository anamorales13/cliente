import React, { Component } from 'react';
import FormDatosPersonales from './FormDatosPersonales';
import FormDatosPlataforma from './FormDatosPlataforma';
import FormDatosUniversidad from './FormDatosUniversidad.js';
import Sucess from './Success';


import GlobalProfesor from '../../GlobalProfesor';
import axios from 'axios';


const validate= values =>{
 const errors={}
 if(!values.nombre){
     errors.nombre="campo obligatorio";
 }
 
 return errors;
}
export class Useform extends Component {

    state = {
        step: 1,
        nombre: "",
        apellido1: "",
        apellido2: "",
        usuario: "",
        password1: "",
        password2:"",
        email1: "",
        email2:"",
        telefono: "",
        destino: "",
        despacho: "",
        edificio: "",
        datos:"",
        tutoria:"",
        alumno: {},
        profesor: {},
        

    }


    urlprofesor = GlobalProfesor.url;

    //Proceed to the next step

 

    nextStep = e => {
        const { step } = this.state;
     
       console.log(this.state.step);
            this.setState({
                step: step + 1
            });
       
      
     

        if (this.state.step == 3) {
            this.guardarProfesor();
        }

    }

    // back to the previus step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });

    }


    //Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }


    guardarProfesor() {
        var body = {
            nombre: this.state.nombre,
            apellido1: this.state.apellido1,
            apellido2: this.state.apellido2,
            email: this.state.email1,
            telefono: this.state.telefono,
            usuario: this.state.usuario,
            password: this.state.password1,
            despacho: this.state.despacho,
            edificio: this.state.edificio,
            datos:this.state.datos,
            tutoria: this.state.tutoria

        }

        axios.post(this.urlprofesor + 'save', body)
            .then(res => {
                this.setState({
                    profesor: res.data.profesor
                })
            })
    }



    render() {
        const { step } = this.state;


        const { nombre, apellido1, apellido2, usuario, password1,password2, email1,email2, telefono, destino, alumno, profesor, despacho, edificio,datos, tutoria  } = this.state;
        const values = { nombre, apellido1, apellido2, usuario, password1,password2, email1,email2, telefono, destino, alumno, profesor, despacho, edificio,datos, tutoria }
        const { tipo } = this.props.location.state

        switch (step) {
            case 1:
                return (
                    <FormDatosPersonales
                    nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        tipo={tipo}
                    />
                )
            case 2:
                return (
                    <FormDatosPlataforma
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                        tipo={tipo}
                    />
                )
            case 3:
                return (
                    <div>
                        <FormDatosUniversidad
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            values={values}
                            tipo={tipo} />

                    </div>

                );

            case 4:
                return (
                    <div>
                        <Sucess />

                    </div>

                )
        }






    }
}

export default Useform;