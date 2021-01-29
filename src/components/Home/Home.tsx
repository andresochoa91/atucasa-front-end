import React, { FC, useContext } from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import { AtucasaContext } from '../../Context';
import Customer from '../Customer/Customer';
import Merchant from '../Merchant/Merchant';
import ShowMerchant from '../ShowMerchant/ShowMerchant';

/**
 * Home Page of the website
 */
const Home: FC = (): JSX.Element => {

  const { currentUser } = useContext<TContextProps>(AtucasaContext);

  /**
   * History of Path Url
   */
  const history = useHistory();

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
