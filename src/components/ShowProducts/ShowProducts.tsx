import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';
import ContainerJumbotron from '../ContainerJumbotron/ContainerJumbotron';
import ShowProduct from '../ShowProducts/ShowProduct';

interface IProductsProps {
  products: TProducts,
  merchantID: number | undefined
};

const ShowProducts: FC<IProductsProps> = ({ products }): JSX.Element => {

  const { 
    cart,
    setCart,
    currentUser
  } = useContext<TContextProps>(AtucasaContext);

  return (
    <>
      <ContainerJumbotron>
        <h3 className="mb-5">Products</h3>
        {
          !currentUser && (
            <div className="text-warning mb-5">
              <p style={{ display: 'contents' }}>You have to be logged to buy through the website</p>
              <br/>
              <p style={{ display: 'contents' }}>You can always contact the merchant through their phone or email</p>
            </div>
          )
        }
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
      </ContainerJumbotron>
    </>   
  );
};

export default ShowProducts;
