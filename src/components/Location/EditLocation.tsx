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

  const handleInput = (event: React.ChangeEvent<HTMLFormElement>): void => {
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

    fetch("http://localhost:3000/current_user/location", {
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
      if (!data.error) handleLocation();
    })
    .catch(console.error);
  };

  return (
    <>
      {
        location && 
          <>
            <h2>Edit Location</h2>
            <form onChange={ handleInput } onSubmit={ handleSubmit } >
              <label>Country</label>
              <input 
                type="text"
                name="country" 
                defaultValue={ country }
              />
              <br/>              
              <label>State</label>
              <input 
                type="text"
                name="state" 
                defaultValue={ state }
              />
              <br/>
              <label>City</label>
              <input 
                type="text"
                name="city" 
                defaultValue={ city }
              />
              <br/>
              <label>Address</label>
              <input 
                type="text"
                name="address" 
                defaultValue={ address }
              />
              <br/>
              <label>Zip Code</label>
              <input 
                type="text"
                name="zipCode" 
                defaultValue={ zipCode }
              />
              <br/>
              <label>Details</label>
              <input 
                type="text"
                name="details" 
                defaultValue={ details }
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
};

export default EditLocation;