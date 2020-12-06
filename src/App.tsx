import React, { FC, useContext } from 'react';
import { AtucasaContext } from './Context';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

const App:FC = () => {
  const { currentUser } = useContext<any>(AtucasaContext);

  return (
    <div>
      <h1>Welcome to atucasa.com</h1>
      {
        currentUser 
        ?
          <SignOut />
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
