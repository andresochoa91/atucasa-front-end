import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';

const EditLocation: FC = (): JSX.Element => {
  const { location, handleLocation } = useContext<TContextProps>(AtucasaContext);
  const [ country, setCountry ] = useState<string>("");
  const [ state, setState ] = useState<string>("");
  const [ city, setCity ] = useState<string>("");
  const [ address, setAddress ] = useState<string>("");
  const [ zipCode, setZipCode ] = useState<string>("");
  const [ details, setDetails ] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { value, name } = event.target;
    ( 
      name === "country" ?
        setCountry :
      name === "state" ?
        setState :
      name === "city" ?
        setCity :
      name === "address" ?
        setAddress :
      name === "zipCode" ?
        setZipCode :
      setDetails  
    )(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newLocation: TLocation = {};

    if (country) newLocation.country = country;
    if (state) newLocation.state = state;
    if (city) newLocation.city = city;
    if (address) newLocation.address = address;
    if (zipCode) newLocation.zip_code = zipCode;
    if (details) newLocation.details = details;

    fetch(`${process.env.REACT_APP_API}/current_user/location`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newLocation)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (!data.error) {
        setCountry("");
        setState("");
        setCity("");
        setAddress("");
        setZipCode("");
        setDetails("");
        handleLocation();
      }
    })
    .catch(console.error);
  };

  return (
    <>
      {
        location && (
          <>
            <h2>Edit Location</h2>
            <form onSubmit={ handleSubmit } >
              <label>Country</label>
              <input 
                type="text"
                name="country" 
                value={ country }
                onChange={ handleInput } 
              />
              <br/>              
              <label>State</label>
              <input 
                type="text"
                name="state" 
                value={ state }
                onChange={ handleInput } 
              />
              <br/>
              <label>City</label>
              <input 
                type="text"
                name="city" 
                value={ city }
                onChange={ handleInput } 
              />
              <br/>
              <label>Address</label>
              <input 
                type="text"
                name="address" 
                value={ address }
                onChange={ handleInput } 
              />
              <br/>
              <label>Zip Code</label>
              <input 
                type="text"
                name="zipCode" 
                value={ zipCode }
                onChange={ handleInput } 
              />
              <br/>
              <label>Details</label>
              <input 
                type="text"
                name="details" 
                value={ details }
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

export default EditLocation;