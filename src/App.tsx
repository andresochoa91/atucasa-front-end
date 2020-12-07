import React, { FC, useContext } from 'react';
import { AtucasaContext } from './Context';
import SignUp from './components/SignForms/SignIn';
import SignIn from './components/SignForms/SignUp';
import SignOut from './components/SignForms/SignOut';
import Customer from './components/Customer/Customer';
import Merchant from './components/Merchant/Merchant';

const App:FC = () => {
  const { currentUser } = useContext<TContextProps>(AtucasaContext);

  return (
    <div>
      <h1>Welcome to atucasa.com</h1>
      {
        currentUser 
        ?
          <>
            <SignOut />
            {
              currentUser.role === "customer" ?
                <Customer />
              :
                <Merchant />
            }
          </>
        :
          <>
            <SignUp />
            <SignIn />
          </>
      }
    </div>
  );
}

export default App;
