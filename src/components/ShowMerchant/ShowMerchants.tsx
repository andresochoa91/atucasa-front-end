import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShowMerchant from './ShowMerchant';

interface ICurrentCustomerProps {
  currentCustomer: TCurrentCustomer
}

const ShowMerchants: FC<ICurrentCustomerProps> = ({ currentCustomer }): JSX.Element => {

  const [ merchants, setMerchants ] = useState<Array<TShowMerchant>>([]);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/merchants`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      setMerchants(data.merchants);
    })
  }, []);

  return (
    <>
      <Link to="/home">Go back to home page</Link>    
      <h1>Merchants</h1>
      { 
        merchants.map((merchant) => (
          <div key={ merchant.merchant_info.user_id }>
            <h2>{ merchant.merchant_info.merchant_name }</h2>
            <p><strong>Description</strong>: { merchant.merchant_info.description }</p>
            <p><strong>Phone Number</strong>: { merchant.merchant_info.phone_number }</p>
            <ShowMerchant currentCustomerID={ currentCustomer.id } merchant={ merchant } />
            <br/>
            <br/>
          </div>
        )) 
      }
    </>
  );
};

export default ShowMerchants;
