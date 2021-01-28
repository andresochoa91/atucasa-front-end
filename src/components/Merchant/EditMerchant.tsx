import React, { FC, useContext, useState } from 'react';
import UpdateImage from '../UpdateImage/UpdateImage';
import { Link, useHistory } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';
import { Button } from 'react-bootstrap';

import cookie from 'react-cookies';

interface IMerchantProps {
  handleCurrentMerchant: () => void,
  currentMerchant: TCurrentMerchant
};

const EditMerchant: FC<IMerchantProps> = ({ handleCurrentMerchant, currentMerchant }): JSX.Element => {

  const { 
    handleMerchants,
    setCurrentMessageValidation, 
    currentMessage, 
    setCurrentMessage,
    currentTitleMessage,
    setCurrentTitleMessage 
  } = useContext<TContextProps>(AtucasaContext);

  const [ merchantName, setMerchantName ] = useState<string>("");
  const [ phoneNumber, setPhoneNumber ] = useState<string>("");

  /**Legal id of the Store */
  const [ taxId, setTaxId ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");
  const [ profilePicture, setProfilePicture ] = useState<string>("");
  const [ backgroundPicture, setBackgroundPicture ] = useState<string>("");

  /** History of Path Url*/
  const history = useHistory();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { name, value } = event.target;
    (
      name === "merchantName" ?
        setMerchantName :
      name === "phoneNumber" ?
        setPhoneNumber :
      name === "taxId" ? 
        setTaxId :
      name === "description" ?
        setDescription :
      name === "profilePicture" ?
        setProfilePicture :
      setBackgroundPicture  
    )(value);
  };

  /**
   *Checks all the information submitted by the merchant is correct
   *Updates merchant information 
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!merchantName && !phoneNumber && !taxId && !description && !profilePicture && !backgroundPicture) {
      setCurrentMessage("There is nothing to update");
      setCurrentTitleMessage("Fields empty")
      setCurrentMessageValidation(true);
      return; 
    }

    const newDataMerchant:TCurrentMerchant = {};
    newDataMerchant.merchant_name = merchantName ? merchantName : currentMerchant.merchant_name;
    newDataMerchant.phone_number = phoneNumber ? phoneNumber : currentMerchant.phone_number;
    newDataMerchant.tax_id = taxId ? taxId : currentMerchant.tax_id ;
    newDataMerchant.description = description ? description : currentMerchant.description;
    newDataMerchant.profile_picture = profilePicture ? profilePicture : currentMerchant.profile_picture;
    newDataMerchant.background_picture = backgroundPicture ? backgroundPicture : currentMerchant.background_picture;

    //Put request to api to update merchant information
    fetch(`${process.env.REACT_APP_API}/current_user/merchant`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.load("token")
      },
      body: JSON.stringify(newDataMerchant)
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        setMerchantName("");
        setPhoneNumber("");
        setTaxId("");
        setDescription("");
        setProfilePicture("");
        setBackgroundPicture("");
        handleCurrentMerchant();
        handleMerchants();
        history.push("/home/user_information");
      } else {
        //Handling validations in response sent from the back-end
        ((err) => {
          const {merchant_name, phone_number, tax_id, description, profile_picture, background_picture} = err;
          if (merchant_name) {
            setCurrentMessage(`Merchant Name ${merchant_name}`);
          } else if (phone_number) {
            setCurrentMessage(phone_number);
          } else if (tax_id) {
            setCurrentMessage(`Tax ID ${tax_id}`);
          } else if (description) {
            setCurrentMessage(`Description ${description}`);
          } else if (profile_picture) {
            setCurrentMessage(`Profile Picture ${profile_picture}`);
          } else if (background_picture) {
            setCurrentMessage(`Background Picture ${background_picture}`);
          }
          setCurrentTitleMessage("Error editing merchant")
          setCurrentMessageValidation(true);
        })(data.error);
        console.log(data.error)
      }
    })
    .catch(console.error);
  };

  return(
    <>

      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>

      <h2>Edit Merchant</h2>

      <form onSubmit={ handleSubmit }>

        <MultiPurposeCard>
          <tbody>

            <tr><td>
              <Link to="/home/user_information">Go back to user information</Link>
            </td></tr>

            <tr><td>
              <strong>
                <label>Merchant Name:&nbsp;</label>
              </strong>
              <input 
                type="text"
                name="merchantName"
                value={ merchantName }
                onChange={ handleInput } 
                placeholder={ currentMerchant.merchant_name }
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Phone Number:&nbsp;</label>
              </strong>
              <input 
                type="text"
                name="phoneNumber"
                value={ phoneNumber }
                onChange={ handleInput } 
                placeholder={ currentMerchant.phone_number }
                style={{
                  width: "230px"
                }}
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Tax ID:&nbsp;</label>
              </strong>
              <input 
                type="text"
                name="taxId"
                value={ taxId }
                onChange={ handleInput } 
                placeholder={ currentMerchant.tax_id }
                style={{
                  width: "300px"
                }}
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Description:&nbsp;</label>
              </strong>
              <input 
                type="text"
                name="description"
                value={ description }
                onChange={ handleInput } 
                placeholder={ currentMerchant.description }
                style={{
                  width: "260px"
                }}
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Profile Picture:</label>
              </strong>
              <UpdateImage 
                currentPicture = { currentMerchant.profile_picture }
                userName = { currentMerchant.merchant_name }
                handleInput = { handleInput }
                newPicture = { profilePicture }
                setNewPicture = { setProfilePicture }
                namePicture={ "profilePicture" }
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Profile Picture:</label>
              </strong>
              <UpdateImage 
                currentPicture = { currentMerchant.background_picture }
                userName = { currentMerchant.merchant_name }
                handleInput = { handleInput }
                newPicture = { backgroundPicture }
                setNewPicture = { setBackgroundPicture }
                namePicture={ "backgroundPicture" }
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
      <br/>
    </>
  );
};

export default EditMerchant;