import React, { FC } from 'react';

const Product: FC<TProductProps> = ({ product }): JSX.Element => {
  return (
    <>
      <p><strong>Product Name: </strong>{ product.product_name }</p> 
      <p><strong>Description: </strong>{ product.description }</p>
      <p><strong>Price: </strong>{ product.price }</p>
      <p><strong>Available: </strong>{ product.available ? "yes" : "no" }</p>
      <p><strong>Product_picture: </strong>{ product.product_picture }</p>
      <p><strong>Tax: </strong>{ product.tax }</p>
      <br/> 
    </>
  );
};

export default Product;
