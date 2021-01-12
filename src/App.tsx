import React, { FC, useContext } from 'react';
import { AtucasaContext } from './Context';
import SignUp from './components/SignForms/SignIn';
import SignIn from './components/SignForms/SignUp';
import SignOut from './components/SignForms/SignOut';
import Customer from './components/Customer/Customer';
import Merchant from './components/Merchant/Merchant';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import MyMap from './components/MyMap/MyMap';
import ShowMerchant from './components/ShowMerchant/ShowMerchant';

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
                  <Link to="/home/map">Show Map</Link>
                </>
              )}/>
              {/* <Route path="/merchants" render={() => <ShowMerchants />} /> */}
              <Route path="/home/map" render={() => <MyMap />} />
              <Route 
                exact path="/merchants/:slug" 
                render={(props) => (
                  <ShowMerchant {...props} />
                )} 
              />
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
                  {/* <Link to="/merchants">Yayaya</Link> */}
                </> 
              )}/>
              {/* <Route exact path="/merchants" render={() => <ShowMerchants />} /> */}
              <Route exact path="/home/map" render={() => <MyMap />} />
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
