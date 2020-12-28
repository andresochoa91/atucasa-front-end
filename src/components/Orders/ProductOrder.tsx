import React, { FC, useEffect, useState } from 'react';

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

  const [ currentAmount, setCurrentAmount ] = useState<number>(product.amount);
  const [ available, setAvailable ] = useState<boolean>(product.available);
  const [ amountChanged, setAmountChanged ] = useState<boolean>(product.amount_changed);

  useEffect(() => {
    if (lastStage) {
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
      .then(response => response.json())
      .then(console.log)
      .catch(console.error);
    }
  }, [lastStage, product.id, available, currentAmount, amountChanged]);

  return (
    <tr 
      style={{ 
        backgroundColor: (
          !available ? "#f00" : 
          amountChanged ? "#ff0" : "#fff"
        )
      }} 
      key={ product.id }
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
            <button 
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
              -
            </button> 
          )
        }
        { currentAmount }
        { 
          currentUser?.role === "merchant" && 
          currentRole === "merchant" &&
          !orderAccepted &&
          !orderCanceled &&
          (
            <button 
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
            </button> 
          )
        }
      </td>
      <td>${ (product.tax).toFixed(2) }</td>
      <td>${ Number(((product.price + product.tax) * currentAmount).toFixed(2)) }</td>
      {
        (!orderAccepted && currentUser?.role === "merchant" && currentRole === "merchant") ? (
          <td>
            <button 
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
            </button>
          </td>
        ) : (!orderAccepted && currentUser?.role === "customer" && currentRole === "customer") && (
          <>
            {
              !available ? (
                <td>Not available</td>
              ) : amountChanged ? (
                <td>Amount suggested by merchant</td>
              ) : (
                <td>Available</td>
              )
            }
          </>
        )
      }
    </tr>
  );
};

export default ProductOrder;
