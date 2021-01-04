import React, { FC, useState } from 'react';
import Cart from '../Cart/Cart';
import ShowProduct from '../ShowProducts/ShowProduct';

interface IProductsProps {
  products: TProducts,
  merchantID: number | undefined,
  currentCustomerID: number | undefined
};

const ShowProducts: FC<IProductsProps> = ({ products, merchantID, currentCustomerID }): JSX.Element => {

  const [ cart, setCart ] = useState<Array<TCartProduct>>([]);

  console.log(products)

  return (
    <>
      {
        products.map((product) => (
          product.available && (
            <div key={ product.id }>
              <ShowProduct cart={ cart } setCart={ setCart } product={ product }/>
              <br/>
            </div>
          )
        ))
      }
      <Cart 
        cart={ cart } 
        setCart={ setCart } 
        merchantID={ merchantID }
        currentCustomerID={ currentCustomerID }
      />
    </>   
  );
};

export default ShowProducts;
