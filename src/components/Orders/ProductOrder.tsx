import React, { FC, useState } from 'react';

interface IProduct {
  id: number,
  product_name: string,
  price: number,
  amount: number,
  tax: number
}

interface IProductProps {
  product: IProduct,
  currentUser: TCurrentUser | null,
  currentRole: string,
  orderAccepted: boolean,
  orderCanceled: boolean
}

const ProductOrder: FC<IProductProps> = ({ 
  product, 
  currentUser, 
  currentRole, 
  orderAccepted, 
  orderCanceled 
}): JSX.Element => {

  const [ currentAmount, setCurrentAmount ] = useState<number>(product.amount);
  const [ available, setAvailable ] = useState<boolean>(true);
  const [ updated, setUpdated ] = useState<boolean>(false);

  // const handleSuggestedAmount = (): void => {
  //   fetch(`${process.env.REACT_APP_API}/product_order/${product.id}`, {
  //     method: "PUT",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       amount: currentAmount
  //     })
  //   })
  // };

  return (
    <tr 
      style={{ 
        backgroundColor: (
          !available ? "#f00" : 
          updated ? "#ff0" : "#fff"
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
                  setUpdated(true); 
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
                    setUpdated(false);
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
      <td><button onClick={ () => setAvailable(!available) }>{ available ? "Not Available" : "Available"}</button></td>
    </tr>
  );
};

export default ProductOrder;
