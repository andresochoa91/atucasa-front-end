import React, { FC, useState } from 'react';

interface IMerchantProps {
  merchant: TShowMerchant
};

const ShowMerchant: FC<IMerchantProps> = ({ merchant }): JSX.Element => {
  const { country, state, city, address } = merchant.location;
  const [ showProducts, setShowProducts ] = useState<boolean>(false);



  return (
    <div key={ merchant.merchant_info.id }>
      <p><strong>Email</strong>: { merchant.email}</p>
      <p><strong>Location</strong>
        : { `${country}, ${state}, ${city}, ${address}.` }
      </p>
      <br/>
      <h3>Links</h3>
      {
        merchant.links.map((link) => (
          <div key={ link.id }>
            <p><strong>{ link.site_name }</strong>: { link.url }</p>
          </div>
        ))
      }
      <br/>
      <h3>Products</h3>
      <button onClick={ () => setShowProducts(!showProducts) }>
        { showProducts ? "Do not show products" : "Show products" }
      </button>
      {
        showProducts &&
        merchant.products.map((product) => (
          <div key={ product.id }>
            <p><strong>Product Name</strong>: { product.product_name}</p>
            <p><strong>Description</strong>: { product.description}</p>
            <p><strong>Price</strong>: { product.price}</p>
            <br/>
          </div>
        ))
      }
    </div>
  );
};

export default ShowMerchant;
