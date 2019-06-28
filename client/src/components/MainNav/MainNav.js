import React,{ Component } from 'react';
import { NavLink } from 'react-router-dom'; 
import './MainNav.scss';

export default class MainPage extends Component {
    render()
    {
        return(
            <div className="navBar">
                    <div className="navBar__navLogo">
                        
                            Forum
                        
                    </div>
                    <div className="navBar__navLink">
                        <ul className="navBar__navLink--nav">
                        <NavLink to="/login" className="navBar__navLink--nav-link" activeClassName="navBar__navLink--active"><li>Login</li></NavLink>                            
                        <NavLink to="/register" className="navBar__navLink--nav-link" activeClassName="navBar__navLink--active"><li>Register</li></NavLink>
                        </ul>
                    </div>
                </div>
        )
    }
}