import React, { FC, useContext } from 'react';
import { AtucasaContext } from './Context';
import SignUp from './components/SignForms/SignIn';
import SignIn from './components/SignForms/SignUp';
import SignOut from './components/SignForms/SignOut';
import Customer from './components/Customer/Customer';
import Merchant from './components/Merchant/Merchant';
import { Route, Switch, Redirect } from 'react-router-dom';

const App:FC = () => {
  const { currentUser, loggedOut } = useContext<TContextProps>(AtucasaContext);

  return (
    <div>
      <h1>Welcome to atucasa.com</h1>
      <Switch>
        {
          currentUser || !loggedOut ? (
            currentUser ? (
              <>
                <Route exact path="/" render={() => <Redirect to="/home" />}/>
                <Route path="/home" render={() => (
                  <>
                    <SignOut />
                    {
                      currentUser.role === "customer" ?
                        <Customer />
                      :
                        <Merchant />
                    }
                  </> 
                )}/>
              </>
            ) : (
              <>
              {/* <Redirect to="/" /> */}
              <Route exact path="/" render={() => (
                <>
                  <SignUp />
                  <SignIn />
                </>
              )}/>
            </>  
            )
          ) : (
            <>
              <Redirect to="/" />
              <Route exact path="/" render={() => (
                <>
                  <SignUp />
                  <SignIn />
                </>
              )}/>
            </>
          )
        }
      </Switch>
    </div>
  );
};

export default App;
