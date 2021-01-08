import React, { FC, useState } from 'react';
import GoBack from '../GoBack/GoBack';
import UpdateImage from '../UpdateImage/UpdateImage';
interface IMerchantProps {
  handleCurrentMerchant: () => void,
  currentMerchant: TCurrentMerchant
};

const EditMerchant: FC<IMerchantProps> = ({ handleCurrentMerchant, currentMerchant }): JSX.Element => {
  const [ merchantName, setMerchantName ] = useState<string>("");
  const [ phoneNumber, setPhoneNumber ] = useState<string>("");
  const [ taxId, setTaxId ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");
  const [ profilePicture, setProfilePicture ] = useState<string>("");
  const [ backgroundPicture, setBackgroundPicture ] = useState<string>("");

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

    const newDataMerchant:TCurrentMerchant = {};
    if (merchantName) newDataMerchant.merchant_name = merchantName;
    if (phoneNumber) newDataMerchant.phone_number = phoneNumber;
    if (taxId) newDataMerchant.tax_id = taxId;
    if (description) newDataMerchant.description = description;
    if (profilePicture) newDataMerchant.profile_picture = profilePicture;
    if (backgroundPicture) newDataMerchant.background_picture = backgroundPicture;

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
      console.log(data);
      if (!data.error) {
        setMerchantName("");
        setPhoneNumber("");
        setTaxId("");
        setDescription("");
        setProfilePicture("");
        setBackgroundPicture("");
        handleCurrentMerchant();
      }
    })
    .catch(console.error);
  };

  return(
    <>
      <GoBack />
      <h2>Edit Merchant</h2>
      <form onSubmit={ handleSubmit }>
        <label>Merchant Name</label>
        <input 
          type="text"
          name="merchantName"
          value={ merchantName }
          onChange={ handleInput } 
          placeholder={ currentMerchant.merchant_name }
        />
        <br/>
        <label>Phone Number</label>
        <input 
          type="text"
          name="phoneNumber"
          value={ phoneNumber }
          onChange={ handleInput } 
          placeholder={ currentMerchant.phone_number }
        />
        <br/>
        <label>Tax ID</label>
        <input 
          type="text"
          name="taxId"
          value={ taxId }
          onChange={ handleInput } 
          placeholder={ currentMerchant.tax_id }
        />
        <br/>
        <label>Description</label>
        <input 
          type="text"
          name="description"
          value={ description }
          onChange={ handleInput } 
          placeholder={ currentMerchant.description }
        />
        <br/>
        <label>Profile Picture</label>
        {/* <input 
          type="text"
          name="profilePicture"
          value={ profilePicture }
          onChange={ handleInput } 
        /> */}
        <UpdateImage 
          currentPicture = { currentMerchant.profile_picture }
          userName = { currentMerchant.merchant_name }
          handleInput = { handleInput }
          newPicture = { profilePicture }
          setNewPicture = { setProfilePicture }
        />
        <br/>
        <label>Background Picture</label>
        <UpdateImage 
          currentPicture = { currentMerchant.background_picture }
          userName = { currentMerchant.merchant_name }
          handleInput = { handleInput }
          newPicture = { backgroundPicture }
          setNewPicture = { setBackgroundPicture }
        />
        <br/>
        <input type="submit" value="Update"/>
      </form>
      <br/>
    </>
  );
};

export default EditMerchant;