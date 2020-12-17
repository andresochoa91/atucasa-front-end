import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import ShowProduct from '../ShowProducts/ShowProduct';
;
var ShowProducts = function (_a) {
    var products = _a.products, merchantID = _a.merchantID, currentCustomerID = _a.currentCustomerID;
    var _b = useState([]), cart = _b[0], setCart = _b[1];
    return (<>
      {products.map(function (product) { return (<div key={product.id}>
            <ShowProduct cart={cart} setCart={setCart} product={product}/>
            <br />
          </div>); })}
      <Cart cart={cart} setCart={setCart} merchantID={merchantID} currentCustomerID={currentCustomerID}/>
    </>);
};
export default ShowProducts;