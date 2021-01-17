import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import { Link } from 'react-router-dom';

interface ICurrentCustomerProps {
  currentCustomer?: TCurrentCustomer
}

const ShowMerchants: FC<ICurrentCustomerProps> = ({ currentCustomer }): JSX.Element => {

  const { merchants } = useContext<TContextProps>(AtucasaContext);
  
  return (
    <>
      <h1>Merchants</h1>
      { 
        merchants.map((merchant) => (
          <div key={ merchant.merchant_info.user_id }>
            <h2>{ merchant.merchant_info.merchant_name }</h2>
            <p><strong>Description</strong>: { merchant.merchant_info.description }</p>
            <p><strong>Phone Number</strong>: { merchant.merchant_info.phone_number }</p>
            <Link 
              to={`/merchants/${merchant.merchant_info.slug}`}
            >
              Visit { merchant.merchant_info.merchant_name } website
            </Link>
            {/* <ShowMerchant 
              merchant={ merchant } 
              {...(currentCustomer && { currentCustomerID: currentCustomer.id })} 
            /> */}
            <br/>
            <br/>
          </div>
        )) 
      }
    </>
  );
};

export default ShowMerchants;
