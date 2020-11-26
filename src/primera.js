import React, { Component } from 'react';


import axios from 'axios';



class primera extends Component {

    state = {
       usuario:{},
    }




    getUser = (e) => {

       
        axios.get('http://localhost:3900/apiProfesor/profesor/5f91925147ec0529ec70dbb9')
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
               <label>Correo: {this.state.usuario.correo}</label>

            </div>

        );
    }
}

export default primera;