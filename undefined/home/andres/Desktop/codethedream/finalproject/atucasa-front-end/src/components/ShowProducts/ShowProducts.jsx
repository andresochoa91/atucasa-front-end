import React, { useState } from 'react';
import ShowProduct from '../ShowProducts/ShowProduct';
var ShowProducts = function (_a) {
    var products = _a.products;
    var _b = useState([]), cart = _b[0], setCart = _b[1];
    return (<>
      {products.map(function (product) { return (<div key={product.id}>
            <ShowProduct cart={cart} setCart={setCart} product={product}/>
            <br />
          </div>); })}
      <h3>Cart:</h3> 
      {cart.map(function (cartProduct) {
        return (<div key={cartProduct.id}>
              <p><strong>Product Name</strong>: {cartProduct.productName}</p>
              <p><strong>Unit Price</strong>: {cartProduct.unitPrice}</p>
              <p><strong>Amount</strong>: {cartProduct.amount}</p>
              <p><strong>Tax</strong>: {cartProduct.tax}</p>
              <br />
            </div>);
    })}
    </>);
};
export default ShowProducts;