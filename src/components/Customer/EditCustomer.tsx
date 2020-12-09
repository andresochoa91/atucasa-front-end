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

  const handleInput = (event: React.ChangeEvent<HTMLFormElement>): void => {
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

    fetch("http://localhost:3000/current_user/customer", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDataCustomer)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (!data.error) handleCurrentCustomer();
    })
    .catch(console.error);
  };

  return(
    <>
      <h2>Edit Customer</h2>
      <form onChange={ handleInput } onSubmit={ handleSubmit }>
      <label>Username</label>
        <input 
          type="text"
          name="username"
          defaultValue={ username }
        />
        <br/>
        <label>First Name</label>
        <input 
          type="text"
          name="firstName"
          defaultValue={ firstName }
        />
        <br/>
        <label>Last Name</label>
        <input 
          type="text"
          name="lastName"
          defaultValue={ lastName }
        />
        <br/>
        <label>Phone Number</label>
        <input 
          type="text"
          name="phoneNumber"
          defaultValue={ phoneNumber }  
        />
        <br/>
        <label>Profile picture</label>
        <input 
          type="text"
          name="profilePicture"
          defaultValue={ profilePicture }
        />
        <br/>
        <input type="submit" value="Update"/>
      </form>
      <br/>
    </>
  );
};

export default EditCustomer;