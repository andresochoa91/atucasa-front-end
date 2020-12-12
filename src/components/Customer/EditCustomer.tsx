import React, { FC, useState } from 'react';

interface ICustomerProps {
  handleCurrentCustomer: () => void
};

const EditCustomer: FC<ICustomerProps> = ({ handleCurrentCustomer }): JSX.Element => {
  const [ username, setUsername ] = useState<string>("");
  const [ firstName, setFirstName ] = useState<string>("");
  const [ lastName, setLastName ] = useState<string>("");
  const [ phoneNumber, setPhoneNumber ] = useState<string>("");
  const [ profilePicture, setProfilePicture ] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { name, value } = event.target;
    (
      name === "username" ?
        setUsername :
      name === "firstName" ?
        setFirstName :
      name === "lastName" ? 
        setLastName :
      name === "phoneNumber" ?
        setPhoneNumber :
      setProfilePicture  
    )(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const newDataCustomer:TCurrentCustomer = {};
    if (username) newDataCustomer.username = username;
    if (firstName) newDataCustomer.first_name = firstName;
    if (lastName) newDataCustomer.last_name = lastName;
    if (phoneNumber) newDataCustomer.phone_number = phoneNumber;
    if (profilePicture) newDataCustomer.profile_picture = profilePicture;

    console.log(newDataCustomer);

    fetch(`${process.env.REACT_APP_API}/current_user/customer`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDataCustomer)
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        console.log(data);
        setUsername("");
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setProfilePicture("");
        handleCurrentCustomer();
      } else {
        console.log(data);
      }
    })
    .catch(console.error);
  };

  return(
    <>
      <h2>Edit Customer</h2>
      <form onSubmit={ handleSubmit }>
      <label>Username</label>
        <input 
          type="text"
          name="username"
          value={ username }
          onChange={ handleInput }
        />
        <br/>
        <label>First Name</label>
        <input 
          type="text"
          name="firstName"
          value={ firstName }
          onChange={ handleInput }
        />
        <br/>
        <label>Last Name</label>
        <input 
          type="text"
          name="lastName"
          value={ lastName }
          onChange={ handleInput }
        />
        <br/>
        <label>Phone Number</label>
        <input 
          type="text"
          name="phoneNumber"
          value={ phoneNumber } 
          onChange={ handleInput } 
        />
        <br/>
        <label>Profile picture</label>
        <input 
          type="text"
          name="profilePicture"
          value={ profilePicture }
          onChange={ handleInput }
        />
        <br/>
        <input type="submit" value="Update"/>
      </form>
      <br/>
    </>
  );
};

export default EditCustomer;