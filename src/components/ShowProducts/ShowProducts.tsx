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
  } = useContext<TContextProps>(AtucasaContext);

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
      </ContainerJumbotron>
    </>   
  );
};

export default ShowProducts;
