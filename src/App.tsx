import React, { FC, useContext } from 'react';
import { AtucasaContext } from './Context';
import SignUp from './components/SignForms/SignIn';
import SignIn from './components/SignForms/SignUp';
import SignOut from './components/SignForms/SignOut';
import Customer from './components/Customer/Customer';
import Merchant from './components/Merchant/Merchant';

const App:FC = () => {
  const { currentUser, loggedOut } = useContext<TContextProps>(AtucasaContext);

  return (
    <div>
      <h1>Welcome to atucasa.com</h1>      
      {
        (loggedOut || !currentUser) ? (
          <>
            <SignUp />
            <SignIn />
          </>
        ) : (
          <>
            <SignOut />
            {
              currentUser.role === "customer" ? <Customer /> : <Merchant />
            }
          </>
        )
      }
    </div>
  );
};

export default App;
