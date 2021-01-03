import React, { FC } from 'react';
import { Circle, Popup } from 'react-leaflet';

interface IMerchantProps {
  merchant: TShowMerchant
}

const Place: FC<IMerchantProps> = ({ merchant }): JSX.Element => {

  const { latitude, longitude } = merchant.location;
  const { merchant_name } = merchant.merchant_info;

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
              <p>{`${ merchant_name }`}</p>
            </Popup>
          </Circle>
        )
      }
    </>
  );
};

export default Place;
