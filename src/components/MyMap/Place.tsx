import React, { FC, useContext, useEffect, useState } from 'react';
import { Circle, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { AtucasaContext } from '../../Context';

interface IMerchantProps {
  merchant: TShowMerchant,
  lat: number,
  lng: number,
  currentAddress: string,
  currentCity: string,
  currentState: string
}

const Place: FC<IMerchantProps> = ({ merchant, lat, lng, currentAddress, currentCity, currentState }): JSX.Element => {
  const { location } = useContext<TContextProps>(AtucasaContext);
  const { latitude, longitude } = merchant.location;
  const { merchant_name } = merchant.merchant_info;
  const [ showPlace, setShowPlace ] = useState<boolean>(false);

  console.log(location);
  console.log(currentAddress, currentCity, currentState);

  useEffect(() => {
    if (location) {
      fetch(`${process.env.REACT_APP_MAPQUEST_API_TWO}${location?.address},${location?.city},${location?.state}&to=${merchant.location.address},${merchant.location.city},${merchant.location.state}`)
      .then(response => response.json())
      .then(data => {
        if (data.route.distance < 5) setShowPlace(true);
      })
      .catch(console.error);
    } else {
      fetch(`${process.env.REACT_APP_MAPQUEST_API_TWO}${currentAddress},${currentCity},${currentState}&to=${merchant.location.address},${merchant.location.city},${merchant.location.state}`)
      .then(response => response.json())
      .then(data => {
        if (data.route.distance < 5) setShowPlace(true);
      })
      .catch(console.error);
    }
  }, [location, merchant, currentAddress, currentCity, currentState]);

  return (
    <>
      {
        (latitude && longitude && showPlace) && (
          <Circle
            center={[latitude, longitude]}
            radius={14}
            pathOptions={{ 
              fillColor: "#a00",
              color: "#a00",
              weight: 6 
            }}
          >
            <Popup>
              <p>{`${ merchant_name }`}</p>
              <Link to={`/merchants/${ merchant.merchant_info.slug }`}>
                { merchant.merchant_info.merchant_name }
              </Link>
            </Popup>
          </Circle>
        )
      }
    </>
  );
};

export default Place;
