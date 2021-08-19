import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './App.css';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action'; 



class App extends React.Component {
  
  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
                    const userRef = await createUserProfileDocument(userAuth);

                    userRef.onSnapshot(snapShot =>{
                      setCurrentUser({
                       
                          id: snapShot.id,
                          ...snapShot.data()
                        
                      });
                      console.log(this.state);
                    });
                    
                  
         } else{
           setCurrentUser(userAuth);
         }
    

    })
  }
 componentWillUnmount(){
   this.unsubscribeFromAuth();
 } 
  render(){
    return (
      <div className='body1'>
      <Header  />
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/shop' component={ShopPage} />
      <Route exact path='/signin' render ={()=> this.props.currentUser ?(
                                            <Redirect to = '/'/> )
                                      : (<SignInAndSignUpPage/>)} />
      </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = ({user}) =>({
  currentUser : user.currentUser
});

const mapDispatchToProps = dispatch =>({
  setCurrentUser:user => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps,mapDispatchToProps)(App);
