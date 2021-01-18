import React, { FC, useContext, useEffect, useState } from 'react';
import { Circle, Popup, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import L from 'leaflet';
import store from '../../pictures/store.png';
import { getCachedData } from '../GetCachedData';

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

  useEffect(() => {
    if (merchant.location.address && merchant.location.city && merchant.location.state) {
      if (location && location.city && location.address && location.state ) {

        getCachedData(`${location?.address},${location?.city},${location?.state}&to=${merchant.location.address},${merchant.location.city},${merchant.location.state}`, "route")
        .then(response => {
          return JSON.parse(response.data.strData);
        })
        .then(data => {
          console.log(data)
          if (data.route.distance < 5) setShowPlace(true);
        })
        .catch(console.error);
      } else if (currentAddress && currentCity && currentState) {
        getCachedData(`${currentAddress},${currentCity},${currentState}&to=${merchant.location.address},${merchant.location.city},${merchant.location.state}`, "route")
        .then(response => {
          return JSON.parse(response.data.strData);
        })
        .then(data => {
          console.log(data)
          if (data.route.distance < 5) setShowPlace(true);
        })
        .catch(console.error);
      }
    }
  }, [location, merchant, currentAddress, currentCity, currentState]);

  return (
    <>
      {
        (latitude && longitude && showPlace) && (
          <div onMouseOver={() => console.log("yay")}>
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
            <Marker
              position={ [latitude, longitude] }
              icon={ L.divIcon({html: `<img height="25" src="${store}"/>`, className:""}) }
              
            >
              <Popup>
                <p>{ merchant.merchant_info.merchant_name }</p>
                <Link to={`/merchants/${ merchant.merchant_info.slug }`}>
                  { merchant.merchant_info.merchant_name }
                </Link>
              </Popup>
            </Marker>
          </div>
          
        )
      }
    </>
  );
};

export default Place;
