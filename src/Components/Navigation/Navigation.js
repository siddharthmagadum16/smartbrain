import React from 'react';

const Navigation =({OnRouteChange,IsSignIn})=> {
    
    if(IsSignIn){
        return (
            <nav style={{'display':'flex','justifyContent':'flex-end'}}>
            <p onClick={ () => OnRouteChange('signout')}  className="f3 dim red underline pa3 pointer">Sign Out</p>
            </nav>        
        )
    }
    else {
        return (
            <nav style={{'display':'flex','justifyContent':'flex-end'}}>
            <p onClick={ () => OnRouteChange('signin')}  className="f3 dim red underline pa3 pointer">Sign In</p>
            <p onClick={ () => OnRouteChange('register')}  className="f3 dim red underline pa3 pointer">Register</p>
            </nav>        
        )
    }
}

export default Navigation;