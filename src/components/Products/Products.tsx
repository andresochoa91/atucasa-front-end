import React, { FC, useState, useEffect } from 'react';
import CreateProduct from './CreateProduct';
import Product from './Product';

const Products: FC = (): JSX.Element => {
  const [ products, setProducts ] = useState<TProducts>([]);
  
  const handleProducts = (): void => {
    fetch("http://localhost:3000/current_user/products", {
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
      <h2>Products</h2>
      { products.map((product) => (
        <Product key={ product.id } product={ product }/>
      )) }
      <CreateProduct handleProducts={ handleProducts } />
    </>
  );
};

export default Products;

