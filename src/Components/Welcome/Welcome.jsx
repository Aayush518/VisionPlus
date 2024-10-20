import React from 'react';
import './Welcome.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClapperboard} from '@fortawesome/free-solid-svg-icons/faClapperboard';
import axios from 'axios';
import Logo from "../Logo.jsx";
import {useNavigate} from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/selectpage');
    };
    return(
        <div className='Welcome'>
            <Logo />
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <button onClick={handleNavigate}>Get Started</button>
        </div>

    )
}

export default Welcome;