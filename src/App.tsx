import React, { FC, useContext } from 'react';
import { AtucasaContext } from './Context';
import SignOut from './components/SignForms/SignOut';
import Customer from './components/Customer/Customer';
import Merchant from './components/Merchant/Merchant';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import MyMap from './components/MyMap/MyMap';
import ShowMerchant from './components/ShowMerchant/ShowMerchant';
import SignForms from './components/SignForms/SignForms';


const App:FC = (): JSX.Element => {
  const { currentUser, loggedOut } = useContext<TContextProps>(AtucasaContext);

  return (
    <div>
      <Switch>
        {
          currentUser ? (
            <>
              <Route exact path="/" render={() => <Redirect to="/home" />}/>
              <Route path="/home" render={() => (
                <>
                  <SignOut />
                  {
                    currentUser.role === "customer" ? <Customer /> : <Merchant />
                  }
                </> 
              )}/>
              <Route 
                exact path="/merchants/:slug" 
                render={(props) => (
                  <ShowMerchant {...props} />
                )} 
              />
            </>
          ) : (
            <>
              {
                loggedOut && <Redirect to="/" />
              }
              <Route exact path="/" render={() => (
                <>
                  <SignForms />
                </>
              )}/>
              <Route path="/map" render={() => <MyMap />} />
              <Route 
                exact path="/merchants/:slug" 
                render={(props) => (
                  <ShowMerchant {...props} />
                )} 
              />
            </>
          )
        }
      </Switch>
    </div>
  );
};

export default App;
