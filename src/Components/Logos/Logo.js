import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.jpg';
// import './Logo.css'; // deleted as of no use
const Logo =()=> {
    return (
        
        <Tilt className="Tilt  shadow-2 ma3"   options={{ revese: false , max : 50 }} style={{ height: 120, width: 120}} >
        <div className="Tilt-inner"> <img style={{paddingInline: '5px'}}  src= {brain} alt="logo"/> </div>
        </Tilt>
        
    )
}

export default Logo;