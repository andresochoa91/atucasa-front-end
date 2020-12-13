import React, { FC, useState } from 'react'

const CreateProduct: FC<TProductsProps> = ({ handleProducts }): JSX.Element => {

  const [ productName, setProductName ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");
  const [ price, setPrice ] = useState<string>("");
  const [ available, setAvailable ] = useState<string>("yes");
  const [ productPicture, setProductPicture ] = useState<string>("");

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

  const handleAvailable = (event:React.MouseEvent<HTMLOptionElement>):void => {
    event.preventDefault();
    setAvailable(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}/current_user/products`, {
      method: "POST",
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
        setProductName("");
        setDescription("");
        setPrice("");
        setProductPicture("");
        handleProducts();
      } else {
        console.log(data);
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <h2>Create Product</h2>
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
          <option value="yes" onClick={ handleAvailable }>Yes</option>
          <option value="no" onClick={ handleAvailable }>No</option>
        </select>
        <br/>
        <label>Product Picture</label>   
        <input 
          type="text"
          name="productPicture"
          value={ productPicture }  
          onChange={ handleInput } 
        />
        <br/>
        <input type="submit" value="Submit"/>
      </form> 
    </>
  );
};

export default CreateProduct;
