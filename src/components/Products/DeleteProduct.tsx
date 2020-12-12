import React, { FC } from 'react';

const DeleteProduct: FC<TProductProps & TProductsProps> = ({ product, handleProducts }): JSX.Element => {

  const handleDelete = (): void => {
    if (window.confirm("are you sure?")) {
      fetch(`${process.env.REACT_APP_API}/current_user/products/${product.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        handleProducts();
      })
      .catch(console.error);
    }
  };

  return (
    <>
      <button onClick={ handleDelete }>Delete</button>  
    </>
  );
};

export default DeleteProduct;
