var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useEffect, useState } from 'react';
var Orders = function () {
    var _a = useState([]), orders = _a[0], setOrders = _a[1];
    useEffect(function () {
        fetch(process.env.REACT_APP_API + "/current_user/orders", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setOrders(__spreadArrays(data.orders));
            console.log(data.orders);
        })
            .catch(console.error);
    }, []);
    return (<>
      <h2>Orders</h2>
      {orders.map(function (order) { return (<>
            <h3>Order #{order.id}</h3>
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
                {order.products_order.map(function (product) { return (<tr>
                      <td>{product.product_name}</td>
                      <td>{product.price}</td>
                      <td>{product.amount}</td>
                      <td>{product.tax}</td>
                      <td>{Number(((product.price + product.tax) * product.amount).toFixed(2))}</td>
                    </tr>); })}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Tip</strong></td>
                  <td>{order.tip}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Delivery Fee</strong></td>
                  <td>{order.delivery_fee}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Total</strong></td>
                  <td>
                    {Number((order.products_order.reduce(function (acc, pr) {
        return (acc + ((pr.price + pr.tax) * pr.amount));
    }, 0) + order.tip + order.delivery_fee).toFixed(2))}
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </>); })}
    </>);
};
export default Orders;