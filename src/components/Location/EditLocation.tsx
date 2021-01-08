import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';
import GoBack from '../GoBack/GoBack';

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

    newLocation.country = country ? country : location?.country;
    newLocation.state = state ? state : location?.state;
    newLocation.city = city ? city : location?.city;
    newLocation.address = address ? address : location?.address;
    newLocation.zip_code = zipCode ? zipCode : location?.zip_code;
    newLocation.details = details ? details : location?.details;

    fetch(`${process.env.REACT_APP_MAPQUEST_API}${newLocation.address},${newLocation.city},${newLocation.state},${newLocation.zip_code}`)
    .then(response => response.json())
    .then(data => { 
      const { lat, lng } = data.results[0].locations[0].displayLatLng;
      newLocation.latitude = lat;
      newLocation.longitude = lng;      

      fetch(`${process.env.REACT_APP_API}/current_user/location`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newLocation)
      })
      .then(response2 => response2.json())
      .then(data2 => {
        console.log(data2);
        if (!data2.error) {
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
    })
    .catch(console.error);

  };

  return (
    <>
      <GoBack />
      {
        location && (
          <>
            <h2>Edit Location</h2>
            <GoBack 
              message="to location"
              url="/location"
            />
            <form onSubmit={ handleSubmit } >
              <label>Country</label>
              <input 
                type="text"
                name="country" 
                value={ country }
                onChange={ handleInput } 
                placeholder={ location.country }
              />
              <br/>              
              <label>State</label>
              <input 
                type="text"
                name="state" 
                value={ state }
                onChange={ handleInput } 
                placeholder={ location.state }
              />
              <br/>
              <label>City</label>
              <input 
                type="text"
                name="city" 
                value={ city }
                onChange={ handleInput } 
                placeholder={ location.city }
              />
              <br/>
              <label>Address</label>
              <input 
                type="text"
                name="address" 
                value={ address }
                onChange={ handleInput } 
                placeholder={ location.address }
              />
              <br/>
              <label>Zip Code</label>
              <input 
                type="text"
                name="zipCode" 
                value={ zipCode }
                onChange={ handleInput } 
                placeholder={ location.zip_code }
              />
              <br/>
              <label>Details</label>
              <input 
                type="text"
                name="details" 
                value={ details }
                onChange={ handleInput } 
                placeholder={ location.details }
              />
              <br/>
              <input 
                type="submit" 
                value="Update"
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