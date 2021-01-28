import React, { FC, useState, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { Form, Col, Button } from 'react-bootstrap';

import cookie from 'react-cookies';

const SignUp: FC = (): JSX.Element => {

  const { 
    handleCurrentUser, 
    setCurrentMessageValidation,
    setCurrentMessage,
    setCurrentTitleMessage 
  } = useContext<TContextProps>(AtucasaContext);

  const [ email, setEmail ] = useState<string>("a@gmail.com");
  const [ password, setPassword ] = useState<string>("123456789");
  const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>("123456789");
  const [ role, setRole ] = useState<string>("customer");
  const [ validated, setValidated ] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = event.currentTarget;
    ( 
      name === "email" ? setEmail : 
      name === "password" ? setPassword :
      setPasswordConfirmation 
    )(value); 
  };

  const handleRole = (event:React.MouseEvent<HTMLOptionElement>):void => {
    event.preventDefault();
    setRole(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!email && !password && !passwordConfirmation) {
      setCurrentMessage(`Please provide Email, Password and Password Confirmation`);
      setCurrentTitleMessage("Error Signing Up");
      setCurrentMessageValidation(true);
      return;
    }

    setValidated(true);
    fetch(`${process.env.REACT_APP_API}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,
        role
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (!data.error) {
        // document.cookie = `token=${data.user.token}`;
        cookie.save("token", data.token, { path: "/", secure: true });
        handleCurrentUser();
      } else {
        const { password, email, password_confirmation } = data.error;
        if (password) {
          setCurrentMessage(`Password ${password[0]}`);
        } else if (email) {
          setCurrentMessage(`${email[0]}`);
        } else if (password_confirmation) {
          setCurrentMessage("Password confirmation doesn't match");
        }
        setCurrentTitleMessage("Error Signing Up");
        setCurrentMessageValidation(true);
      }
    })
    .catch(console.error);
  };

  return (
    <div className="mt-4">
      <h2>Sign Up</h2>
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

        <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom04">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            defaultValue={ passwordConfirmation }
            onChange={ handleInput }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Label>Type of user</Form.Label>
        <br/>
        <select name="role" id="role">
          <option value="customer" onClick={ handleRole }>Customer</option>
          <option value="merchant" onClick={ handleRole }>Merchant</option>
        </select>
        <br/><br/>
        <Button className="w-75" type="submit">Register</Button>
      </Form>
    </div> 
  );
};

export default SignUp;