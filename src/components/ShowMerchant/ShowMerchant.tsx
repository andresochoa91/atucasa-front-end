import React, { FC, useState } from 'react';
// import { useParams } from 'react-router-dom';
import ShowProducts from '../ShowProducts/ShowProducts';

interface IMerchantProps {
  merchant: TShowMerchant,
  currentCustomerID?: number
};

const ShowMerchant: FC<IMerchantProps> = ({ merchant, currentCustomerID }): JSX.Element => {
  const { country, state, city, address } = merchant.location;
  const [ showProducts, setShowProducts ] = useState<boolean>(false);

  return (
    <div key={ merchant.merchant_info.id }>
      <p><strong>Email</strong>: { merchant.email}</p>
      <p><strong>Location</strong>
        : { `${country}, ${state}, ${city}, ${address}.` }
      </p>
      <br/>
      <h3>Products</h3>
      <button onClick={ () => setShowProducts(!showProducts) }>
        { showProducts ? "Do not show products" : "Show products" }
      </button>
      <br/>
      <br/>
      {
        showProducts && (          
          <ShowProducts 
            merchantID={ merchant.merchant_info.id } 
            products={ merchant.products }
            {...(currentCustomerID && { currentCustomerID })}
          />
        )
      }
      <br/>
      <h3>Links</h3>
      {
        merchant.links.map((link) => (
          <div key={ link.id }>
            <p><strong>{ link.site_name }</strong>: { link.url }</p>
          </div>
        ))
      }
    </div>
  );
};

export default ShowMerchant;
