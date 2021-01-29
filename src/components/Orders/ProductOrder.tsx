import React, { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

interface IProduct {
  id: number,
  product_name: string,
  price: number,
  amount: number,
  tax: number,
  available: boolean,
  amount_changed: boolean
}

interface IProductProps {
  product: IProduct,
  currentUser: TCurrentUser | null,
  currentRole: string,
  orderAccepted: boolean,
  orderCanceled: boolean,
  acceptance: boolean[],
  setAcceptance: React.Dispatch<React.SetStateAction<boolean[]>>,
  index: number,
  lastStage: boolean
}

const ProductOrder: FC<IProductProps> = ({ 
  product, 
  currentUser, 
  currentRole, 
  orderAccepted, 
  orderCanceled,
  acceptance,
  setAcceptance,
  index,
  lastStage
}): JSX.Element => {

  /**Current amount of product ONLY in current order */
  const [ currentAmount, setCurrentAmount ] = useState<number>(product.amount);

  /**If current product in order is available */
  const [ available, setAvailable ] = useState<boolean>(product.available);

  /**Checks if original amount set by customer has changed or not */
  const [ amountChanged, setAmountChanged ] = useState<boolean>(product.amount_changed);

  useEffect(() => {
    if (lastStage) {
      //Put request to api to update product order information
      fetch(`${process.env.REACT_APP_API}/products_order/${product.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: available ? currentAmount : 0,
          amount_changed: available ? amountChanged: false,
          available
        })
      })
      // .then(response => response.json())
      // .then(console.log)
      .catch(console.error);
    }
  }, [lastStage, product.id, available, currentAmount, amountChanged]);

  return (
    <tr 
      key={ product.id }
      className={ `border border-dark ${!available ? "table-danger text-dark" : amountChanged ? "table-warning text-dark" : ""}` }
    >
      <td>{ product.product_name }</td>
      <td>${ (product.price).toFixed(2) }</td>
      <td>
        { 
          currentUser?.role === "merchant" && 
          currentRole === "merchant" &&
          !orderAccepted &&
          !orderCanceled &&
          (
            <Button 
              className="btn-outline-secondary btn-light mr-1"
              onClick={ () => {
                if ((currentAmount > 1) && available) {
                  setCurrentAmount(currentAmount - 1); 
                  setAmountChanged(true);
                  setAcceptance(acceptance.map((v, i) => {
                    if (i === index) return false;
                    return v;
                  })) ;
                }
              }}
            >
              &nbsp;-
            </Button> 
          )
        }
        { currentAmount }
        { 
          currentUser?.role === "merchant" && 
          currentRole === "merchant" &&
          !orderAccepted &&
          !orderCanceled &&
          (
            <Button 
              className="btn-outline-secondary btn-light ml-1"
              onClick={ () => {
                if ((currentAmount < product.amount) && available) {
                  if (currentAmount + 1 === product.amount) {
                    setAmountChanged(false);
                    setAcceptance(acceptance.map((v, i) => {
                      if (i === index) return true;
                      return v;
                    })) ;
                  }
                  setCurrentAmount(currentAmount + 1);
                } 
              }}
            >
              +
            </Button> 
          )
        }
      </td>
      <td>${ (product.tax).toFixed(2) }</td>
      <td>${ Number(((product.price + product.tax) * currentAmount).toFixed(2)) }</td>
      {
        (!orderAccepted && currentUser?.role === "merchant" && currentRole === "merchant") ? (
          <td className="border-left border-dark">
            <Button 
              className={ available ? "btn-danger" : "btn-primary"}
              onClick={ () => {
                setAcceptance(acceptance.map((v, i) => {
                  if ((i === index) && !amountChanged) {
                    return !available;
                  }
                  return v;
                })); 
                setAvailable(!available);
              }}
            >
              { available ? "Not Available" : "Available"}
            </Button>
          </td>
        ) : (!orderAccepted && currentUser?.role === "customer" && currentRole === "customer" && !orderCanceled) && (
          !available ? (
            <td className="font-weight-bold border-left border-dark">Not available</td>
          ) : amountChanged ? (
            <td className="font-weight-bold border-left border-dark">Amount suggested by merchant</td>
          ) : (
            <td className="border-left border-dark">Available</td>
          )
        )
      }
    </tr>
  );
};

export default ProductOrder;
