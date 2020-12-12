import React, { FC, useState, useContext } from 'react';
import { AtucasaContext } from '../../Context';

const SignIn: FC = (): JSX.Element => {
  const { handleCurrentUser } = useContext<TContextProps>(AtucasaContext);
  const [ email, setEmail ] = useState<string>("h@v.com");
  const [ password, setPassword ] = useState<string>("123456789");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = event.target;
    ( name === "email" ? setEmail : setPassword )(value); 
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        console.log(data);
        handleCurrentUser();
      } else {
        console.log(data);
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={ handleSubmit }>
        <label>Email</label>
        <input 
          type="email"
          placeholder="email"
          name="email"
          value={ email }
          onChange={ handleInput }
          required
        />     
        <label>Password</label>
        <input 
          type="password"
          placeholder="password"
          name="password"
          value={ password }
          onChange={ handleInput }
          required
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default SignIn;