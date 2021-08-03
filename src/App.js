import React from 'react';
import { Route, Switch, } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import './App.css';

const HatsPage =(props)=>{
  console.log(props);
  return(
    <div>
    <button onClick={()=> props.history.push('/')}   >home</button>
  <h1>hatPage</h1>
 
  </div>
 
  );
  
  
}

function App() {
  return (
    <div >
    <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/shop/hats/' component={HatsPage} />
    </Switch>
    </div>
  );
}

export default App;
