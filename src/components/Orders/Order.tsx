import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';
import ProductOrder from './ProductOrder';

interface IOrderProps {
  order: TOrder
}

const Order: FC<IOrderProps> = ({ order }): JSX.Element => {

  const { currentUser } = useContext<TContextProps>(AtucasaContext);
  const [ orderStatus, setOrderStatus ] = useState<boolean>(order.accepted);
  const [ orderCanceled, setOrderCanceled ] = useState<boolean>(order.canceled);
  const [ currentRole, setCurrentRole ] = useState<string>(order.current_user);


  const handleUpdate = (id:number, field:string): void => {
    interface IUpdate {
      current_user?: string,
      accepted?: boolean,
      canceled?: boolean
    };

    const updateField: IUpdate = {};

    // console.log(order.current_user)

    if (field === "role") {
      updateField.current_user = order.current_user === "merchant" ? "customer" : "merchant";
    } else if (field === "accepted") {
      updateField.accepted = true;
    } else {
      updateField.canceled = true;
    }

    // console.log(updateField.currentUser)

    fetch(`${process.env.REACT_APP_API}/current_user/orders/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateField)
    })
    .then(response => response.json())
    .then(data => {
      if (field === "role") {
        setCurrentRole(data.order.current_user);
        console.log(data);
      } else if (field === "accepted") {
        setOrderStatus(true);
      } else if (field === "canceled") {
        setOrderCanceled(true);
      }
    })
    .catch(console.error);
  };

  // const handleRole = (role:string, id:number): void => {
  //   fetch(`${process.env.REACT_APP_API}/current_user/orders/${id}`, {
  //     method: "PUT",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       current_user: role === "merchant" ? "customer" : "merchant"
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     setCurrentRole(data.order.current_user);
  //   })
  //   .catch(console.error);
  // };

  // const handleOrderConfirmation = (id:number): void => {
  //   fetch(`${process.env.REACT_APP_API}/current_user/orders/${id}`, {
  //     method: "PUT",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ accepted: true })
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     setOrderStatus(true);
  //   })
  //   .catch(console.error);
  // };

  // const handleOrderCancelation = (id:number): void => {
  //   fetch(`${process.env.REACT_APP_API}/current_user/orders/${id}`, {
  //     method: "PUT",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ canceled: true })
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     setOrderCanceled(true);
  //   })
  //   .catch(console.error);
  // };

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
              <ProductOrder 
                currentUser={ currentUser }
                currentRole={ currentRole }
                product={ product }
                key={ product.id } 
              />                         
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
            <button onClick={ () => handleUpdate(order.id, "accepted") }>Confirm order</button>
            <button onClick={ () => handleUpdate(order.id, "canceled") }>Cancel order</button>
          </>
        ) : !orderCanceled && currentUser?.role === "customer" && currentRole === "merchant" && !orderStatus ? (
          <p>Waiting for the merchant to confirm your order.</p>
        ) : !orderCanceled && currentUser?.role === "merchant" && currentRole === "merchant" && !orderStatus ? (
          <>
            <p>If you have all the products, press confirm order, if not, press Suggest Changes.</p>
            <button onClick={ () => handleUpdate(order.id, "accepted") }>Confirm order</button>
            <button onClick={ () => handleUpdate(order.id, "role") } >Suggest changes</button>
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
