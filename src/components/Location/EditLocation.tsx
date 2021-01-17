import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';
import { Link, useHistory } from 'react-router-dom';
import BackHomePage from '../BackHomePage/BackHomePage';
import { getCachedData } from '../GetCachedData';
import MainModal from '../MainModal/MainModal';

const EditLocation: FC = (): JSX.Element => {
  const { 
    location, 
    handleLocation,
    setCurrentMessageValidation, 
    currentMessage, 
    setCurrentMessage,
    currentTitleMessage,
    setCurrentTitleMessage  
  } = useContext<TContextProps>(AtucasaContext);
  const [ country, setCountry ] = useState<string>("");
  const [ state, setState ] = useState<string>("");
  const [ city, setCity ] = useState<string>("");
  const [ address, setAddress ] = useState<string>("");
  const [ zipCode, setZipCode ] = useState<string>("");
  const [ details, setDetails ] = useState<string>("");

  const history = useHistory();

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

    if (!country && !state && !city && !address && !zipCode && !details) {
      setCurrentMessage("There is nothing to update");
      setCurrentTitleMessage("Error updating Location");
      setCurrentMessageValidation(true); 
      return;
    }

    const newLocation: TLocation = {};

    newLocation.country = country ? country : location?.country;
    newLocation.state = state ? state : location?.state;
    newLocation.city = city ? city : location?.city;
    newLocation.address = address ? address : location?.address;
    newLocation.zip_code = zipCode ? zipCode : location?.zip_code;
    newLocation.details = details ? details : location?.details;

    ((newLocation) => {
      const { country, state, city, address, zip_code } = newLocation;
      if (country && country.length < 2) {
        setCurrentMessage("Country is too short (minimum is 2 characters)");
        setCurrentTitleMessage("Error updating Country");
        setCurrentMessageValidation(true);
        return; 
      } else if (state && state.length < 2) {
        setCurrentMessage("State is too short (minimum is 2 characters)");
        setCurrentTitleMessage("Error updating State");
        setCurrentMessageValidation(true);
        return; 
      } else if (city && city.length < 2) {
        setCurrentMessage("City is too short (minimum is 2 characters)");
        setCurrentTitleMessage("Error updating City");
        setCurrentMessageValidation(true);
        return; 
      } else if (address && address.length < 5) {
        setCurrentMessage("Address is too short (minimum is 5 characters)");
        setCurrentTitleMessage("Error updating Address");
        setCurrentMessageValidation(true);
        return; 
      } else if ((zip_code && !(Number(zip_code))) || (zip_code && ((zip_code.toString()).length !== 5))) {
        setCurrentMessage("Zip code only allows 5 contiguous numbers");
        setCurrentTitleMessage("Error updating Zip Code");
        setCurrentMessageValidation(true);
        return; 
      }
      
      getCachedData(`${newLocation.address},${newLocation.city},${newLocation.state},${newLocation.zip_code}`, "address")
      .then(response => {
        return JSON.parse(response.data.strData);
      })
      .then(data => {
        console.log(data);
        const { 
          displayLatLng,
          adminArea1, 
          adminArea3,
          adminArea5, 
          street, 
          postalCode 
        } = data.results[0].locations[0];
  
        newLocation.latitude = displayLatLng.lat;
        newLocation.longitude = displayLatLng.lng;
        newLocation.country = adminArea1;
        newLocation.state = adminArea3;
        newLocation.city = adminArea5;
        newLocation.address = street;
        newLocation.zip_code = postalCode;
  
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
            history.push('/home/location');
            handleLocation();
          }
        })
        .catch(console.error);
      })
      .catch(console.error);
      
    })(newLocation);

  };

  return (
    <>
      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>
      <BackHomePage />  
      {
        location && (
          <>
            <h2>Edit Location</h2>
            <Link to="/home/location">Go back to location</Link>
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