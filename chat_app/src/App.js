import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
    </Switch>
  );
}

export default App;
