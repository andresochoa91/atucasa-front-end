import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { Link } from 'react-router-dom';
import ShowMerchant from './ShowMerchant';

interface ICurrentCustomerProps {
  currentCustomer?: TCurrentCustomer
}

const ShowMerchants: FC<ICurrentCustomerProps> = ({ currentCustomer }): JSX.Element => {

  const { merchants } = useContext<TContextProps>(AtucasaContext);
  
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
            <ShowMerchant 
              merchant={ merchant } 
              {...(currentCustomer && { currentCustomerID: currentCustomer.id })} 
            />
            <br/>
            <br/>
          </div>
        )) 
      }
    </>
  );
};

export default ShowMerchants;
