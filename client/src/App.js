import React,{ Component } from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MainNav from '../src/components/MainNav/MainNav';
import MainPage from '../src/components/MainPage/MainPage';
import Login from '../src/components/Login/Login';
import SignUp from './components/Register/SignUp';
import Home from '../src/components/Home/Home';
import Reset from '../src/components/Reset/Reset';
// import NavBar from '../src/components/NavBar';
import Topic from '../src/components/Topic/Topic';
import Response from '../src/components/Response/Response';
import LogOut from '../src/components/LogOut/LogOut';

class App extends Component {
  render()
  {
    return (
      <div className="App">
        <BrowserRouter>
          <MainNav />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/topic" component={Topic} />
            <Route exact path="/response/:id" component={Response} />
            <Route exact path="/logout" component={LogOut} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
