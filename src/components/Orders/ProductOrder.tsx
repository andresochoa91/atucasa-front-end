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

  return (
    <tr key={ product.id }>
      <td>{ product.product_name }</td>
      <td>${ (product.price).toFixed(2) }</td>
      <td>
        { 
          currentUser?.role === "merchant" && 
          currentRole === "merchant" &&
          !orderAccepted &&
          !orderCanceled &&
          (
            <button onClick={ () => currentAmount > 1 && setCurrentAmount(currentAmount - 1) }>
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
            <button onClick={ () => currentAmount < product.amount && setCurrentAmount(currentAmount + 1) }>
              +
            </button> 
          )
        }
      </td>
      <td>${ (product.tax).toFixed(2) }</td>
      <td>${ Number(((product.price + product.tax) * currentAmount).toFixed(2)) }</td>
      {
        currentUser?.role === "merchant" &&
        currentRole === "merchant" && 
        !orderAccepted &&
        !orderCanceled &&
        (
          <td><button>X</button></td>
        )
      }
    </tr>
  );
};

export default ProductOrder;
