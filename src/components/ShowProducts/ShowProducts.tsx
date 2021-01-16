import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';
import Cart from '../Cart/Cart';
import ShowProduct from '../ShowProducts/ShowProduct';

interface IProductsProps {
  products: TProducts,
  merchantID: number | undefined
};

const ShowProducts: FC<IProductsProps> = ({ products, merchantID }): JSX.Element => {

  const { currentCustomer, currentUser } = useContext<TContextProps>(AtucasaContext);
  const [ cart, setCart ] = useState<Array<TCartProduct>>([]);
  const [ openCart, setOpenCart ] = useState<boolean>(false);

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
      {
        currentUser && currentUser.role === "customer" && (
          <button 
            onClick={() => {
              setOpenCart(!openCart);
            }
          }>
            { openCart ? "Close Cart" : "Open Cart" }
          </button>
        )
      }
      {
        openCart && currentUser && (
          <Cart 
            cart={ cart } 
            setCart={ setCart } 
            merchantID={ merchantID }
            currentCustomerID={ currentCustomer?.id }
          />
        )
      }
    </>   
  );
};

export default ShowProducts;
