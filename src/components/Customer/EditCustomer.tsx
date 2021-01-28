import React, { FC, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UpdateImage from '../UpdateImage/UpdateImage';
import { useHistory } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookies';

interface ICustomerProps {
  handleCurrentCustomer: () => void,
  currentCustomer: TCurrentCustomer
};

const EditCustomer: FC<ICustomerProps> = ({ handleCurrentCustomer, currentCustomer }): JSX.Element => {
  const { 
    setCurrentMessageValidation, 
    currentMessage, 
    setCurrentMessage,
    currentTitleMessage,
    setCurrentTitleMessage 
  } = useContext<TContextProps>(AtucasaContext);
  const [ username, setUsername ] = useState<string>("");
  const [ firstName, setFirstName ] = useState<string>("");
  const [ lastName, setLastName ] = useState<string>("");
  const [ phoneNumber, setPhoneNumber ] = useState<string>("");
  const [ profilePicture, setProfilePicture ] = useState<string>("");

  /**
   * History of Path Url
   */
  const history = useHistory();

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

  /**
   *Checks all the information submitted by the customer is correct
   *Updates Customer information 
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  
    if (!username && !firstName && !lastName && !phoneNumber && !profilePicture) {
      setCurrentMessage("There is nothing to update");
      setCurrentTitleMessage("Fields empty")
      setCurrentMessageValidation(true);
      return;
    };

    const newDataCustomer:TCurrentCustomer = {};
    if (username) newDataCustomer.username = username;
    if (firstName) newDataCustomer.first_name = firstName;
    if (lastName) newDataCustomer.last_name = lastName;
    if (phoneNumber) newDataCustomer.phone_number = phoneNumber;
    if (profilePicture) newDataCustomer.profile_picture = profilePicture;

    //Put request to api to submit customer information
    fetch(`${process.env.REACT_APP_API}/current_user/customer`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.load("token")
      },
      body: JSON.stringify(newDataCustomer)
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        setUsername("");
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setProfilePicture("");
        handleCurrentCustomer();
        history.push('/home/user_information');
      } else if (data.error) {
        //Handling validations in response sent from the back-end
        ((error) => {
          const { username, first_name, last_name, phone_number, profile_picture } = error;
          if (username) {
            setCurrentMessage(`Username ${username[0]}`);
            setCurrentTitleMessage("Error updating Username");
          } else if (first_name) {
            setCurrentMessage(`First Name ${first_name[0]}`);
            setCurrentTitleMessage("Error updating First Name");
          } else if (last_name) {
            setCurrentMessage(`Last Name ${last_name[0]}`);
            setCurrentTitleMessage("Error updating Last Name");
          } else if (phone_number) {
            setCurrentMessage(`Phone Number has a ${phone_number[0]}. Ex: 3127894561`);
            setCurrentTitleMessage("Error updating Phone Number");
          } else if (profile_picture) {
            setCurrentMessage(`Profile Picture has a ${profile_picture[0]}. Url needs to start with "http://" or "https://"`);
            setCurrentTitleMessage("Error updating Profile Picture");
          }
          setCurrentMessageValidation(true); 
        })(data.error);
      }
    })
    .catch(console.error);
  };

  return(
    <>
      <h2 className="mb-5">Edit Customer</h2>
      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>
      

      <form onSubmit={ handleSubmit } >
        <MultiPurposeCard>
          <tbody>

            <tr><td>
              <Link to="/home/user_information">Go back to user information</Link>
            </td></tr>

            <tr><td>
              <strong>
                <label>Profile Picture:</label>
              </strong>
              <UpdateImage 
                currentPicture = { currentCustomer.profile_picture }
                userName = { currentCustomer.username }
                handleInput = { handleInput }
                newPicture = { profilePicture }
                setNewPicture = { setProfilePicture }
                namePicture={ "profilePicture" }
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Username: &nbsp;</label>
              </strong>
              <input 
                type="text"
                name="username"
                value={ username }
                onChange={ handleInput }
                placeholder={ currentCustomer.username }
                className="float-right w-75"
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>First Name: &nbsp;</label>
              </strong>
              <input 
                type="text"
                name="firstName"
                value={ firstName }
                onChange={ handleInput }
                placeholder={ currentCustomer.first_name }
                className="float-right w-75"
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Last Name: &nbsp;</label>
              </strong>
              <input 
                type="text"
                name="lastName"
                value={ lastName }
                onChange={ handleInput }
                placeholder={ currentCustomer.last_name }
                className="float-right w-75"
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Phone: &nbsp;</label>
              </strong>
              <input 
                type="text"
                name="phoneNumber"
                value={ phoneNumber } 
                onChange={ handleInput } 
                placeholder={ currentCustomer.phone_number }
                className="float-right w-75"
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
    </>
  );
};

export default EditCustomer;