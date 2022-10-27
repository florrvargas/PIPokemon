import '../LandingPage/LandingPage.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(){
    return (
        <div className='landing'>
            <Link to='/home'>
                <button className='buttonLanding'>Home</button>
            </Link>
        </div>
    )
}