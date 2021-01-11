import React, { FC, useContext } from 'react';
import { AtucasaContext } from './Context';
import SignUp from './components/SignForms/SignIn';
import SignIn from './components/SignForms/SignUp';
import SignOut from './components/SignForms/SignOut';
import Customer from './components/Customer/Customer';
import Merchant from './components/Merchant/Merchant';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import ShowMerchants2 from './components/ShowMerchants2/ShowMerchants2';
import ShowMerchants from './components/ShowMerchant/ShowMerchants';

const App:FC = () => {
  const { currentUser, loggedOut } = useContext<TContextProps>(AtucasaContext);

  return (
    <div>
      <h1>Welcome to atucasa.com</h1>
      <Switch>
        {
          (loggedOut || !currentUser) ? (
            <>
              {
                loggedOut && <Redirect to="/" />
              }
              <Route exact path="/" render={() => (
                <>
                  <SignUp />
                  <SignIn />
                  <Link to="/merchants">Yayaya</Link>
                </>
              )}/>
              <Route path="/merchants" render={() => <ShowMerchants />} />
            </>
          ) : (
            <>
              <Route exact path="/" render={() => <Redirect to="/home" />}/>
              <Route path="/home" render={() => (
                <>
                  <SignOut />
                  {
                    currentUser.role === "customer" ? <Customer /> : <Merchant />
                  }
                  <Link to="/merchants">Yayaya</Link>
                </> 
              )}/>
              <Route exact path="/merchants" render={() => <ShowMerchants />} />
            </>
          )
        }
      </Switch>
    </div>
  );
};

export default App;
