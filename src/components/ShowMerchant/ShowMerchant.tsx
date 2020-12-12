import React, { FC } from 'react';

interface IMerchantProps {
  merchant: TShowMerchant
};

const ShowMerchant: FC<IMerchantProps> = ({ merchant }): JSX.Element => {
  const { country, state, city, address } = merchant.location;
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
            <p><strong>Site Name</strong>: { link.site_name}</p>
            <p><strong>Url</strong>: { link.url}</p>
            <br/>
          </div>
        ))
      }
      <h3>Products</h3>
      {
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
