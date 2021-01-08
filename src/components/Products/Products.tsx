import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/">Go back to home page</Link>    
      <h2>Products</h2>
      { 
        products.map((product) => (
          <Product 
            handleProducts={ handleProducts } 
            key={ product.id } 
            product={ product }
          />
        )) 
      }
      <CreateProduct handleProducts={ handleProducts } />
    </>
  );
};

export default Products;

