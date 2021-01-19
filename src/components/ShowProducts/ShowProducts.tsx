import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';
import Cart from '../Cart/Cart';
import ContainerJumbotron from '../ContainerJumbotron/ContainerJumbotron';
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
      <ContainerJumbotron>
        <h3 className="mb-5">Products</h3>
        <div 
          className="d-flex flex-wrap justify-content-around"
        >
          {
            products.map((product) => (
              product.available && (
                <ShowProduct 
                  cart={ cart } 
                  setCart={ setCart } 
                  product={ product }
                  key={ product.id }
                />
              )
            ))
          }
        </div>
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
        </ContainerJumbotron>
    </>   
  );
};

export default ShowProducts;
