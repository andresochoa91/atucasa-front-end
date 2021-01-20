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
import ContainerJumbotron from './components/ContainerJumbotron/ContainerJumbotron';
import { Navbar } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"

const App:FC = (): JSX.Element => {
  const { currentUser, loggedOut } = useContext<TContextProps>(AtucasaContext);

  return (
    <div
      style={{
        backgroundImage: `url(https://fivestonesglobal.org/wp-content/uploads/2019/04/Shopping-Cart-Background.jpg)`,
        position: "absolute",
        minWidth: "100%",
        minHeight: "100%",
        backgroundSize: "cover",
        // height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
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
                <ContainerJumbotron>
                  <h2>A Tu Casa</h2>
                  <Link to="/">Go Back to Home Page</Link>
                  <h3>These are the merchants close to you!</h3>
                  <h5>Click on merchant on map and visit their website to start buying</h5>
                  <br/>
                  <MyMap />
                </ContainerJumbotron>
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
      <br/>
      <br/>
      <br/>
      <Navbar
        style={{
          bottom: "0"
        }}
        className="position-absolute w-100"
      > 
        <p className="ml-auto">
          © 2021 A Tu Casa,  created by Johan Ochoa. All Rights Reserved
        </p>          
        <div className="mr-auto mb-3">
          <a
            style={{
              display: 'contents',
              cursor: 'pointer',
              color: "rgba(0,0,0,0.7)"
            }} 
            href="https://github.com/andresochoa91"
            target={`_blank`}
          >
            <FontAwesomeIcon className="ml-5 mr-2" size='2x' icon={ faGithub } />
          </a>
          <a
            style={{
              display: 'contents',
              cursor: 'pointer',
              color: "rgba(0,0,0,0.7)"
            }} 
            href="https://www.linkedin.com/in/jandresochoa91/"
            target={`_blank`}
          >
            <FontAwesomeIcon size="2x" icon={ faLinkedin } />
          </a>
        </div>
      </Navbar>
    </div>
  );
};

export default App;
