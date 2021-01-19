import React, { FC, useContext, useState } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';
import UpdateImage from '../UpdateImage/UpdateImage';

const EditProduct: FC<TProductsProps & TProductProps & THandleMode> = ({ handleProducts, product, handleMode }): JSX.Element => {
  
  const { 
    currentUser,
    setCurrentMessageValidation, 
    currentMessage, 
    setCurrentMessage,
    currentTitleMessage,
    setCurrentTitleMessage  
  } = useContext<TContextProps>(AtucasaContext);

  const [ productName, setProductName ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");
  const [ price, setPrice ] = useState<string>("");
  const [ available, setAvailable ] = useState<string>(product.available ? "yes" : "no");
  const [ productPicture, setProductPicture ] = useState<string>("");

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

  const handleAvailable = (event:React.MouseEvent<HTMLOptionElement>): void => {
    event.preventDefault();
    setAvailable(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!productName && !description && !price && !productPicture) {
      setCurrentMessage("There is nothing to update");
      setCurrentTitleMessage("Error editing product");
      setCurrentMessageValidation(true); 
      return;
    }

    if (price !== "" && !Number(price)) {
      setCurrentMessage("Price can't be 0");
      setCurrentTitleMessage("Error editing product");
      setCurrentMessageValidation(true); 
      return;
    }

    fetch(`${process.env.REACT_APP_API}/current_user/products/${product.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_name: productName ? productName : product.product_name,
        description: description ? description : product.description,
        price: Number(price) ? Number(price) : product.price,
        available: available === "yes" ? true : false,
        product_picture: productPicture ? productPicture : product.product_picture,
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
        console.log(data.error);
        const { product_name, price, product_picture, description } = data.error;
        if (product_name) {
          setCurrentMessage(`Product name ${product_name[0]}`);
        } else if (description) {
          setCurrentMessage(`Description ${description[0]}`);
        } else if (price) {
          setCurrentMessage(`Price ${price[0]}`);
        } else if (product_picture) {
          setCurrentMessage(`Product picture ${product_picture[0]}`);
        }
        setCurrentTitleMessage("Error editing product");
        setCurrentMessageValidation(true); 
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>

      <form onSubmit={ handleSubmit } className="mb-4" >
        <MultiPurposeCard>
          <tbody>
            <tr><td>
              <strong>
                <label>Profile Picture:</label>
              </strong>

              <UpdateImage 
                currentPicture = { product.product_picture }
                userName = { currentUser?.email }
                handleInput = { handleInput }
                newPicture = { productPicture }
                setNewPicture = { setProductPicture }
                namePicture={ "productPicture" }
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Product Name: &nbsp;</label>
              </strong>
              <input 
                type="text"
                name="productName"
                value={ productName }  
                onChange={ handleInput } 
                placeholder={ product.product_name }
                style={{
                  width: "300px"
                }}
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Description: &nbsp;</label>
              </strong>
              <input 
                type="text"
                name="description"
                value={ description }  
                onChange={ handleInput } 
                placeholder={ product.description }
                style={{
                  width: "320px"
                }}
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Price: $&nbsp;</label>
              </strong>
              <input 
                type="text"
                name="price"
                value={ price }  
                onChange={ handlePrice } 
                placeholder={ product.price ? product.price.toString() : "" }
                style={{
                  width: "360px"
                }}
              />
            </td></tr>

            <tr><td>
              <strong>
                <label>Available: &nbsp;</label>
              </strong>
              <select name="available" id="available">          
                <option value={ productAvailable } onClick={ handleAvailable }>{ productAvailable }</option>
                <option value={ productNotAvailable } onClick={ handleAvailable }>{ productNotAvailable }</option>
              </select>              
            </td></tr>

            <tr><td>
              <Button className="mr-2 btn-success" type="submit">Update</Button>
              <Button onClick={ handleMode }>Cancel</Button>
            </td></tr>  
          </tbody>
        </MultiPurposeCard>
      </form>
    </>
  );
};

export default EditProduct;
