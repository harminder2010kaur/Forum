import React,{ Component } from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MainNav from '../src/components/MainNav/MainNav';
import MainPage from '../src/components/MainPage/MainPage';
import Login from '../src/components/Login/Login';
import Register from '../src/components/Register/Register';
import Home from '../src/components/Home/Home';
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
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
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
