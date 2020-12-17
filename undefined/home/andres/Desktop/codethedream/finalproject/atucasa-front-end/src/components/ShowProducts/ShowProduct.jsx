var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState } from 'react';
var ShowProduct = function (_a) {
    var product = _a.product, setCart = _a.setCart, cart = _a.cart;
    var _b = useState(1), amount = _b[0], setAmount = _b[1];
    var handleCart = function () {
        if (!((cart.filter(function (pr) { return pr.id === product.id; })).length)) {
            setCart(__spreadArrays(cart, [{
                    productName: product.product_name,
                    unitPrice: product.price,
                    amount: amount,
                    tax: product.tax,
                    id: product.id
                }]));
            setAmount(1);
        }
        else {
            console.log("Product already in the cart");
        }
    };
    return (<>
      <p><strong>Product Name</strong>: {product.product_name}</p>
      <p><strong>Description</strong>: {product.description}</p>
      <p><strong>Unit Price</strong>: {product.price}</p>
      <p><strong>Category</strong>: {product.category}</p>
      <p><strong>Amount</strong>:
        <button onClick={function () { return (amount > 1) ? setAmount(amount - 1) : amount; }}>-</button>
          {amount}
        <button onClick={function () { return (amount < 20) ? setAmount(amount + 1) : amount; }}>+</button>
      </p>
      <p><strong>Total price: $</strong>{amount * product.price}</p>
      <button onClick={handleCart}>Add to cart</button>
      <br />
      <br />
    </>);
};
export default ShowProduct;