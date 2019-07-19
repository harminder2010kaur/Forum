import React,{ Component } from 'react';
import serverUrl from '../../serverUrl/serverUrl';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './SignUp.scss';


export default class SignUp extends Component{
    state = {
        email: '',
        isSignedUp: false,        
        isError: false,
        errorMessage: ''
    }

    register = (event) => {
            event.preventDefault();
            let fname    = this.registerForm.fname.value;
            let lname    = this.registerForm.lname.value;
            let email    = this.registerForm.email.value;
            let password = this.registerForm.password.value;
            let cpassword = this.registerForm.cpassword.value;

            let postData = {
                fname: fname,
                lname: lname,
                email: email,
                password: password
            }

            if(password !== cpassword)
            {
                this.setState({isError: true, errorMessage: 'Password mismatched'}); 
                this.registerForm.cpassword.value = '';
                this.registerForm.cpassword.focus();
            }
            else
            {                
            axios.post(`${serverUrl}/forum/signUp`, postData)
                 .then(response => {
                       console.log(response); 
                       if(response.data === true)
                       {
                                      
                        this.setState({email: email, isSignedUp:true, isError: false, errorMessage: ''}); 
                       }
                       else
                       {
                        this.setState({errorMessage: "Technical Error", isError: true, isSignedUp: false, email: ''});
                       }
                 })
                 .catch(error => {                    
                     this.setState({errorMessage: "Technical Error", isError: true, isSignedUp: false, email: ''});
                     this.registerForm.reset();
                 });                  
            } 
    }

    clearError = () => {
        this.setState({isSignedUp: false, errorMessage: ''});
    }

    checkEmail = (event) => {
        event.preventDefault();
        let email = this.registerForm.email.value;        

        let postData = {
            email: email            
        }
       
        axios.post(`${serverUrl}/forum/email`, postData)
                 .then(response => {                     
                     if(response.data === false)
                     {
                        this.setState({isError: true, errorMessage: "Email already exist"});    
                        this.registerForm.email.value = "";
                        this.registerForm.email.focus();                 
                     }
                     else
                     {
                        this.setState({isError: false, errorMessage: ""});                     
                     }
                 })
                 .catch(error => {
                     this.setState({errorMessage: error, isError: true, isSignedUp: false})
                 });
    }


    checkPassword = (event) => {
        event.preventDefault();
        const password  = this.registerForm.password.value;    
        const cpassword = this.registerForm.cpassword.value;

        if(password !== cpassword)
        {
            this.setState({isError: true, errorMessage: 'Password mismatched'}); 
            this.registerForm.cpassword.value = '';
            this.registerForm.cpassword.focus();
        }
        else
        {
            this.setState({isError: false, errorMessage: ''}); 
        }
    }

    render()
    {
        const { isError, errorMessage } = this.state

        console.log(this.state);
        return(
            <>
                <div className="login_form">
                    {this.state.isSignedUp ? <Redirect to={{pathname: '/login'}}/> : null}
                    <div className="formSection">
                        <div className="formSection__heading">Sign Up</div>                        
                            {isError && <label style={{color: 'red', fontWeight: 'bold'}}>{errorMessage}</label>}
                            <form className="formSection__form" ref={form => (this.registerForm = form)} onSubmit={this.register}>
                                <div className="form-components">
                                    
                                        <label htmlFor="fname" className="formSection__form--label">First Name</label>    
                                        <input type='text' name='fname' onFocus={this.clearError} autoComplete="off" className="formSection__form--input" required />
                                        <label htmlFor="lname" className="formSection__form--label">Last Name</label>    
                                        <input type='text' name='lname' onFocus={this.clearError} autoComplete="off" className="formSection__form--input" required />
                                        <label htmlFor="email" className="formSection__form--label">Email</label>    
                                        <input type='text' name='email' onBlur={this.checkEmail} autoComplete="off" className="formSection__form--input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Write correct email format" required />
                                        <label htmlFor="password" className="formSection__form--label">Password</label>    
                                        <input type='password' name='password' className="formSection__form--input"/>
                                        <label htmlFor="cpassword" className="formSection__form--label">Confirm Password</label>    
                                        <input type='password' name='cpassword' onBlur={this.checkPassword} className="formSection__form--input"/>
                                    <div className="BuyButton">
                                        <button className="formSection__form--button"><span>Submit</span></button>
                                    </div>    
                                </div>
                            </form>
                    </div>
                </div>        
            </>
        )
    }
}