import React, { FC, useContext, useState/* , useEffect */ } from 'react';
import { AtucasaContext } from '../../Context';

const EditUser: FC = (): JSX.Element => {
  const { currentUser, handleCurrentUser } = useContext<TContextProps>(AtucasaContext);
  const [ newEmail, setNewEmail ] = useState<string>("");
  const [ newPassword, setNewPassword ] = useState<string>("");
  const [ currentPassword, setCurrentPassword ] = useState<string>("");

  // useEffect(() => {
  //   if (currentUser) {
  //     setNewEmail(currentUser.email);
  //   }
  // }, [currentUser]);

  const handleInput = (event: React.ChangeEvent<HTMLFormElement>): void => {
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

    if (newEmail) newDataUser.email = newEmail
    if (newPassword) newDataUser.password = newPassword

    fetch("http://localhost:3000/current_user/update", {
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
      if (!data.error) handleCurrentUser();
    })
    .catch(console.error)
  };

  return (
    <>
      {
        currentUser && 
          <>
            <h2>Edit User</h2>
            <form onChange={ handleInput } onSubmit={ handleSubmit } >
              <label>New Email</label>
              <input 
                type="email"
                name="newEmail" 
                defaultValue={ newEmail }
              />
              <br/>
              <label>New Password</label>
              <input 
                type="password"
                name="newPassword"
                defaultValue={ newPassword }
              />
              <br/>
              <label>Current Password</label>
              <input 
                type="password"
                name="currentPassword"
                defaultValue={ currentPassword }
              />
              <br/>
              <input 
                type="submit" 
                value="Update"
              />
            </form>
            <br/>
          </>
      }
    </>
  );
}

export default EditUser;