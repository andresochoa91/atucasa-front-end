import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookies';

const DeleteProduct: FC<TProductProps & TProductsProps> = ({ product, handleProducts }): JSX.Element => {

  const handleDelete = (): void => {
    if (window.confirm("are you sure?")) {
      fetch(`${process.env.REACT_APP_API}/current_user/products/${product.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": cookie.load("token")
        }
      })
      .then(response => response.json())
      .then(data => {
        handleProducts();
      })
      .catch(console.error);
    }
  };

  return (
    <Button className="btn-danger w-50" onClick={ handleDelete }>Delete</Button>  
  );
};

export default DeleteProduct;
