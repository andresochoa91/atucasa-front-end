import React, { FC, useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';
import cookie from 'react-cookies';

interface IProductsProps {
  merchantID?: number,
  currentCustomerID?: number,
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
  products?: Array<IProductCheckout>,
  time_acceptance: string
};

/**Cart Component. */
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

  /** History of Path Url. */
  const history = useHistory();

  /**
   * Ensures tip is always a positive and valid number.
   * Rejects characters that aren't numbers.
   * Only accepts one dot when adding cents.
   */
  const handleTip = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const currentTip = Number(event.target.value);
    if (
      (currentTip === 0 && event.target.value.length < 5) || 
      (currentTip && currentTip > 0) || 
      (event.target.value === "")
    ) {
      setTip(event.target.value);
    }
  };

  /** Auto calculates suggested tip based on cost of all the products. */
  const handleSuggestedTip = (): void => {
    setTip((total * 0.15).toFixed(2));
  };

  // Auto calculates total of order every time tip updates. 
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

  /** Creates order */
  const handleCheckout = (): void => {
    if (tip !== "" && (Number(tip) >= 0) && cart.length) {
      /** Contains data that is going to be incluided in the body of post request to create order. */
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
        }),
        time_acceptance: (new Date()).toString()
      };
  
      if (currentCustomerID) checkout.customer_id = currentCustomerID;
      if (merchantID) checkout.merchant_id = merchantID;
  
      //Post request to create order.
      fetch(`${process.env.REACT_APP_API}/merchants/${merchantID}/create_order`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": cookie.load("token")
        },
        body: JSON.stringify(checkout)
      })
      .then(() => {
        setCart([]);
        setTip("");
        history.push("/home/orders");
      })
      .catch(console.error);
    } else {
      //Handling validations in response sent from the back-end.
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
   * Allows to change amount of every product in cart.
   * @param sign should be "+" or "-" to know if we are adding or subtracting products.
   */
  const handleAmount = (sign: string, cartProductID: number):void => {
    setCart(cart.map((pr, id) => {
      if (sign === "-") {
        if (id === cartProductID && pr.amount > 1) {
          pr.amount--;
        }
      } else if (sign === "+") {
        if (id === cartProductID && pr.amount < 20) {
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
            <th style={{ width: "150px" }} >Product</th>
            <th style={{ width: "320px" }} >Amount</th>
            <th style={{ width: "200px" }} >Semi Total</th>
            <th style={{ width: "100px" }} ></th>
          </tr>
        </thead>
        <tbody>
          { 
            //Shows all the products added to the cart.
            cart.map((cartProduct, cartProductID) => (
              <tr key={ cartProductID }>
                <td>{ cartProduct.productName }</td>
                <td>

                  {/* Subtracts one by one amount of specific product in the cart. */}
                  <Button 
                    onClick={ () => handleAmount("-", cartProductID) }
                    style={{
                      borderRadius: "50%",
                      padding: "3px 11px"
                    }}
                    className="btn-light btn-outline-secondary mr-1" 
                  >
                    &nbsp;-
                  </Button>
                  { cartProduct.amount }

                  {/* Adds one by one amount of specific product in the cart. */}
                  <Button 
                    onClick={ () => handleAmount("+", cartProductID) }
                    style={{
                      borderRadius: "50%",
                      padding: "3px 11px"
                    }}
                    className="btn-light btn-outline-secondary ml-1" 
                  >
                    +
                  </Button>
                </td>
                <td>
                  {/* Shows semi total of specific product added to the cart, with 2 decimals for cents. */}
                  ${ ((cartProduct.tax + cartProduct.unitPrice) * cartProduct.amount).toFixed(2) }
                </td>
                <td>
                  {/* Takes out specific product in the cart. */}
                  <Button 
                    onClick={ () => setCart([...cart.filter((pr, id) => id !== cartProductID)]) }
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
            <td><strong>Tip</strong></td>
            <td>
              <input 
                type="text"
                value={ tip }
                placeholder={ `$${(total * 0.15).toFixed(2)}` }
                onChange={ handleTip }
                style={{
                  width: "80px",
                  padding: "0"
                }}
              />
            </td>
            <td>
              {/* When clicking Apply button, it runs handleSuggestedTip function that auto calculate tip. */}
              <Button onClick={ handleSuggestedTip }>Apply</Button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td><strong>Delivery Fee</strong></td>
            <td>$5</td>
          </tr>
          <tr>
            <td></td>
            <td className="h3"><strong>Total</strong></td>
            {/* Shows total cost of order with taxes and tip incluided. */}
            <td className="h3"><strong>${ (total + Number(tip) + 5).toFixed(2) }</strong></td>
          </tr>
        </tbody>
      </Table>
      {/* When pressing, it runs handleCheckout function that generates the order. */}
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
