import React, { FC, useContext, useState } from 'react';
import { AtucasaContext } from '../../Context';
import ProductOrder from './ProductOrder';

interface IOrderProps {
  order: TOrder
}

const Order: FC<IOrderProps> = ({ order }): JSX.Element => {

  const { currentUser } = useContext<TContextProps>(AtucasaContext);
  const [ orderAccepted, setOrderAccepted ] = useState<boolean>(order.accepted);
  const [ orderCanceled, setOrderCanceled ] = useState<boolean>(order.canceled);
  const [ currentRole, setCurrentRole ] = useState<string>(order.current_user);
  const [ acceptance, setAcceptance ] = useState<Array<boolean>>(Array(order.products_order.length).fill(true));
  const [ message, setMessage ] = useState<string>("");

  const handleUpdate = (id:number, field:string): void => {
    interface IUpdate {
      current_user?: string,
      accepted?: boolean,
      canceled?: boolean,
      message?: string
    };

    const updateField: IUpdate = {};

    if (field === "role") {
      updateField.current_user = order.current_user === "merchant" ? "customer" : "merchant";
      updateField.message = message;
    } else if (field === "accepted") {
      updateField.accepted = true;
    } else {
      updateField.canceled = true;
    }

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
        setOrderAccepted(true);
      } else if (field === "canceled") {
        setOrderCanceled(true);
      }
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
            order.products_order.map((product, index) => (    
              <ProductOrder
                acceptance={ acceptance } 
                setAcceptance={ setAcceptance } 
                currentUser={ currentUser }
                currentRole={ currentRole }
                product={ product }
                orderAccepted={ orderAccepted }
                orderCanceled={ orderCanceled }
                key={ product.id } 
                index={ index }
              />                         
            ))
          }
          {
            (currentUser?.role === "customer" || orderAccepted || orderCanceled) && (
              <>
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
              </>
            )
          }
        </tbody>
      </table>
      {
        !orderCanceled && currentUser?.role === "customer" && currentRole === "customer" && !orderAccepted ? (
          <>
            <p>If you accept the changes, press confirm order, if not, press Cancel Order</p>
            <button onClick={ () => handleUpdate(order.id, "accepted") }>Confirm order</button>
            <button onClick={ () => handleUpdate(order.id, "canceled") }>Cancel order</button>
          </>
        ) : !orderCanceled && currentUser?.role === "customer" && currentRole === "merchant" && !orderAccepted ? (
          <p>Waiting for the merchant to confirm your order.</p>
        ) : !orderCanceled && currentUser?.role === "merchant" && currentRole === "merchant" && !orderAccepted ? (
          <>
            {
              !acceptance.filter((v) => !v).length ? (
                <button onClick={ () => handleUpdate(order.id, "accepted") }>Confirm order</button>
              ) : (
                <>
                  <br/>
                  <label>Message</label>
                  <br/>
                  <textarea 
                    name="message" 
                    value={ message }
                    onChange={ (event) => setMessage(event.target.value) }
                    minLength={ 10 }
                  >
                  </textarea>
                  <br/>
                  <button onClick={ () => handleUpdate(order.id, "role") } >Suggest changes</button>
                </>
              )
            }
          </>
        ) : !orderCanceled && currentUser?.role === "merchant" && currentRole === "customer" && !orderAccepted ? (
          <p>Waiting for the customer to confirm your order.</p>
        ) : !orderCanceled && orderAccepted ? (
          <p style={{color: "#0a0"}}>Order accepted</p>
        ) : (
          <p style={{color: "#f00"}}>Order canceled</p>
        )
      }
      <br/>
      <br/>
    </div>
  );
};

export default Order;
