import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm =({OnInputChange, OnButtonSearch})=> {
    return (
        <div>
            <p className="f4">
                {"Insert a link of an image to detect face"}
            </p>
            <div className="center ">
                <div className="form center pa4  shadow-5 ">
                
                        <input className="f4 pa2 w-70 bordercss1 " placeholder="Enter image link"  type="tex" onChange={OnInputChange} ></input>                   
                        <button className="f4 pa2 ph3 link  w-30 pv bordercss2 dib white bg-light-purple"
                        onClick={OnButtonSearch}
                        >Detect</button>
                    
                </div>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;