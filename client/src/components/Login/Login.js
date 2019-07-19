import React,{ Component } from 'react';
import serverUrl from '../../serverUrl/serverUrl';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Login.scss';


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
                <div className="login_form">
                    {this.state.isLoggedIn ? <Redirect to={{pathname: '/home',  state: { id: this.state.email }}}/> : null}
                    <div className="formSection">
                        <div className="formSection__heading">Login</div>                        
                            {isLoginError && <label style={{color: 'red'}}>{errorMessage}</label>}
                            <form className="formSection__form" ref={form => (this.loginForm = form)} onSubmit={this.login}>
                                <div className="form-components">                                    
                                        <label htmlFor="username" className="formSection__form--label">User Name</label>    
                                        <input type='text' name='username' onFocus={this.clearError} autoComplete="off" className="formSection__form--input" required />
                                                                        
                                        <label htmlFor="password" className="formSection__form--label">Password</label>    
                                        <input type='password' name='password' autoComplete="new-password" className="formSection__form--input"/>
                                    
                                    <div className="BuyButton">
                                        <button className="formSection__form--button"><span>Submit</span></button>
                                    </div>  

                                    <NavLink to="/reset" className="form-components__link">Forget Password</NavLink>                                                                      
                                </div>
                            </form>
                    </div>
                </div>        
            </>
        )
    }
}