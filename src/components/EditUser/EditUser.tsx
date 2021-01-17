import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';
import { Link, useHistory } from 'react-router-dom';
import BackHomePage from '../BackHomePage/BackHomePage';
import MainModal from '../MainModal/MainModal';

const EditUser: FC = (): JSX.Element => {
  const { 
    currentUser, 
    handleCurrentUser,
    currentMessage, 
    setCurrentMessage,
    currentTitleMessage,
    setCurrentTitleMessage,
    setCurrentMessageValidation  
  } = useContext<TContextProps>(AtucasaContext);
  const [ newEmail, setNewEmail ] = useState<string>("");
  const [ newPassword, setNewPassword ] = useState<string>("");
  const [ currentPassword, setCurrentPassword ] = useState<string>("");
  const history = useHistory();

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
      if (newEmail || newPassword) {
        if (!data.error) {
          handleCurrentUser();
          history.push("/home/user_information");
        } else if (data.error) {
          const { current_password, password, email } = data.error;
          if (current_password) {
            setCurrentMessage(current_password);
            setCurrentTitleMessage("Password Error");
          } else if (password) {
            setCurrentMessage(`Password ${password[0]}`);
            setCurrentTitleMessage("Error updating Password");
          } else if (email) {
            setCurrentMessage(email[0]);
            setCurrentTitleMessage("Error updating Email");
          }
          setCurrentMessageValidation(true); 
        }
      } else {
        setCurrentMessage("There is nothing to update");
        setCurrentTitleMessage("Error updating data");
        setCurrentMessageValidation(true); 
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>
      <BackHomePage />    
      {
        currentUser && (
          <>
            <h2>Update Email or Password</h2>
            <p style={{ color: "#f60" }}>To change email or password, current password is required</p>
            <p style={{ color: "#f60" }}>If you only want to update email, you can leave password field in blank, and viceversa</p>
            <Link to="/home/user_information">Go back to user information</Link>    
            <form onSubmit={ handleSubmit } >
              <label>New Email: </label>
              <input 
                type="email"
                name="newEmail" 
                value={ newEmail }
                onChange={ handleInput } 
                placeholder={ currentUser.email }
              />
              <br/>
              <label>New Password: </label>
              <input 
                type="password"
                name="newPassword"
                value={ newPassword }
                onChange={ handleInput } 
              />
              <br/>
              <label>Type current password to confirm changes: </label>
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