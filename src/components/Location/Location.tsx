import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { Link } from 'react-router-dom';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';

const Location: FC = (): JSX.Element => {
  const { location } = useContext<TContextProps>(AtucasaContext);

  return (
    <>
      {
        location && (
          <>
            <h2>Location</h2>
            <MultiPurposeCard>
              <tbody>
                <tr><td><strong>Address:</strong>  { location.address }</td></tr>
                <tr><td><strong>City:</strong>  { location.city }</td></tr>
                <tr><td><strong>State:</strong>  { location.state }</td></tr>
                <tr><td><strong>Country:</strong>  { location.country }</td></tr>
                <tr><td><strong>Zip Code:</strong>  { location.zip_code }</td></tr>
                <tr><td><strong>Details:</strong>  { location.details }</td></tr>
                <tr><td className="pb-0">
                  <Link className="btn btn-primary" to="/home/edit_location">Edit location</Link>
                </td></tr>
              </tbody>
            </MultiPurposeCard>
          </>
        )
      }
    </>
  );
}

export default Location;