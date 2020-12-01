import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import imagenlogo from '../../assets/images/logo-erasmus.png';

import './Join.css';



const Join = () => {


    const [room, setRoom] = useState('');
    const identity = JSON.parse(localStorage.getItem('user'));
    const nombre = identity.nombre + " " + identity.apellido1;
    const name = nombre;
    return (
        <div>
             <div className="profesor-erasmus mt-5">
                    <h4>¡Bienvenido!</h4>
                    <h5>Para invitar a otros usuarios solo tiene que compartir con ellos el nombre de la sala que usted ha creado.</h5>
                </div>
            <div className="joinOuterContainer">
               
                <div className="joinInnerContainer">

                    <h1 className="heading">Crear sala</h1>

                    <div> <input placeholder="Nombre" className="joinInput" type="text" /*onChange={(event)=>setName(event.target.value)} */ value={nombre} /> </div>
                    <div> <input placeholder="Nombre de la sala" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /> </div>
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={'/chat?name=' + name + '&room=' + room}>
                        <button className="button-join mt-20" type="submit">crear sala</button>
                    </Link>


                </div>
            </div>
        </div>

    );

}

export default Join;