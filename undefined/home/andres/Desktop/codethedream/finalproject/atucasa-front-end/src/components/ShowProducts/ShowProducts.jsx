import React, { useState } from 'react';
import ShowProduct from '../ShowProducts/ShowProduct';
;
;
var ShowProducts = function (_a) {
    var products = _a.products, merchantID = _a.merchantID, currentCustomerID = _a.currentCustomerID;
    var _b = useState([]), cart = _b[0], setCart = _b[1];
    var total = function () {
        return Number(cart.reduce(function (acc, pr) {
            return acc + ((pr.tax + pr.unitPrice) * pr.amount);
        }, 0).toFixed(2));
    };
    var handleCheckout = function () {
        var checkout = {
            accepted: true,
            current_user: "merchant",
            delivery_fee: 5,
            products: cart.map(function (pr) {
                return {
                    id: pr.id,
                    amount: pr.amount
                };
            })
        };
        if (currentCustomerID)
            checkout.customer_id = currentCustomerID;
        if (merchantID)
            checkout.merchant_id = merchantID;
        fetch(process.env.REACT_APP_API + "/merchants/" + merchantID + "/create_order", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(checkout)
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            setCart([]);
        })
            .catch(console.error);
    };
    return (<>
      {products.map(function (product) { return (<div key={product.id}>
            <ShowProduct cart={cart} setCart={setCart} product={product}/>
            <br />
          </div>); })}
      <h3>Cart:</h3>
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Unit Price</th>
            <th>Amount</th>
            <th>Unit Tax</th>
            <th>Semi Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(function (cartProduct, cID) { return (<tr key={cID}>
                <td>{cartProduct.productName}</td>
                <td>{cartProduct.unitPrice}</td>
                <td>{cartProduct.amount}</td>
                <td>{cartProduct.tax}</td>
                <td>{((cartProduct.tax + cartProduct.unitPrice) * cartProduct.amount).toFixed(2)}</td>
              </tr>); })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Total</strong></td>
            <td><strong>{total()}</strong></td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleCheckout}>Checkout</button>
    </>);
};
export default ShowProducts;