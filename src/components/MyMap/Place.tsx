import React, { FC, useContext, useEffect, useState } from 'react';
import { Circle, Popup, Marker } from 'react-leaflet';
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

/**Displays merchants in the map. This is only for customers and users not logged */
const Place: FC<IMerchantProps> = ({ merchant, lat, lng, currentAddress, currentCity, currentState }): JSX.Element => {
  const { location, currentUser } = useContext<TContextProps>(AtucasaContext);
  const { latitude, longitude } = merchant.location;
  const [ showPlace, setShowPlace ] = useState<boolean>(false);

  useEffect(() => {
    if (merchant.location.address && merchant.location.city && merchant.location.state) {
      if (location && location.city && location.address && location.state ) {

        getCachedData(`${location?.address},${location?.city},${location?.state}&to=${merchant.location.address},${merchant.location.city},${merchant.location.state}`, "route")
        .then(response => {
          return JSON.parse(response.data.stringified_data);
        })
        .then(data => {
          if (data.route.distance < 5) setShowPlace(true);
        })
        .catch(console.error);
      } else if (currentAddress && currentCity && currentState) {
        getCachedData(`${currentAddress},${currentCity},${currentState}&to=${merchant.location.address},${merchant.location.city},${merchant.location.state}`, "route")
        .then(response => {
          return JSON.parse(response.data.stringified_data);
        })
        .then(data => {
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
          <div>
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
                <img src={ merchant.merchant_info.profile_picture } alt="img"/>
                <a href={`${ currentUser ? "/home/" : "/" }merchants/${ merchant.merchant_info.slug }`}>
                  { merchant.merchant_info.merchant_name }
                </a>
              </Popup>
            </Circle>
            <Marker
              position={ [latitude, longitude] }
              icon={ L.divIcon({html: `<img height="25" src="${store}"/>`, className:""}) }
              
            >
              <Popup>
                <a
                  href={`${ currentUser ? "/home/" : "/" }merchants/${ merchant.merchant_info.slug }`}
                  target={`_blank`}
                >
                  <img 
                    src={ merchant.merchant_info.profile_picture } 
                    alt="img"
                    height="70px"
                    width="100px"
                  />
                  <p className="my-0">{ merchant.merchant_info.merchant_name }</p>
                  <p className="my-0">{ merchant.location.address }</p>
                </a>
              </Popup>
            </Marker>
          </div>
          
        )
      }
    </>
  );
};

export default Place;
