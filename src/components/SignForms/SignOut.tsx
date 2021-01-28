import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { useHistory } from 'react-router';

const SignOut: FC = () => {
  const { 
    setCurrentUser, 
    setLoggedOut, 
    setCurrentCustomer, 
    handleMerchants,
    setCurrentMerchant 
  } = useContext<TContextProps>(AtucasaContext);

  const history = useHistory();

  const handleSignOut = ():void => {
    cookie.remove("token", { path: "/" });
    history.push("/");
    setLoggedOut(true);
    setCurrentUser(null);
    setCurrentCustomer(null);
    setCurrentMerchant(null);
    handleMerchants();
    window.location.reload();
  };

  return (
    <Button 
      variant="outline-info" 
      onClick={ () => handleSignOut() }
    >
      Sign out
    </Button>
  );
}

export default SignOut;