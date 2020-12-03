import React, { FC } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

const App:FC = () => {
  return (
    <div>
      <h1>Welcome to atucasa.com</h1>
      <SignOut />
      <SignUp />
      <SignIn />
    </div>
  );
}

export default App;
