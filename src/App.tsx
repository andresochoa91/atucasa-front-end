import React, { FC, useContext } from 'react';
import { AtucasaContext } from './Context';
// import Customer from './components/Customer/Customer';
// import Merchant from './components/Merchant/Merchant';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import MyMap from './components/MyMap/MyMap';
import ShowMerchant from './components/ShowMerchant/ShowMerchant';
import SignForms from './components/SignForms/SignForms';
import MainNavbar from './components/MainNavbar/MainNavbar';
import Home from './components/Home/Home';
// import { Container, Jumbotron } from 'react-bootstrap';
import food2 from './food2.jpg'
import ContainerJumbotron from './components/ContainerJumbotron/ContainerJumbotron';


const App:FC = (): JSX.Element => {
  const { currentUser, loggedOut } = useContext<TContextProps>(AtucasaContext);

  return (
    <div
      style={{
        backgroundImage: `url(${food2})`,
        position: "absolute",
        minWidth: "100%",
        minHeight: "100%",
        backgroundSize: "cover",
        // height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <MainNavbar />
      <Switch>
        {
          currentUser ? (
            <Home />
          ) : (
            <>
              {
                loggedOut && <Redirect to="/" />
              }
              <Route exact path="/" render={() => (
                <>
                  <ContainerJumbotron>
                    <SignForms />
                  </ContainerJumbotron>
                </>
              )}/>
              <Route path="/map" render={() => (
                <>
                  <h2>A Tu Casa</h2>
                  <Link to="/">Go Back to Home Page</Link>
                  <MyMap />
                </>
              )
              } />
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
