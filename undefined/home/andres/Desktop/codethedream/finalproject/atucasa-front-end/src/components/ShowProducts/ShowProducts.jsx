import React, { useState, useEffect } from 'react';
import ShowProduct from '../ShowProducts/ShowProduct';
;
;
var ShowProducts = function (_a) {
    var products = _a.products, merchantID = _a.merchantID, currentCustomerID = _a.currentCustomerID;
    var _b = useState([]), cart = _b[0], setCart = _b[1];
    var _c = useState(""), tip = _c[0], setTip = _c[1];
    var _d = useState(0), total = _d[0], setTotal = _d[1];
    var handleTip = function (event) {
        setTip(event.target.value);
    };
    var handleSuggestedTip = function () {
        setTip((total * 0.15).toFixed(2));
    };
    useEffect(function () {
        setTotal(cart.reduce(function (acc, pr) {
            return acc + ((pr.tax + pr.unitPrice) * pr.amount);
        }, 0));
    }, [cart, tip]);
    var handleCheckout = function () {
        var checkout = {
            accepted: true,
            current_user: "merchant",
            tip: Number(tip),
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
            setTip("");
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
                <td>${cartProduct.unitPrice}</td>
                <td>
                  <button onClick={function () { return setCart(cart.map(function (pr, id) {
        if (id === cID && pr.amount > 0) {
            pr.amount--;
            return pr;
        }
        else {
            return pr;
        }
    })); }}>
                    -
                  </button>
                    {cartProduct.amount}
                    <button onClick={function () { return setCart(cart.map(function (pr, id) {
        if (id === cID && pr.amount < 20) {
            pr.amount++;
            return pr;
        }
        else {
            return pr;
        }
    })); }}>
                    +
                  </button>
                </td>
                <td>${cartProduct.tax.toFixed(2)}</td>
                <td>${((cartProduct.tax + cartProduct.unitPrice) * cartProduct.amount).toFixed(2)}</td>
                <td>
                  <button onClick={function () { return setCart(cart.filter(function (pr, id) { return id !== cID; })); }}>
                    X
                  </button>
                </td>
              </tr>); })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Tip</strong></td>
            <td>
              $<input type="text" value={tip} placeholder={"Suggested: " + (total * 0.15).toFixed(2)} onChange={handleTip}/>
            </td>
            <td><button onClick={handleSuggestedTip}>Apply suggested tip</button></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Delivery Fee</strong></td>
            <td>$5</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Total</strong></td>
            <td><strong>${(total + Number(tip) + 5).toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleCheckout}>Checkout</button>
    </>);
};
export default ShowProducts;