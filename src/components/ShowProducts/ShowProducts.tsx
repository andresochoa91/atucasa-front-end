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
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Unit Price</th>
            <th>Amount</th>
            <th>Tax</th>
            <th>Semi Total</th>
          </tr>
        </thead>
        <tbody>
        { 
          cart.map((cartProduct, cID) => (
            <tr key={ cID }>
              <td>{ cartProduct.productName }</td>
              <td>{ cartProduct.unitPrice }</td>
              <td>{ cartProduct.amount }</td>
              <td>{ cartProduct.tax }</td>
              <td>{ ((cartProduct.tax + cartProduct.unitPrice) * cartProduct.amount).toFixed(2) }</td>
            </tr>
          )) 
        }
        </tbody>
      </table>
    </>   
  );
};

export default ShowProducts;
