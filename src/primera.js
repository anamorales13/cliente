import React, { Component } from 'react';


import axios from 'axios';



class primera extends Component {

    state = {
       usuario:{},
    }

    componentWillMount(){
        this.getUser();
    }

    getUser = (e) => {

       
        axios.get('https://plataforma-erasmus.herokuapp.com/apiProfesor/profesor/5f91925147ec0529ec70dbb9')
            .then(res => {
                this.setState({
                    usuario: res.data.userget
                })
            
            })

    }

    render() {
       
        return (
            <div >
               <label>Nombre: {this.state.usuario.nombre}</label>
               <label>Correo: {this.state.usuario.email}</label>

            </div>

        );
    }
}

export default primera;