import React, { FC, useContext, useEffect, useState } from 'react';
import { AtucasaContext } from '../../Context';

interface IOrderProps {
  order: TOrder
}

const Order: FC<IOrderProps> = ({ order }): JSX.Element => {

  const { currentUser } = useContext<TContextProps>(AtucasaContext);
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
    });
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
        currentUser?.role === "customer" && currentRole === "customer" && !order.accepted ? (
          <>
            <p>If you accept the changes, press confirm order, if not, press Cancel Order</p>
            <button>Confirm order</button>
            <button>Calcel order</button>
          </>
        ) : currentUser?.role === "customer" && currentRole === "merchant" && !order.accepted ? (
          <p>Waiting for the merchant to confirm your order.</p>
        ) : currentUser?.role === "merchant" && currentRole === "merchant" && !order.accepted ? (
          <>
            <p>If you have all the products, press confirm order, if not, press Suggest Changes.</p>
            <button>Confirm order</button>
            <button onClick={ () => handleRole(currentRole, order.id) } >Suggest changes</button>
          </>
        ) : currentUser?.role === "merchant" && currentRole === "customer" && !order.accepted ? (
          <p>Waiting for the customer to confirm your order.</p>
        ) : (
          <p style={{color: "#0a0"}}>Order accepted</p>
        )
      }
      <br/>
    </div>
  );
};

export default Order;
