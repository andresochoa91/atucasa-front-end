import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { Link } from 'react-router-dom';
import BackHomePage from '../BackHomePage/BackHomePage';

const Location: FC = (): JSX.Element => {
  const { location } = useContext<TContextProps>(AtucasaContext);

  return (
    <>
      <BackHomePage />   
      {
        location && (
          <>
            <h2>Location</h2>
            <Link to="/home/edit_location">Edit location</Link>
            <p><strong>Address: </strong>{ location.address }</p>
            <p><strong>City: </strong>{ location.city }</p>
            <p><strong>State: </strong>{ location.state }</p>
            <p><strong>Country: </strong>{ location.country }</p>
            <p><strong>Zip Code: </strong>{ location.zip_code }</p>
            <p><strong>Details: </strong>{ location.details }</p>
          </>
        )
      }
    </>
  );
}

export default Location;