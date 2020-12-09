import React, { FC, useState } from 'react';

interface IMerchantProps {
  handleCurrentMerchant: () => void
};

const EditMerchant: FC<IMerchantProps> = ({ handleCurrentMerchant }): JSX.Element => {
  const [ merchantName, setMerchantName ] = useState<string>("");
  const [ phoneNumber, setPhoneNumber ] = useState<string>("");
  const [ taxId, setTaxId ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");
  const [ profilePicture, setProfilePicture ] = useState<string>("");
  const [ backgroundPicture, setBackgroundPicture ] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLFormElement>): void => {
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

    console.log(newDataMerchant);

    fetch("http://localhost:3000/current_user/merchant", {
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
      if (!data.error) handleCurrentMerchant();
    })
    .catch(console.error);
  };

  return(
    <>
      <h2>Edit Merchant</h2>
      <form onChange={ handleInput } onSubmit={ handleSubmit }>
        <label>Merchant Name</label>
        <input 
          type="text"
          name="merchantName"
          defaultValue={ merchantName }
        />
        <br/>
        <label>Phone Number</label>
        <input 
          type="text"
          name="phoneNumber"
          defaultValue={ phoneNumber }
        />
        <br/>
        <label>Tax ID</label>
        <input 
          type="text"
          name="taxId"
          defaultValue={ taxId }
        />
        <br/>
        <label>Description</label>
        <input 
          type="text"
          name="description"
          defaultValue={ description }
        />
        <br/>
        <label>Profile Picture</label>
        <input 
          type="text"
          name="profilePicture"
          defaultValue={ profilePicture }
        />
        <br/>
        <label>Background Picture</label>
        <input 
          type="text"
          name="backgroundPicture"
          defaultValue={ backgroundPicture }
        />
        <br/>
        <input type="submit" value="Update"/>
      </form>
      <br/>
    </>
  );
};

export default EditMerchant;