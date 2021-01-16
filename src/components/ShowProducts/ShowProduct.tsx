import React, { FC, useState, useContext } from 'react';
import { AtucasaContext } from '../../Context';

interface ICartProps {
  setCart: React.Dispatch<React.SetStateAction<Array<TCartProduct>>>,
  cart: Array<TCartProduct>
}

const ShowProduct: FC<TProductProps & ICartProps> = ({ product, setCart, cart }): JSX.Element => {

  const [ amount, setAmount ] = useState<number>(1);
  const { currentUser } = useContext<TContextProps>(AtucasaContext);

  const checkProductId = (cart.filter(pr => pr.id === product.id)).length;

  const handleCart = (): void => {
    if (!checkProductId) {
      setCart([...cart, {
        productName: product.product_name,
        unitPrice: product.price,
        amount: amount,
        tax: product.tax,
        id: product.id
      }]);
      setAmount(1);
    } else {
      console.log("Product already in the cart");
    }
  };

  return (
    <>
      {
        checkProductId ?  (
          <p style={{color: "#0a0"}}><strong>Product in Cart</strong></p>
        ) : <></>
      }
      <img 
        src={ product.product_picture } 
        alt={ product.product_name }
        height={ 100 }
      />
      <p><strong>Product Name</strong>: { product.product_name }</p>
      <p><strong>Description</strong>: { product.description }</p>
      <p><strong>Unit Price</strong>: ${ product.price }</p>
      <p><strong>Category</strong>: { product.category }</p>
      {
        currentUser && currentUser.role === "customer" && (
          <>
            {
              !checkProductId && (
                <>
                  <p><strong>Amount</strong>:
                    <button onClick={ () => (amount > 1) ? setAmount(amount - 1) : amount }>-</button>
                      { amount }
                    <button onClick={ () => (amount < 20) ? setAmount(amount + 1) : amount }>+</button>
                  </p>
                  <p><strong>Total price: $</strong>{ amount * product.price }</p>
                  <button onClick={ handleCart } >Add to cart</button>
                  <br/>
                  <br/>
                </>
              ) 
            }
          </>
        )
      }
    </>
  );
};

export default ShowProduct;
