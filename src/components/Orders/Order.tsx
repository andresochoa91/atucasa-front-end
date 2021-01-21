import React, { FC, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';
import ProductOrder from './ProductOrder';
import { Table, Button } from 'react-bootstrap';

interface IOrderProps {
  order: TOrder
}

const Order: FC<IOrderProps> = ({ order }): JSX.Element => {

  const { 
    currentUser,
    setCurrentMessageValidation, 
    currentMessage, 
    setCurrentMessage,
    currentTitleMessage,
    setCurrentTitleMessage  
  } = useContext<TContextProps>(AtucasaContext);

  const [ orderAccepted, setOrderAccepted ] = useState<boolean>(order.accepted);
  const [ orderCanceled, setOrderCanceled ] = useState<boolean>(order.canceled);
  const [ currentRole, setCurrentRole ] = useState<string>(order.current_user);
  const [ acceptance, setAcceptance ] = useState<Array<boolean>>(Array(order.products_order.length).fill(true));
  const [ message, setMessage ] = useState<string>(order.message);
  const [ lastStage, setLastStage ] = useState<boolean>(false);
  const [ currentTip, setCurrentTip ] = useState<string>(order.tip === 0 && (!order.accepted) ? "" : (order.tip).toString());
  const [ semiTotal, setSemiTotal ] = useState<number>(0);
  const [ delivery, setDelivery ] = useState<string>("");
  const [ colorDelivery, setColorDelivery ] = useState<string>("");
  const [ orderPlaced, setOrderPlaced ] = useState<string>("");
  const [ estimatedArrival, setEstimatedArrival ] = useState<string>("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/current_user/check_delivered/${order.id}`)
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        setDelivery(data.message); 
        setColorDelivery(data.color);
        const tempOrderPlaced = new Date(data.order_placed);
        const tempEstimatedArrival = new Date(data.estimated_arrival);
        const tOP = tempOrderPlaced;
        const tEA = tempEstimatedArrival;

        setOrderPlaced(`${tOP.getHours()}:${(tOP.getMinutes()).toString().length < 2 ? `0${tOP.getMinutes()}` : tOP.getMinutes()}, ${tOP.getMonth() + 1}/${tOP.getDate()}/${tOP.getFullYear()}`)
        setEstimatedArrival(`${tEA.getHours()}:${(tEA.getMinutes()).toString().length < 2 ? `0${tEA.getMinutes()}` : tEA.getMinutes()}, ${tEA.getMonth() + 1}/${tEA.getDate()}/${tEA.getFullYear()}`)
      }
      console.log(data);
    })
    .catch(console.error);

    setSemiTotal(order.products_order.reduce((acc, pr) => {
      return (acc + ((pr.price + pr.tax) * pr.amount));
    }, 0));

  }, [order, orderAccepted]);

  const handleUpdate = (id:number, field:string): void => {
    interface IUpdate {
      current_user?: string,
      accepted?: boolean,
      canceled?: boolean,
      message?: string,
      tip?: number | null,
      time_acceptance?: string
    };

    const updateField: IUpdate = {};

    if (field === "role") {
      updateField.current_user = order.current_user === "merchant" ? "customer" : "merchant";
      updateField.message = message;
      updateField.tip = 0;
    } else if (field === "accepted") {
      updateField.tip = Number(currentTip);
      updateField.accepted = true;
      updateField.time_acceptance = (new Date()).toString();
      console.log(updateField);
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
          window.location.reload();
        } else if (field === "canceled") {
          setOrderCanceled(true);
        }
      })
      .catch(console.error);
    } else {
      setCurrentMessage("Add Tip");
      setCurrentTitleMessage("Error Submiting Order");
      setCurrentMessageValidation(true); 
    }
  };

  const handleTip = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const currentTip = Number(event.target.value);
    if ((currentTip === 0 && event.target.value.length < 5) || (currentTip && currentTip > 0) || (event.target.value === "")) {
      setCurrentTip(event.target.value);
    }
  };

  return (
    <>
      <MainModal titleMessage={ currentTitleMessage }>
        <h6>{ currentMessage }</h6>
      </MainModal>

      {/* <div 
        key={ order.id } 
        className="border border-secondary mb-3 pt-5 text-dark"
        style={{
          backgroundColor: "rgba(255,255,255,0.75)"
        }}
      > */}
        <h4 className="text-center font-weight-bold mt-4">Order #{ order.id }</h4>
        { 
          currentUser?.role === "customer" ? (
            <>
              <h6 className="text-center"><strong>Merchant Name: </strong>{ order.merchant_name }</h6>
              <h6 className="text-center"><Link to={`/merchants/${order.merchant_slug}`}>Visit Merchant Website</Link></h6>   
            </>
          ) : (
            <div className="text-center">
              <img 
                height={ 100 } 
                width={ 100 }
                src={ order.customer_picture } 
                alt="img"
                className="mb-3 rounded-circle"
              /> 
              <h6><strong>Customer Name: </strong>{ order.customer_name }</h6>
              <h6><strong>Phone Number: </strong>{ order.customer_phone_number }</h6>
              <h6><strong>Address to deliver: </strong>{ `${order.customer_location.address}, ${order.customer_location.city}, ${order.customer_location.state}` }</h6>
              { order.customer_location.details && <h6><strong>Details of customer location: </strong>{order.customer_location.details}</h6> }
            </div>
          )
        }

        {
          !orderCanceled && currentUser?.role === "customer" && currentRole === "merchant" && !orderAccepted ? (
            <h6 className="mx-auto text-warning bg-dark w-50 rounded">Waiting for the merchant to confirm your order.</h6>
          ) : !orderCanceled && currentUser?.role === "merchant" && currentRole === "customer" && !orderAccepted ? (
            <h6 className="mx-auto text-warning bg-dark w-50 rounded">Waiting for the customer to confirm order.</h6>
          ) : !orderCanceled && orderAccepted ? (
            <>
              { delivery !== "Order delivered" && <h6 className="text-center" style={{color: "#0a0"}}>Order accepted</h6> }
              { (delivery && currentUser?.role === "customer") && <h6 className="text-center" style={{color: colorDelivery}}>{ delivery }</h6> }
              { orderPlaced && <h6 className="text-center"><strong>Order placed: </strong>{ orderPlaced }</h6>}
              { delivery !== "Order delivered" && <h6 className="text-center"><strong>Estimated arrival: </strong>{ estimatedArrival }</h6>}
            </>
          ) : orderCanceled && (
            <h6 className="text-center" style={{color: "#f00"}}>Order canceled</h6>
          )
        }


        <Table className="w-auto mx-auto ml-4 text-dark" style={{ textAlign: "center" }} borderless>
          <thead>
            <tr className="border border-dark">
              <th>Product name</th>
              <th>Unit Price</th>
              <th>Amount</th>
              <th>Unit Tax</th>
              <th className="border-right border-dark">Semi Total</th>
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
                          <td className="border-left border-bottom border-dark"><strong>Tip</strong></td>
                          {
                            (currentRole === "customer" && !orderAccepted) ? (
                              <>
                                <td className="border-right border-bottom border-dark">$ 
                                  <input 
                                    type="text"
                                    value={ currentTip }
                                    onChange={ handleTip }
                                    placeholder={ `Suggested: $${(semiTotal * 0.15).toFixed(2)}` }
                                    className="w-75"
                                  />
                                </td>
                                <td className="border-right border-bottom border-dark">
                                  <Button onClick={ () => setCurrentTip((semiTotal * 0.15).toFixed(2)) }>
                                    Apply suggested tip
                                  </Button>
                                </td>
                              </>
                            ) : (orderAccepted || (!orderAccepted && currentRole === "merchant")) && (
                              <td className="border-right border-bottom border-dark">${ currentTip === "" ? 0 : currentTip }</td>
                            )
                          }
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="border-left border-bottom border-dark"><strong>Delivery Fee</strong></td>
                          <td className="border-right border-bottom border-dark">${ order.delivery_fee }</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="border-left border-bottom border-dark"><strong>Total</strong></td>
                          <td className="border-right border-bottom border-dark">{ `$${(semiTotal+ Number(currentTip) + order.delivery_fee).toFixed(2)}` }</td>
                        </tr>
                      </>
                    )
                  }
                </>
              )
            }
          </tbody>
        </Table>

        {
          (!orderCanceled && currentUser?.role === "merchant" && currentRole === "merchant" && !orderAccepted) && (
            <div className="text-center">
              {
                !acceptance.filter((v) => !v).length ? (
                  <Button className="btn-success" onClick={ () => handleUpdate(order.id, "accepted") }>Confirm order</Button>
                ) : (
                  <form 
                    onSubmit={ (event) => {
                      event.preventDefault();
                      if (message.length >= 20) {
                        handleUpdate(order.id, "role"); 
                      } else {
                        setCurrentMessage("The order has been modified, then it needs a message.\n\nMessage needs to have at least 20 characters");
                        setCurrentTitleMessage("Error Suggesting changes in Order");
                        setCurrentMessageValidation(true); 
                      }
                    }}
                  >
                    <p><strong>Message</strong></p>
                    <textarea 
                      name="message" 
                      value={ message }
                      onChange={ (event) => setMessage(event.target.value) }
                      placeholder="Message needs to have at least 20 characters"
                    >
                    </textarea>
                    <br/>
                    <br/>
                    <Button 
                      type="submit" 
                    >Suggest Changes</Button>
                  </form>
                )
              }
            </div>
          )
        }

        {
          (!orderCanceled && currentUser?.role === "customer" && currentRole === "customer" && !orderAccepted) && (
            <div className="text-center">
              <h6><strong>Message from merchant: </strong>{ message }</h6>
              <h6>If you accept the changes, press confirm order, if not, press Cancel Order</h6>
              <Button className="mr-2 btn-success" onClick={ () => handleUpdate(order.id, "accepted") }>Confirm order</Button>
              <Button className="mr-2 btn-danger" onClick={ () => handleUpdate(order.id, "canceled") }>Cancel order</Button>
            </div>
          )
        }
        <br/>
      {/* </div> */}
    </>
  );
};

export default Order;
