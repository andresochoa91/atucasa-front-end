import React, { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AtucasaContext } from '../../Context';
import Customer from '../Customer/Customer';
import Merchant from '../Merchant/Merchant';
import ShowMerchant from '../ShowMerchant/ShowMerchant';

const Home: FC = (): JSX.Element => {

  const { currentUser } = useContext<TContextProps>(AtucasaContext);

  return (
    <>
      <Route exact path="/" render={() => <Redirect to="/home" />}/>
      <Route path="/home" render={() => (
        <>
          {
            currentUser?.role === "customer" ? <Customer /> : <Merchant />
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
  );
};

export default Home;
