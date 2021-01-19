import React, { FC, useContext, useState } from 'react';
import UpdateImage from '../UpdateImage/UpdateImage';
import { Link, useHistory } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';

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
  const [ taxId, setTaxId ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");
  const [ profilePicture, setProfilePicture ] = useState<string>("");
  const [ backgroundPicture, setBackgroundPicture ] = useState<string>("");

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

    fetch(`${process.env.REACT_APP_API}/current_user/merchant`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
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
      <Link to="/home/user_information">Go back to user information</Link>
      <form onSubmit={ handleSubmit }>
        <label>Profile Picture:&nbsp;</label>
        <UpdateImage 
          currentPicture = { currentMerchant.profile_picture }
          userName = { currentMerchant.merchant_name }
          handleInput = { handleInput }
          newPicture = { profilePicture }
          setNewPicture = { setProfilePicture }
          namePicture={ "profilePicture" }
        />
        <br/>
        <label>Background Picture:&nbsp;</label>
        <UpdateImage 
          currentPicture = { currentMerchant.background_picture }
          userName = { currentMerchant.merchant_name }
          handleInput = { handleInput }
          newPicture = { backgroundPicture }
          setNewPicture = { setBackgroundPicture }
          namePicture={ "backgroundPicture" }
        />
        <br/>
        <label>Merchant Name:&nbsp;</label>
        <input 
          type="text"
          name="merchantName"
          value={ merchantName }
          onChange={ handleInput } 
          placeholder={ currentMerchant.merchant_name }
        />
        <br/>
        <label>Phone Number:&nbsp;</label>
        <input 
          type="text"
          name="phoneNumber"
          value={ phoneNumber }
          onChange={ handleInput } 
          placeholder={ currentMerchant.phone_number }
        />
        <br/>
        <label>Tax ID:&nbsp;</label>
        <input 
          type="text"
          name="taxId"
          value={ taxId }
          onChange={ handleInput } 
          placeholder={ currentMerchant.tax_id }
        />
        <br/>
        <label>Description:&nbsp;</label>
        <input 
          type="text"
          name="description"
          value={ description }
          onChange={ handleInput } 
          placeholder={ currentMerchant.description }
        />
        <br/>
        <input type="submit" value="Update"/>
      </form>
      <br/>
    </>
  );
};

export default EditMerchant;