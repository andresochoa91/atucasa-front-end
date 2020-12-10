import React, { FC, useState, useEffect } from 'react';
import CreateProduct from './CreateProduct';

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
        <div key={ product.id }>
          <p><strong>Product Name: </strong>{ product.product_name }</p> 
          <p><strong>Description: </strong>{ product.description }</p>
          <p><strong>Price: </strong>{ product.price }</p>
          <p><strong>Available: </strong>{ product.available ? "yes" : "no" }</p>
          <p><strong>Product_picture: </strong>{ product.product_picture }</p>
          <p><strong>Tax: </strong>{ product.tax }</p>
          <br/> 
        </div>
      )) }
      <CreateProduct handleProducts={ handleProducts } />
    </>
  );
};

export default Products;

