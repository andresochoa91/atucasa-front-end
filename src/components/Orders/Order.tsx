import React, { FC, useContext, useEffect, useState } from 'react';
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
  const [ message, setMessage ] = useState<string>(order.message);
  const [ lastStage, setLastStage ] = useState<boolean>(false);
  const [ currentTip, setCurrentTip ] = useState<string>(order.tip === 0 && (!order.accepted) ? "" : (order.tip).toString());
  const [ semiTotal, setSemiTotal ] = useState<number>(0);

  useEffect(() => {
    setSemiTotal(order.products_order.reduce((acc, pr) => {
      return (acc + ((pr.price + pr.tax) * pr.amount));
    }, 0))
  }, [order.products_order]);

  const handleUpdate = (id:number, field:string): void => {
    interface IUpdate {
      current_user?: string,
      accepted?: boolean,
      canceled?: boolean,
      message?: string,
      tip?: number | null
    };

    const updateField: IUpdate = {};

    if (field === "role") {
      updateField.current_user = order.current_user === "merchant" ? "customer" : "merchant";
      updateField.message = message;
      updateField.tip = 0;
    } else if (field === "accepted") {
      updateField.tip = Number(currentTip);
      updateField.accepted = true;
    } else {
      updateField.canceled = true;
    }

    if (field !== "accepted" || (currentTip !== "" && (Number(currentTip) >= 0))) {
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
          if (!lastStage) setLastStage(true);
          setCurrentRole(data.order.current_user);
        } else if (field === "accepted") {
          setOrderAccepted(true);
        } else if (field === "canceled") {
          setOrderCanceled(true);
        }
      })
      .catch(console.error);
    } else {
      console.log("Add a correct tip");
    }

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
                lastStage={ lastStage }
              />                         
            ))
          }
          {
            (currentUser?.role === "customer" || orderAccepted/*  || orderCanceled */) && (
              <>
                {
                  !orderCanceled && (
                    <>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><strong>Tip</strong></td>
                        {
                          (currentRole === "customer" && !orderAccepted) ? (
                            <>
                              <td>$ 
                                <input 
                                  type="text"
                                  value={ currentTip }
                                  onChange={ (event) => setCurrentTip(event.target.value) }
                                  placeholder={ `Suggested: $${(semiTotal * 0.15).toFixed(2)}` }
                                />
                              </td>
                              <td>
                                <button onClick={ () => setCurrentTip((semiTotal * 0.15).toFixed(2)) }>
                                  Apply suggested tip
                                </button>
                              </td>
                            </>
                          ) : (orderAccepted || (!orderAccepted && currentRole === "merchant")) && (
                            <td>${ currentTip === "" ? 0 : currentTip }</td>
                          )
                        }
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
                        <td>{ `$${(semiTotal+ Number(currentTip) + order.delivery_fee).toFixed(2)}` }</td>
                      </tr>
                    </>
                  )
                }
              </>
            )
          }
        </tbody>
      </table>
      {
        !orderCanceled && currentUser?.role === "customer" && currentRole === "customer" && !orderAccepted ? (
          <>
            <p><strong>Message from merchant: </strong>{ message }</p>
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
                <form 
                  onSubmit={ (event) => {
                    event.preventDefault();
                    if (message.length >= 20) {
                      handleUpdate(order.id, "role"); 
                    } else {
                      console.log("Message needs to have at least 20 characters");
                    }
                  }}
                >
                  <br/>
                  <label>Message</label>
                  <br/>
                  <textarea 
                    name="message" 
                    value={ message }
                    onChange={ (event) => setMessage(event.target.value) }
                  >
                  </textarea>
                  <br/>
                  <input 
                    type="submit" 
                    value="Suggest changes"
                  />
                </form>
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
