import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { Button } from 'react-bootstrap';

const SignOut: FC = () => {
  const { 
    setCurrentUser, 
    setLoggedOut, 
    setCurrentCustomer, 
    handleMerchants,
    setCurrentMerchant 
  } = useContext<TContextProps>(AtucasaContext);

  const handleSignOut = ():void => {
    fetch(`${process.env.REACT_APP_API}/logout`, {
      credentials: "include",
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setLoggedOut(true);
      setCurrentUser(null);
      setCurrentCustomer(null);
      setCurrentMerchant(null);
      handleMerchants();
      window.location.reload();
    })
    .catch(err => console.error(err))
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