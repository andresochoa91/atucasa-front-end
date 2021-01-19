import React, { FC, useContext } from 'react';
// import { Container, Jumbotron } from 'react-bootstrap';
import { Redirect, Route, useHistory } from 'react-router';
import { AtucasaContext } from '../../Context';
import Customer from '../Customer/Customer';
import Merchant from '../Merchant/Merchant';
import ShowMerchant from '../ShowMerchant/ShowMerchant';



const Home: FC = (): JSX.Element => {

  const { currentUser } = useContext<TContextProps>(AtucasaContext);
  const history = useHistory();
  console.log(history.location.pathname)

  return (
    <>
      <Route exact path="/" render={() => <Redirect to="/home" />}/>
      
      <Route path="/home" render={() => (
        currentUser?.role === "customer" ? <Customer /> : <Merchant />
      )}/>

      <Route 
        exact path="/merchants/:slug" 
        render={() => (
          <Redirect to={`/home${history.location.pathname}`} />
        )}
      />

      <Route 
        exact path="/home/merchants/:slug" 
        render={(props) => (
          <ShowMerchant {...props} />
        )} 
      />
    </>
  );
};

export default Home;
