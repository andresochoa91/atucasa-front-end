import React, { FC, useEffect, useState } from 'react';

const ShowMerchants: FC = (): JSX.Element => {

  const [ merchants, setMerchants ] = useState<Array<TCurrentMerchant>>([]);
  
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
  }, [])

  return (
    <>
      <h1>Merchants</h1>
      { 
        merchants.map((merchant) => {
          return(
            <div key={ merchant.user_id }>
              <p><strong>Merchant Name</strong>: { merchant.merchant_name }</p>
              <p><strong>Description</strong>: { merchant.description }</p>
              <p><strong>Phone Number</strong>: { merchant.phone_number }</p>
              <br/>
            </div>
          );
        }) 
      }
    </>
  );
};

export default ShowMerchants;
