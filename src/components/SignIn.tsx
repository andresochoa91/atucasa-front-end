import React, { FC } from 'react';

const SignIn: FC = () => {
  return (
    <>
      <h1>Sign In</h1>
      <form>
        <label>Email</label>
        <input type="email"/>
        <label>Password</label>
        <input type="password"/>
      </form>
    </>
  );
}

export default SignIn;