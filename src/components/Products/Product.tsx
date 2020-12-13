import React, { FC, useState } from 'react';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';

const Product: FC<TProductProps & TProductsProps> = ({ product, handleProducts }): JSX.Element => {

  const [ inEditMode, setInEditMode ] = useState<boolean>(false);

  const handleMode = (): void => {
    setInEditMode(!inEditMode);
  };

  return (
    <>
      {
        inEditMode ?
        <>
          <EditProduct handleMode={ handleMode } product={ product } handleProducts={ handleProducts } />
        </>
        :
        <>
          <p><strong>Product Name: </strong>{ product.product_name }</p> 
          <p><strong>Description: </strong>{ product.description }</p>
          <p><strong>Price: </strong>{ product.price }</p>
          <p><strong>Available: </strong>{ product.available ? "yes" : "no" }</p>
          <p><strong>Product_picture: </strong>{ product.product_picture }</p>
          <p><strong>Tax: </strong>{ product.tax }</p>
          <button onClick={ () => setInEditMode(!setInEditMode) }>Edit</button>
          <DeleteProduct 
            product={ product } 
            handleProducts={ handleProducts } 
          />
          <br/> 
          <br/> 
        </>
      }
    </>
  );
};

export default Product;
