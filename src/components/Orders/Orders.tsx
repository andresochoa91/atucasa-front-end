import React, { FC, useEffect, useState } from 'react';

const Orders: FC = (): JSX.Element => {

  const [ orders, setOrders ] = useState<TOrders>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/current_user/orders`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      } 
    })
    .then(response => response.json())
    .then(data => {
      setOrders([...data.orders]);
      console.log(data.orders);
    })
    .catch(console.error);
  }, []);

  return (
    <>
      <h2>Orders</h2>
      {
        orders.map(order => (
          <>
            <h3>Order #{ order.id }</h3>
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
                {
                  order.products_order.map(product => (                  
                    <tr>
                      <td>{ product.product_name }</td>
                      <td>{ product.price }</td>
                      <td>{ product.amount }</td>
                      <td>{ product.tax }</td>
                      <td>{ Number(((product.price + product.tax) * product.amount).toFixed(2)) }</td>
                    </tr>               
                  ))
                }
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Tip</strong></td>
                  <td>{ order.tip }</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Delivery Fee</strong></td>
                  <td>{ order.delivery_fee }</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Total</strong></td>
                  <td>
                    { 
                      Number((order.products_order.reduce((acc, pr) => {
                        return (acc + ((pr.price + pr.tax) * pr.amount));
                      }, 0) + order.tip + order.delivery_fee).toFixed(2))
                    }
                  </td>
                </tr>
              </tbody>
            </table>
            <br/>
          </>
        ))
      }
    </>
  );
};

export default Orders;
