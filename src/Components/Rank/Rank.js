import React from 'react';
import './Rank.css';
const Rank=({name, entries})=> {
    return (
        <div className="font1 f3">
            { `${name}, your current entry number is ` }
            <div className='font2 f2 bold'>
                {entries}
            </div>
            
        </div>
        
    )
}

export default Rank;