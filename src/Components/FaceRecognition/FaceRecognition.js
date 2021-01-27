import React from 'react';
import './FaceRecognition.css';
const  FaceRecognition=({ImageURL, boxes})=> {
    return (
        <div className="center ma2 ">
            <div className="absolute mt2">
                <img id= 'inputimage' alt='' src={ImageURL}  width="500px" height="auto"/>
                {
                    boxes.map((box,i)=>{
                        return (<div key={i} className='bounding-box realtive' style={{ left: box.leftCol , top: box.topRow, right: box.rightCol,  bottom: box.bottomRow}}></div> ) 
                    })
                }
            </div>
        </div>
      
    )
}

export default FaceRecognition;
