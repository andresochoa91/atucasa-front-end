import React, { FC } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App:FC = () => {
  return (
    <div>
      <h1>Welcome to atucasa.com</h1>
      <SignUp />
      <SignIn />
    </div>
  );
}

export default App;
