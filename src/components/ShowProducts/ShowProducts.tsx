import React, { FC, useState, useEffect } from 'react';
import ShowProduct from '../ShowProducts/ShowProduct';

interface IProductsProps {
  products: TProducts,
  merchantID: number | undefined,
  currentCustomerID: number | undefined
};

interface IProductCheckout {
  id?: number,
  amount?: number
}

interface ICheckout {
  customer_id?: number,
  merchant_id?: number,
  accepted?: boolean,
  tip?: number,
  current_user?: string,
  delivery_fee?: number,
  products?: Array<IProductCheckout>
};

const ShowProducts: FC<IProductsProps> = ({ products, merchantID, currentCustomerID }): JSX.Element => {

  const [ cart, setCart ] = useState<Array<TCartProduct>>([]);
  const [ tip, setTip ] = useState<string>("");
  const [ total, setTotal ] = useState<number>(0);

  const handleTip = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTip(event.target.value);
  };

  const handleSuggestedTip = (): void => {
    setTip((total * 0.15).toFixed(2));
  };

  useEffect(() => {
    setTotal(
      cart.reduce((acc, pr) => {
        return acc + ((pr.tax + pr.unitPrice) * pr.amount)
      }, 0)
    );
  }, [cart, tip]);

  const handleCheckout = (): void => {

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

    fetch(`${process.env.REACT_APP_API}/merchants/${merchantID}/create_order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(checkout)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCart([]);
      setTip("");
    })
    .catch(console.error);
  };

  return (
    <>
      {
        products.map((product) => (
          <div key={ product.id }>
            <ShowProduct cart={ cart } setCart={ setCart } product={ product }/>
            <br/>
          </div>
        ))
      }
      <h3>Cart:</h3>
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
            cart.map((cartProduct, cID) => (
              <tr key={ cID }>
                <td>{ cartProduct.productName }</td>
                <td>${ cartProduct.unitPrice }</td>
                <td>{ cartProduct.amount }</td>
                <td>${ cartProduct.tax.toFixed(2) }</td>
                <td>${ ((cartProduct.tax + cartProduct.unitPrice) * cartProduct.amount).toFixed(2) }</td>
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
                placeholder={ `Suggested: ${(total * 0.15).toFixed(2)}` }
                onChange={ handleTip }
              />
            </td>
            <td><button onClick={ handleSuggestedTip }>Apply suggested tip</button></td>
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
            <td><strong>Total</strong></td>
            <td><strong>${ (total + Number(tip) + 5).toFixed(2) }</strong></td>
          </tr>
        </tbody>
      </table>
      <button onClick={ handleCheckout }>Checkout</button>
    </>   
  );
};

export default ShowProducts;
