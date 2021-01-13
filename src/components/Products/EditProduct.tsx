import React, { FC, useContext, useState } from 'react'
import { AtucasaContext } from '../../Context';
import UpdateImage from '../UpdateImage/UpdateImage';

const EditProduct: FC<TProductsProps & TProductProps & THandleMode> = ({ handleProducts, product, handleMode }): JSX.Element => {
  const { currentUser } = useContext<TContextProps>(AtucasaContext);
  const [ productName, setProductName ] = useState<string>(product.product_name);
  const [ description, setDescription ] = useState<string | undefined>(product.description ? product.description : "");
  const [ price, setPrice ] = useState<string>(product.price.toString());
  const [ available, setAvailable ] = useState<string>(product.available ? "yes" : "no");
  const [ productPicture, setProductPicture ] = useState<string>(product.product_picture ? product.product_picture : "");

  const productAvailable = product.available ? "yes" : "no";
  const productNotAvailable = product.available ? "no" : "yes";

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { name, value } = event.target;
    ( 
      name === "productName" ? 
        setProductName : 
      name === "description" ? 
        setDescription : 
      name === "price" ? 
        setPrice :
      name === "available" ? 
        setAvailable :
      setProductPicture
    )(value);
  };

  const handleAvailable = (event:React.MouseEvent<HTMLOptionElement>): void => {
    event.preventDefault();
    setAvailable(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}/current_user/products/${product.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_name: productName,
        description,
        price: Number(price),
        available: available === "yes" ? true : false,
        product_picture: productPicture,
        tax: Number(price) * 0.09
      })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        console.log(data);
        handleProducts();
        handleMode();
      } else {
        console.log(data);
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <h2>Edit Product</h2>
      <form onSubmit={ handleSubmit }>
        <label>Product Name</label>   
        <input 
          type="text"
          name="productName"
          value={ productName }  
          onChange={ handleInput } 
        />
        <br/>
        <label>Description</label>   
        <input 
          type="text"
          name="description"
          value={ description }  
          onChange={ handleInput } 
        />
        <br/>
        <label>Price</label>   
        <input 
          type="text"
          name="price"
          value={ price }  
          onChange={ handleInput } 
        />
        <br/>
        <label>Available</label>
        <select name="available" id="available">          
        <>
          <option value={ productAvailable } onClick={ handleAvailable }>{ productAvailable }</option>
          <option value={ productNotAvailable } onClick={ handleAvailable }>{ productNotAvailable }</option>
        </>
        </select>
        <br/>
        <label>Product Picture</label>   
        {/* <input 
          type="text"
          name="productPicture"
          value={ productPicture }  
          onChange={ handleInput } 
        /> */}
        <UpdateImage
          currentPicture = { product.product_picture }
          userName = { currentUser?.email }
          handleInput = { handleInput }
          newPicture = { productPicture }
          setNewPicture = { setProductPicture }
        />
        <br/>

        <br/>
        <input type="submit" value="Submit"/>
        <button onClick={ handleMode }>Cancel</button>
      </form> 
    </>
  );
};

export default EditProduct;
