import React, { FC, useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';
import cookie from 'react-cookies';

interface IProductsProps {
  merchantID: number | undefined,
  currentCustomerID: number | undefined,
};
interface IProductCheckout {
  id?: number,
  amount?: number
};
interface ICheckout {
  customer_id?: number,
  merchant_id?: number,
  accepted?: boolean,
  tip?: number,
  current_user?: string,
  delivery_fee?: number,
  products?: Array<IProductCheckout>
};

const Cart: FC<IProductsProps> = ({ currentCustomerID, merchantID }): JSX.Element => {

  const {
    currentMessage,
    setCurrentMessage,
    currentTitleMessage,
    setCurrentTitleMessage,
    setCurrentMessageValidation,
    cart, 
    setCart
  } = useContext<TContextProps>(AtucasaContext);

  const [ tip, setTip ] = useState<string>("");
  const [ total, setTotal ] = useState<number>(0);

  /**
   * History of Path Url
   */
  const history = useHistory();


  const handleTip = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const currentTip = Number(event.target.value);
    if ((currentTip === 0 && event.target.value.length < 5) || (currentTip && currentTip > 0) || (event.target.value === "")) {
      setTip(event.target.value);
    }
  };

  /**
   * Function that auto calculate suggested tip
   */
  const handleSuggestedTip = (): void => {
    setTip((total * 0.15).toFixed(2));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTotal(
        cart.reduce((acc, pr) => {
          return acc + ((pr.tax + pr.unitPrice) * pr.amount)
        }, 0)
      );
    }
    return () => { mounted = false };
  }, [cart, tip]);


  const handleCheckout = (): void => {
    if (tip !== "" && (Number(tip) >= 0) && cart.length) {
      const checkout: ICheckout = {
        accepted: true,
        current_user: "merchant",
        tip: Number(tip),
        delivery_fee: 5,
        products: cart.map(pr => {
          return {
            id: pr.id,
            amount: pr.amount
          }
        })
      };
  
      if (currentCustomerID) checkout.customer_id = currentCustomerID;
      if (merchantID) checkout.merchant_id = merchantID;
  
      //Post request to create order
      fetch(`${process.env.REACT_APP_API}/merchants/${merchantID}/create_order`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": cookie.load("token")
        },
        body: JSON.stringify(checkout)
      })
      .then(response => response.json())
      .then(data => {
        setCart([]);
        setTip("");
        history.push("/home/orders");
      })
      .catch(console.error);
    } else {
      //Handling validations in response sent from the back-end
      if (!cart.length) {
        setCurrentMessage("Cart can't be empty");
      } else if (tip === "") {
        setCurrentMessage("Add tip");
      }
      setCurrentTitleMessage("Error Submiting Order")
      setCurrentMessageValidation(true);
    }
  };

  /**
   * Manipulating amount of every product in cart
   * @param sign should be "+" or "-" to know if we are adding or subtracting
   * @param cID Customer ID
   */
  const handleAmount = (sign: string, cID: number):void => {
    setCart(cart.map((pr, id) => {
      if (sign === "-") {
        if (id === cID && pr.amount > 1) {
          pr.amount--;
        }
      } else if (sign === "+") {
        if (id === cID && pr.amount < 20) {
          pr.amount++;
        }
      }
      return pr
    }));
  };

  return (
    <>
      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>
      <Table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Product name</th>
            <th
              style={{
                width: "110px"
              }}
            >
              Unit Price
            </th>
            <th>Amount</th>
            <th>Unit Tax</th>
            <th
              style={{
                width: "200px"
              }}
            >Semi Total</th>
          </tr>
        </thead>
        <tbody>
          { 
            cart.map((cartProduct, cID) => (
              <tr key={ cID }>
                <td>{ cartProduct.productName }</td>
                <td>${ cartProduct.unitPrice }</td>
                <td 
                  style={{
                    width: "120px"
                  }} 
                >
                  <Button 
                    onClick={ () => handleAmount("-", cID) }
                    style={{
                      borderRadius: "50%",
                      padding: "3px 11px"
                    }}
                    className="btn-light btn-outline-secondary mr-1" 
                  >
                    &nbsp;-
                  </Button>
                  { cartProduct.amount }
                  <Button 
                    onClick={ () => handleAmount("+", cID) }
                    style={{
                      borderRadius: "50%",
                      padding: "3px 11px"
                    }}
                    className="btn-light btn-outline-secondary ml-1" 
                  >
                    +
                  </Button>
                </td>
                <td>${ cartProduct.tax.toFixed(2) }</td>
                <td>${ ((cartProduct.tax + cartProduct.unitPrice) * cartProduct.amount).toFixed(2) }</td>
                <td>
                  <Button 
                    onClick={ () => setCart([...cart.filter((pr, id) => id !== cID)]) }
                    className="btn-danger"
                  >
                    &times;
                  </Button>
                </td>
              </tr>
            )) 
          }
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Tip</strong></td>
            <td>
              $<input 
                type="text"
                value={ tip }
                placeholder={ `Suggested: $${(total * 0.15).toFixed(2)}` }
                onChange={ handleTip }
                style={{
                  width: "157px",
                  padding: "0"
                }}
              />
            </td>
            <td><Button onClick={ handleSuggestedTip }>Apply</Button></td>
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
            <td className="h3"><strong>Total</strong></td>
            <td className="h3"><strong>${ (total + Number(tip) + 5).toFixed(2) }</strong></td>
          </tr>
        </tbody>
      </Table>
      <Button 
        onClick={ handleCheckout }
        className="btn-success text-center"
        style={{
          margin: "auto",
          width: "100%"
        }}
      >
        Checkout
      </Button>
    </>
  );
};

export default Cart;
