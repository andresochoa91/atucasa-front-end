import React, { FC, useState, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { Form, Button, Col } from 'react-bootstrap';
import cookie from 'react-cookies';

const SignIn: FC = (): JSX.Element => {
  const { 
    handleCurrentUser, 
    setCurrentMessage,
    setCurrentTitleMessage, 
    setCurrentMessageValidation 
  } = useContext<TContextProps>(AtucasaContext);

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ validated, setValidated ] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = event.currentTarget;
    ( name === "email" ? setEmail : setPassword )(value); 
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    
    setValidated(true);
    
    fetch(`${process.env.REACT_APP_API}/login`, {
      method: "POST",
      credentials: "include",
      mode: 'cors',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => {
      const token = response.headers.get("authorization")
      if (token) {
        cookie.save("token", token, { path: "/", secure: true });
        handleCurrentUser();
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        setCurrentMessage(data.error);
        setCurrentTitleMessage("Error signing in");
        setCurrentMessageValidation(true);
      }
    })
    .catch(console.error);
  };

  return (
    <div className="mt-4">
      <h2>Sign In</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={ email }
            onChange={ handleInput }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            defaultValue={ password }
            onChange={ handleInput }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>        
        <Button className="w-75" type="submit">Sign In</Button>
      </Form>
    </div>  
  );
};

export default SignIn;