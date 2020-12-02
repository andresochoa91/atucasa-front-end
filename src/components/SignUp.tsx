import React, { FC, useState } from 'react';

const SignUp: FC = (): JSX.Element => {

  const [ email, setEmail ] = useState<string>("h@v.com")
  const [ password, setPassword ] = useState<string>("123456789")
  const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>("123456789")
  const [ role, setRole ] = useState<string>("customer")

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = event.target;
    ( 
      name === "email" ? setEmail : 
      name === "password" ? setPassword :
      setPasswordConfirmation 
    )(value); 
  }

  const handleRole = (event:React.MouseEvent<HTMLOptionElement>):void => {
    event.preventDefault();
    setRole(event.currentTarget.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch("https://atupuerta.herokuapp.com/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,
        role
      })
    })
    .then(response => response.json())
    .then(console.log)
    .catch(err => console.error(err));
  }

  return (
    <>
      <h1>Sign Up</h1>
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
        <label>Password Confirmation</label>
        <input 
          type="password"
          placeholder="password confirmation"
          name="passwordConfirmation"
          value={ passwordConfirmation }
          onChange={ handleInput }
          required
        />
        <label>Role</label>
        <select name="role" id="role">
          <option value="customer" onClick={ handleRole }>Customer</option>
          <option value="merchant" onClick={ handleRole }>Merchant</option>
        </select>
        <input type="submit"/>
      </form>
    </>
  );
}

export default SignUp;