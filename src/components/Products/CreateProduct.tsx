import React, { FC, useContext, useState } from 'react'
import { AtucasaContext } from '../../Context';
import UpdateImage from '../UpdateImage/UpdateImage';

const CreateProduct: FC<TProductsProps> = ({ handleProducts }): JSX.Element => {
  const { currentUser } = useContext<TContextProps>(AtucasaContext);
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

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const currentPrice = Number(event.target.value);
    if ((currentPrice === 0 && event.target.value.length < 5) || (currentPrice && currentPrice > 0) || (event.target.value === "")) {
      setPrice(event.target.value);
    }
  }

  const handleAvailable = (event:React.MouseEvent<HTMLOptionElement>):void => {
    event.preventDefault();
    setAvailable(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (price === "") {
      alert("Price can't be empty");
      return;
    }
    fetch(`${process.env.REACT_APP_API}/current_user/products`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_name: productName,
        description,
        price: Number(price) > 0 ? Number(price) : -1,
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
        console.log(data.error);
        const { product_name, price, product_picture } = data.error;
        if (product_name) {
          alert(`Product name ${product_name[0]}`)
        } else if (price) {
          alert(`Price ${price[0]}`)
        } else if (product_picture) {
          alert(`Product picture ${product_picture[0]}`)
        }
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <h2>Create Product</h2>
      <form onSubmit={ handleSubmit }>
        <label><strong>Product Name: </strong></label>   
        <input 
          type="text"
          name="productName"
          value={ productName }  
          onChange={ handleInput } 
        />
        <br/>
        <label><strong>Description: </strong></label>   
        <input 
          type="text"
          name="description"
          value={ description }  
          onChange={ handleInput } 
        />
        <br/>
        <label><strong>Price: </strong></label>   
        <input 
          type="text"
          name="price"
          value={ price }  
          onChange={ handlePrice } 
        />
        <br/>
        <label><strong>Available: </strong></label>
        <select name="available" id="available">
          <option value="yes" onClick={ handleAvailable }>Yes</option>
          <option value="no" onClick={ handleAvailable }>No</option>
        </select>
        <br/>
        <label><strong>Product Picture:</strong></label>   
        {/* <input 
          type="text"
          name="productPicture"
          value={ productPicture }  
          onChange={ handleInput } 
        /> */}
        <UpdateImage 
          currentPicture = { "" }
          userName = { currentUser?.email }
          handleInput = { handleInput }
          newPicture = { productPicture }
          setNewPicture = { setProductPicture }
        />
        
        <br/>
        <input type="submit" value="Submit"/>
      </form> 
    </>
  );
};

export default CreateProduct;
