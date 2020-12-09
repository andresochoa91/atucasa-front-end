import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';

const Location: FC = (): JSX.Element => {
  const { location } = useContext<TContextProps>(AtucasaContext);

  return (
    <>
      {
        location &&
        <>
          <h2>Location</h2>
          <p><strong>Country: </strong>{ location.country }</p>
          <p><strong>State: </strong>{ location.state }</p>
          <p><strong>City: </strong>{ location.city }</p>
          <p><strong>Address: </strong>{ location.address }</p>
          <p><strong>Zip Code: </strong>{ location.zip_code }</p>
          <p><strong>Details: </strong>{ location.details }</p>
        </>
      }
    </>
  );
}

export default Location;