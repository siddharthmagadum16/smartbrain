import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logos/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
// import Clarifai  from 'clarifai';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
// Register
// import './particles.json';
// import { logDOM } from '@testing-library/react';
// const Clarifai = require('clarifai');


// const part=particlesJS.load('particles-js', 'assets/particles.json', function() {
//   console.log('callback - particles.js config loaded');
// });

const ParticlesOptions={

  particles: {
    number : {
      value : 500,
      density: {
        enable: true,
        value_area:7500
      }
    },
     move : {
       enable : true,
       speed : 7,
       direction :  "none" ,
       random : true,
       straight : true,
       out_mode :  "out" ,
       bounce : true,
       attract : {
         enable : true,
         rotateX : 0,
         rotateY : 0
      }
    }
  },
   interactivity : {
    mode : {
      repulse: {
        distance: 5000,
        duration: .4
      }
    },
     detect_on :  "canvas" ,
     events : {
       onhover : {
         enable : true,
         mode : "repulse"
      },
       onclick : {
         enable : true,
         mode :  "push"
      },
     resize : true
    }

  }
}

const InitialState ={
    input: '',
    ImageURL: '',
    boxes: [],
    route: 'signin',
    IsSignIn: false,
    user : {
      id : '',
      name : '',
      email : '',
      entries : 0,
      joined : ''
    }

}

class App extends React.Component {
  constructor(){
    super();
    this.state=InitialState
  }

  loadUser= (data)=>{
    this.setState({user: {
      id :data.id,
      name: data.name,
      email : data.email,
      entries : data.entries,
      joined : data.joined
    }})
  }


  CalculateFaceLocation=(data)=>{
    const ClarifaiFace = data.outputs[0].data.regions.map(region =>region.region_info.bounding_box);
    const image= document.getElementById("inputimage");
    const height= Number(image.height);
    const width = Number(image.width) ;
    // console.log("h & w is : " ,height,width);
    return ClarifaiFace.map(faces =>{
        return{
          leftCol:      faces.left_col*width,
          topRow :      faces.top_row*height,
          rightCol:     width - (faces.right_col*width),
          bottomRow :   height - (faces.bottom_row*height),
      }
    })
  }
  DetectFace=(boxes)=>{
    // console.log(boxes)
    this.setState({boxes: boxes});
  }

  OnInputChange=(event)=>{
    this.setState({input: event.target.value});
  }

  OnButtonSearch = ()=>{

    this.setState({ImageURL: this.state.input });

    // 'a403429f2ddf4b49b307e318f00e528b' , Clarifai.FACE_DETECT_MODEL
    fetch('https://fathomless-savannah-54533.herokuapp.com/image',{
      method: 'post',
      headers: { 'Content-Type' :'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=>response.json())
    .then(response=> {
      if(response){
        fetch('https://fathomless-savannah-54533.herokuapp.com/image',{
          method: 'put',
          headers: { 'Content-Type' :'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(err=> console.log("Serror: ",err))
      }
      this.DetectFace(this.CalculateFaceLocation(response));
    })

    .catch(err=> console.log("error caught at line ~140: ",err))

  }

  OnRouteChange = (route)=>{
    if(route=== 'signout')   this.setState(InitialState)
    else if(route==='home')  this.setState({IsSignIn: true});

    this.setState({route: route});
  }

  render(){
    const { IsSignIn, ImageURL , route, boxes  } = this.state;
    return (

      <div className="App particles-js particles" >
        <Particles className='particles' params={ParticlesOptions}  />
        <Navigation IsSignIn={IsSignIn} OnRouteChange={this.OnRouteChange}/>
        { route==='home'?
          <div >
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm OnInputChange={this.OnInputChange} OnButtonSearch={this.OnButtonSearch}/>
            <FaceRecognition boxes={boxes} ImageURL={ImageURL} />
          </div> :(
            route==='signin'?
              <SignIn loadUser={this.loadUser} OnRouteChange={this.OnRouteChange}/>:
              <Register loadUser={this.loadUser} OnRouteChange={this.OnRouteChange}/>
          )
        }
      </div>
    );
  }
}


export default App;

/*
for creating table in database smartbrain 2 tables i) users ii) login
select table in the left col and then select Tools, Query tools , type this 2, one at a time.

(for users table)
CREATE TABLE users (
	id serial PRIMARY KEY,
	name VARCHAR(100),
	email text UNIQUE NOT NULL,
	entries BIGINT DEFAULT 0,
	joined TIMESTAMP NOT NULL
);

(for login table)
CREATE TABLE login (
  id serial PRIMARY KEY,
  hash CHARVAR(100) NOT NULL,
  email text UNIQUE NOT NULL
);

(refresh table)
*/
// face eg link - https://i.ytimg.com/vi/DCpMuVC6Gmk/maxresdefault.jpg