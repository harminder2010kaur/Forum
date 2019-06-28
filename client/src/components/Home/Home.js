import React,{ Component } from 'react';
import serverUrl from '../../serverUrl/serverUrl';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class Home extends Component{
    state = {
        isLoading: true,
        jwt: false,
        fname: null,
        lname: null,
        email: null,
        logout: false,
    };

    jwtGet = () =>{
        const jwt = localStorage.getItem('jwt');
        
        let body = {
            jwt: jwt
        }

        if (jwt) {
            axios.post(`${serverUrl}/forum/profile`, body)
                 .then(response => {
                console.log(response.data);

                this.setState({
                    jwt: jwt,
                    fname: response.data.fname,
                    lname: response.data.lname,
                    email: response.data.email,
                    isLoading: false
                })
            })
            .catch(error => {console.log(error);});
        }
    }


    componentDidMount(){
    this.jwtGet();    
    }

    logout = () => {
        localStorage.clear();
        console.clear();
        this.setState({logout: true});
    }


    render()
    {
        const { isLoading, fname, lname } = this.state;    
        return(            
            <>
            {isLoading ? null : <h1>Welcome {fname} {lname}!</h1>}
            <div>
                <p onClick={this.logout}>Logout</p>
            </div>
            {this.state.logout === true ? <Redirect to={{pathname: '/'}}/> : null}
            </>
        )
    }
}