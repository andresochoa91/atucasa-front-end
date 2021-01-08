import React, { FC, useContext, useState/* , useEffect */ } from 'react';
import { AtucasaContext } from '../../Context';
import { Link } from 'react-router-dom';

const EditUser: FC = (): JSX.Element => {
  const { currentUser, handleCurrentUser } = useContext<TContextProps>(AtucasaContext);
  const [ newEmail, setNewEmail ] = useState<string>("");
  const [ newPassword, setNewPassword ] = useState<string>("");
  const [ currentPassword, setCurrentPassword ] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { value, name } = event.target;
    ( 
      name === "newEmail" ?
        setNewEmail :
      name === "currentPassword" ?
        setCurrentPassword :
      setNewPassword 
    )(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    interface INewDataUser {
      email?: string,
      password?: string,
      current_password?: string
    };

    const newDataUser: INewDataUser = { 
      current_password: currentPassword 
    };

    if (newEmail) newDataUser.email = newEmail;
    if (newPassword) newDataUser.password = newPassword;

    fetch(`${process.env.REACT_APP_API}/current_user/update`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDataUser)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (!data.error) {
        setNewEmail("");
        setNewPassword("");
        setCurrentPassword("");
        handleCurrentUser();
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <Link to="/">Go back to home page</Link>    
      {
        currentUser && (
          <>
            <h2>Edit User</h2>
            <Link to="/user_information">Go back to user information</Link>    
            <form onSubmit={ handleSubmit } >
              <label>New Email</label>
              <input 
                type="email"
                name="newEmail" 
                value={ newEmail }
                onChange={ handleInput } 
                placeholder={ currentUser.email }
              />
              <br/>
              <label>New Password</label>
              <input 
                type="password"
                name="newPassword"
                value={ newPassword }
                onChange={ handleInput } 
              />
              <br/>
              <label>Current Password</label>
              <input 
                type="password"
                name="currentPassword"
                value={ currentPassword }
                onChange={ handleInput } 
              />
              <br/>
              <input 
                type="submit" 
                value="Update"
                onChange={ handleInput } 
              />
            </form>
            <br/>
          </>
        )
      }
    </>
  );
};

export default EditUser;