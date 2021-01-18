import React, { FC, useState, useEffect } from 'react';
import CreateProduct from './CreateProduct';
import Product from './Product';

const Products: FC = (): JSX.Element => {
  const [ products, setProducts ] = useState<TProducts>([]);
  
  const handleProducts = (): void => {
    fetch(`${process.env.REACT_APP_API}/current_user/products`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setProducts([...data.products]);
    })
    .catch(console.error);
  };

  useEffect(handleProducts, []);

  return (
    <>
      <h2 className="mb-5">Products</h2>
      <div className="d-flex flex-wrap justify-content-around">
        { 
          products.map((product) => (
            <Product 
              handleProducts={ handleProducts } 
              key={ product.id } 
              product={ product }
            />
          )) 
        }
      </div>
      <CreateProduct handleProducts={ handleProducts } />
    </>
  );
};

export default Products;

