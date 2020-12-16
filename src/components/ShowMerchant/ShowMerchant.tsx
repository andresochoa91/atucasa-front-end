import React, { FC, useState } from 'react';
import ShowProduct from '../ShowProducts/ShowProduct';

interface IMerchantProps {
  merchant: TShowMerchant
};

const ShowMerchant: FC<IMerchantProps> = ({ merchant }): JSX.Element => {
  const { country, state, city, address } = merchant.location;
  const [ showProducts, setShowProducts ] = useState<boolean>(false);
  const [ cart, setCart ] = useState<Array<TCartProduct>>([{
    productName: "Papaya",
    unitPrice: 2,
    amount: 3,
    tax: 0.2
  }]);

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
        showProducts && (
          merchant.products.map((product) => (
            <div key={ product.id }>
              <ShowProduct cart={ cart } setCart={ setCart } product={ product }/>
            </div>
          ))
        )
      }
      <br/>
      <h3>Cart:</h3> 
        { 
          cart.map(cartProduct => {
            return (
              <>
                <p><strong>Product Name</strong>: { cartProduct.productName }</p>
                <p><strong>Unit Price</strong>: { cartProduct.unitPrice }</p>
                <p><strong>Amount</strong>: { cartProduct.amount }</p>
                <p><strong>Tax</strong>: { cartProduct.tax }</p>
                <br/>
              </>
            );
          }) 
        }
    </div>
  );
};

export default ShowMerchant;
