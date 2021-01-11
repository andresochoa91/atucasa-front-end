import React, { FC, useEffect, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { Link } from 'react-router-dom';

const ShowMerchants2: FC = (): JSX.Element => {

  // const { currentUser } = useContext<TContextProps>(AtucasaContext)
  const { merchants } = useContext<TContextProps>(AtucasaContext);
  // const [ estimatedLatitude, setEstimatedLatitude ] = useState<string>("");
  // const [ estimatedLongitude, setEstimatedLongitude ] = useState<string>("");
  
  useEffect(() => {

    // navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position.coords.latitude);
    //   console.log(position.coords.longitude);
    //   console.log(position)
    //   fetch(`${process.env.REACT_APP_MAPQUEST_API_THREE}${position.coords.latitude},${position.coords.longitude}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   })

    //   fetch(`${process.env.REACT_APP_MAPQUEST_API_TWO}294+turk+st,san+francisco,ca&to=666+Rivera+st,san+francisco,ca`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(console.error);
    // })
  }, []);

  console.log(merchants)

  return (
    <>
      <Link to="/">Go back to home page</Link>    
      <h1>Merchants</h1>
      { 
        merchants.map((merchant) => (
          <div key={ merchant.merchant_info.user_id }>
            <h2>{ merchant.merchant_info.merchant_name }</h2>
            <p><strong>Description</strong>: { merchant.merchant_info.description }</p>
            <p><strong>Phone Number</strong>: { merchant.merchant_info.phone_number }</p>
            <br/>
            <br/>
          </div>
        )) 
      }
    </>
  );
};

export default ShowMerchants2;