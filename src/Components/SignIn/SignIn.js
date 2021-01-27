import React from 'react';

class SignIn  extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      signinEmail:'',
      signinPassword:''
    }
  }
  onEmailChange=(event)=>{
    this.setState({signinEmail: event.target.value});
  }
  onPasswordChange=(event)=>{
    this.setState({signinPassword:event.target.value});
  }
  onSubmitSignin=(event)=>{
    fetch('https://fathomless-savannah-54533.herokuapp.com/signin',{
      method: 'post',
      headers: { 'Content-Type' :'application/json'},
      body: JSON.stringify({
        email: this.state.signinEmail,
        password: this.state.signinPassword
      })
    })
    .then(response =>response.json())
    .then(data=>{
      if(data.id){
        this.props.loadUser(data);
        this.props.OnRouteChange('home');
      }
    });

  }

  render(){
        // const  {OnRouteChange}= this.props;
    return (
      <article  className="ph6 br3 ba  b--black-30 mv4 w-10 w-50-m w-25-l mw6 center shadow-5 ">
      <main  className="pa4 black-80">
          <div  className="measure ">
            <fieldset id="sign_up"  className="ba b--transparent ph0 mh0">
              <legend  className="f1 fw6 ph0 mh0">Sign In</legend>
              <div  className="mt3">
                <label  className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
              </div>
              <div  className="mv3">
                <label  className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
              </div>
            </fieldset>
            <div  className="">
              <input onClick={ this.onSubmitSignin}  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
            </div>
            <div  className="lh-copy mt8">
            </div>
          </div>
      </main>
      </article>

    )
  }

}

export default SignIn;