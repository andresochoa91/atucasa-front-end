import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';

interface IOrderProps {
  order: TOrder
}

const Order: FC<IOrderProps> = ({ order }): JSX.Element => {

  const { currentUser } = useContext<TContextProps>(AtucasaContext);
  const [ orderStatus, setOrderStatus ] = useState<boolean>(order.accepted);
  const [ orderCanceled, setOrderCanceled ] = useState<boolean>(order.canceled);
  const [ currentRole, setCurrentRole ] = useState<string>(order.current_user);

  const handleRole = (role:string, id:number): void => {
    fetch(`${process.env.REACT_APP_API}/current_user/orders/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        current_user: role === "merchant" ? "customer" : "merchant"
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCurrentRole(data.order.current_user);
    })
    .catch(console.error);
  };

  const handleOrderConfirmation = (id:number): void => {
    fetch(`${process.env.REACT_APP_API}/current_user/orders/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        accepted: true
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setOrderStatus(true);
    })
    .catch(console.error);
  };

  const handleOrderCancelation = (id:number): void => {
    fetch(`${process.env.REACT_APP_API}/current_user/orders/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        canceled: true
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setOrderCanceled(true);
    })
    .catch(console.error);
  };

  return (
    <div key={ order.id }>
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
              <tr key={ product.id }>
                <td>{ product.product_name }</td>
                <td>${ (product.price).toFixed(2) }</td>
                <td>{ product.amount }</td>
                <td>${ (product.tax).toFixed(2) }</td>
                <td>${ Number(((product.price + product.tax) * product.amount).toFixed(2)) }</td>
              </tr>               
            ))
          }
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Tip</strong></td>
            <td>${ order.tip }</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Delivery Fee</strong></td>
            <td>${ order.delivery_fee }</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Total</strong></td>
            <td>
              ${ 
                (order.products_order.reduce((acc, pr) => {
                  return (acc + ((pr.price + pr.tax) * pr.amount));
                }, 0) + order.tip + order.delivery_fee).toFixed(2)
              }
            </td>
          </tr>
        </tbody>
      </table>
      {
        !orderCanceled && currentUser?.role === "customer" && currentRole === "customer" && !orderStatus ? (
          <>
            <p>If you accept the changes, press confirm order, if not, press Cancel Order</p>
            <button onClick={ () => handleOrderConfirmation(order.id) }>Confirm order</button>
            <button onClick={ () => handleOrderCancelation(order.id) }>Calcel order</button>
          </>
        ) : !orderCanceled && currentUser?.role === "customer" && currentRole === "merchant" && !orderStatus ? (
          <p>Waiting for the merchant to confirm your order.</p>
        ) : !orderCanceled && currentUser?.role === "merchant" && currentRole === "merchant" && !orderStatus ? (
          <>
            <p>If you have all the products, press confirm order, if not, press Suggest Changes.</p>
            <button onClick={ () => handleOrderConfirmation(order.id) }>Confirm order</button>
            <button onClick={ () => handleRole(currentRole, order.id) } >Suggest changes</button>
          </>
        ) : !orderCanceled && currentUser?.role === "merchant" && currentRole === "customer" && !orderStatus ? (
          <p>Waiting for the customer to confirm your order.</p>
        ) : !orderCanceled && orderStatus ? (
          <p style={{color: "#0a0"}}>Order accepted</p>
        ) : (
          <p style={{color: "#f00"}}>Order canceled</p>
        )
      }
      <br/>
    </div>
  );
};

export default Order;
