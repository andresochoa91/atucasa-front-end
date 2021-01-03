import React, { FC } from 'react';
import { Circle, Popup } from 'react-leaflet';

interface IMerchantProps {
  merchant: TShowMerchant
}

const Place: FC<IMerchantProps> = ({ merchant }): JSX.Element => {

  const { latitude, longitude, address } = merchant.location;

  return (
    <>
      {
        (latitude && longitude) && (
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
              <p>{`Your location: ${address}`}</p>
            </Popup>
          </Circle>
        )
      }
    </>
  );
};

export default Place;
