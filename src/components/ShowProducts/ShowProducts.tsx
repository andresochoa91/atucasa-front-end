import React, { FC, useState} from 'react';
import ShowProduct from '../ShowProducts/ShowProduct';


interface IProductsProps {
  products: TProducts
}

const ShowProducts: FC<IProductsProps> = ({ products }): JSX.Element => {

  const [ cart, setCart ] = useState<Array<TCartProduct>>([]);

  return (
    <>
      {
        products.map((product) => (
          <div key={ product.id }>
            <ShowProduct cart={ cart } setCart={ setCart } product={ product }/>
            <br/>
          </div>
        ))
      }
      <h3>Cart:</h3> 
      { 
        cart.map(cartProduct => {
          return (
            <div key={ cartProduct.id }>
              <p><strong>Product Name</strong>: { cartProduct.productName }</p>
              <p><strong>Unit Price</strong>: { cartProduct.unitPrice }</p>
              <p><strong>Amount</strong>: { cartProduct.amount }</p>
              <p><strong>Tax</strong>: { cartProduct.tax }</p>
              <br/>
            </div>
          );
        }) 
      }
    </>   
  );
};

export default ShowProducts;
