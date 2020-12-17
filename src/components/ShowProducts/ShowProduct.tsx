import React, { FC, useState } from 'react';

interface ICartProps {
  setCart: React.Dispatch<React.SetStateAction<TCartProduct[]>>,
  cart: TCartProduct[]
}

const ShowProduct: FC<TProductProps & ICartProps> = ({ product, setCart, cart }): JSX.Element => {

  const [ amount, setAmount ] = useState<number>(1);

  const handleCart = (): void => {
    if (!((cart.filter(pr => pr.id === product.id)).length)) {
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
      <p><strong>Product Name</strong>: { product.product_name }</p>
      <p><strong>Description</strong>: { product.description }</p>
      <p><strong>Unit Price</strong>: { product.price }</p>
      <p><strong>Category</strong>: { product.category }</p>
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
  );
};

export default ShowProduct;
