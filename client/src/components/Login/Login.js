import React,{ Component } from 'react';
import serverUrl from '../../serverUrl/serverUrl';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
// import { resolve } from 'url';


export default class Login extends Component{
    state = {
        email: '',
        isSignedUp: false,
        isLoggedIn: false,
        isLoginError: false,
        errorMessage: ''
    }

    login = (event) => {
            event.preventDefault();
            let email    = this.loginForm.username.value;
            let password = this.loginForm.password.value;

            let postData = {
                email: email,
                password: password
            }

            axios.post(`${serverUrl}/forum/login`, postData)
                 .then(response => {
                       console.log(response); 
                       if(response.data !== false)
                       {
                        // let email = response.data.email;
                        // let fname = response.data.fname;
                        // let lname = response.data.lname;
                        let jwt   = response.data.token;
                        // localStorage.setItem("email", email)
                        // localStorage.setItem("fname", fname)
                        // localStorage.setItem("lname", lname);    
                        
                        localStorage.setItem("jwt", jwt);                   
                        this.setState({email: email, isLoggedIn:true, isLoginError: false, errorMessage: ''}); 
                       }
                       else
                       {
                        this.setState({errorMessage: "Invalid credentials", isLoginError:true, isLoggedIn: false, email: ''});
                       }
                 })
                 .catch(error => {                    
                     this.setState({errorMessage: "Invalid credentials", isLoginError:true, isLoggedIn: false, email: ''});
                     this.loginForm.reset();
                 });   
    }

    clearError = () => {
        this.setState({isLoginError: false, errorMessage: ''});
    }

    render()
    {
        const { isLoginError, errorMessage } = this.state

        console.log(this.state);
        return(
            <>
            {this.state.isLoggedIn ? <Redirect to={{pathname: '/home',  state: { id: this.state.email }}}/> : null}
                <h1>Login</h1>
                    {isLoginError && <label style={{color: 'red'}}>{errorMessage}</label>}
                        <form ref={form => (this.loginForm = form)} onSubmit={this.login}>
                            <div className='form-group'>
                                Username: <input type='text' name='username' onFocus={this.clearError} autoComplete="off"/>
                            </div>
                            <div className='form-group'>
                                Password: <input type='password' name='password' autoComplete="new-password"/>
                            </div>
                            <button className='btn btn-primary'>
                                Login
                            </button>
                        </form>
            </>
        )
    }
}