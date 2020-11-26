import React, { Component } from 'react';

import Global from '../Global';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link, Redirect } from 'react-router-dom';

import swal from 'sweetalert';


class baja extends Component {

    state = {
        identity: null,
        status: "",
        navigate: false,
    }


    constructor(props) {
        super(props);
        this.state = {
            identity: JSON.parse(localStorage.getItem('user')),
        };

    }

    urlalumno = Global.url;
    urlprofesor = Global.urlprofesor;



    dardebaja = (e) => {

        e.preventDefault();
        axios.delete('https://plataforma-erasmus.herokuapp.com/apiErasmus/dardebaja/' + JSON.parse(localStorage.getItem('user'))._id)
            .then(res => {
                this.setState({
                    navigate: res.data.navigate
                })
                swal(
                    'Realizado correctamente!',
                    'Se ha realizado correctamente la baja del usuario',
                    'sucess'
                )

                localStorage.removeItem('user');
              //  localStorage.setItem('tipo', '');
            })



        this.forceUpdate();

    }

    render() {
        const { navigate } = this.state
        if (navigate) {
            localStorage.clear();
            window.location.assign('/')
        }

        return (
            <div >
                <h1 className="titulo-doc" style={{ marginBottom: '25px' }}> SOLICITAR BAJA </h1>

                <Card className="card-bajas">
                    <div className="bajas">
                        <h3 style={{ fontSize: '24px', color: '#BB0909' }}>¿Estás seguro de que quieres dar de baja a la cuenta?</h3>
                        <h5 style={{ fontSize: '16px' }}>Al efectuar la baja de tu perfil todos tus datos desaparecerán de nuestro servidor,
                        por lo que si quieres volver a acceder a la web deberás registrate de nuevo.
                </h5>
                        <h5 style={{ fontSize: '14px' }}><strong>Recuerda</strong> que si te encuentras de Erasmus+ no debes de eliminar la cuenta</h5>
                        <h5 style={{ fontSize: '14px' }}>ya que puedes necesitar información o documentos durante tu movilidad.</h5>

                        <button onClick={this.dardebaja} className="btn-style" style={{ marginTop: '15px' }}> SOLICITAR BAJA </button>
                    </div>
                </Card>


            </div>

        );
    }
}

export default baja;