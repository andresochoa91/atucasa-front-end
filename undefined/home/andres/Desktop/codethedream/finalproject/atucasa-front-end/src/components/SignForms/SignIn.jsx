import React, { useState, useContext } from 'react';
import { AtucasaContext } from '../../Context';
var SignIn = function () {
    var handleCurrentUser = useContext(AtucasaContext).handleCurrentUser;
    var _a = useState("andres_ochoa91@hotmail.com"), email = _a[0], setEmail = _a[1];
    var _b = useState("123456789"), password = _b[0], setPassword = _b[1];
    var handleInput = function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        (name === "email" ? setEmail : setPassword)(value);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + "/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (!data.error) {
                console.log(data);
                handleCurrentUser();
            }
            else {
                console.log(data);
            }
        })
            .catch(console.error);
    };
    return (<>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" placeholder="email" name="email" value={email} onChange={handleInput} required/>     
        <label>Password</label>
        <input type="password" placeholder="password" name="password" value={password} onChange={handleInput} required/>
        <input type="submit"/>
      </form>
    </>);
};
export default SignIn;