import React from 'react';

import closeIcon from '../../assets/images/closeIcon.png';
import onlineIcon from '../../assets/images/onlineIcon.png';
import { Link } from 'react-router-dom';
import './InfoBar.css';

const InfoBar = ({room})=>(

    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online image"></img>
            <h3>{room}</h3>
        </div>  
         <div className="rightInnerContainer">
            <Link to="/join"><img src={closeIcon} alt="close image"></img></Link>
        </div>  
     </div>
)


export default InfoBar;