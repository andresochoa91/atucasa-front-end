import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';
import { Link, useHistory } from 'react-router-dom';
import MainModal from '../MainModal/MainModal';
// import ContainerJumbotron from '../ContainerJumbotron/ContainerJumbotron';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';
import { Button } from 'react-bootstrap';

/**
 *Allows user (either customer or merchant) to update email and/or password 
 */
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

  /**
   * History of Path Url
   */
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


  /**
   *Checks all the information submitted by the user is correct
   *Updates email and/or password information 
   */
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
          //Handling validations in response sent from the back-end
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
      <h2>Update Email or Password</h2>
      {
        currentUser && (
          <form onSubmit={ handleSubmit } >
            <MultiPurposeCard>
                  
              <tbody>

                <tr><td>
                  <Link to="/home/user_information">Go back to user information</Link>
                </td></tr>

                <tr><td style={{ color: "#f60" }}>
                  To change email or password, current password is required
                </td></tr>
                
                <tr><td style={{ color: "#f60" }}>
                  If you only want to update email, you can leave password field in blank, and viceversa
                </td></tr>
                <tr><td>
                  <strong>
                    <label>New Email: &nbsp;</label>
                  </strong>
                  <input 
                    type="email"
                    name="newEmail" 
                    value={ newEmail }
                    onChange={ handleInput } 
                    placeholder={ currentUser.email }
                    className="float-right w-75"
                  />
                </td></tr>

                <tr><td>
                  <strong>
                    <label>New Password: &nbsp;</label>
                  </strong>
                  <input 
                    type="password"
                    name="newPassword"
                    value={ newPassword }
                    onChange={ handleInput }
                    className="float-right pr-4 pl-5"
                  />
                </td></tr>

                <tr><td>
                  <strong>
                    <label>Current Password: &nbsp;</label>
                  </strong>
                  <input 
                    type="password"
                    name="currentPassword"
                    value={ currentPassword }
                    onChange={ handleInput } 
                    className="float-right px-4"
                  />
                </td></tr>

                <tr><td className="pb-0">
                  <Button 
                    type="submit" 
                    className="btn-success"
                  >
                    Update
                  </Button>
                </td></tr>  
              </tbody>             
            </MultiPurposeCard>
          </form>
        )
      }
    </>
  );
};

export default EditUser;