import React, { FC, useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AtucasaContext } from '../../Context';
import ContainerJumbotron from '../ContainerJumbotron/ContainerJumbotron';
import MainModal from '../MainModal/MainModal';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';
import UpdateImage from '../UpdateImage/UpdateImage';

const CreateProduct: FC<TProductsProps> = ({ handleProducts }): JSX.Element => {

  const { 
    currentUser,
    setCurrentMessageValidation, 
    currentMessage, 
    setCurrentMessage,
    currentTitleMessage,
    setCurrentTitleMessage  
  } = useContext<TContextProps>(AtucasaContext);

  const [ onCreateProduct, setOnCreateProduct ] = useState<boolean>(false);

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

    console.log(productName);
    console.log(description);
    console.log(price);
    console.log(available);
    console.log(productPicture);

    event.preventDefault();
    if (!Number(price)) {
      setCurrentMessage("Price can't be neither 0 nor empty");
      setCurrentTitleMessage("Error creating product");
      setCurrentMessageValidation(true); 
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
        setOnCreateProduct(false);
      } else {
        console.log(data.error);
        const { product_name, price, product_picture, description } = data.error;
        if (product_name) {
          setCurrentMessage(`Product name ${product_name[0]}`);
        } else if (price) {
          setCurrentMessage(`Price ${price[0]}`);
        } else if (product_picture) {
          setCurrentMessage(`Product picture ${product_picture[0]}`);
        } else if (description) {
          setCurrentMessage(`Description ${description[0]}`);
        }
        setCurrentTitleMessage("Error creating product");
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
      {
        onCreateProduct ? (
          <>
            <form onSubmit={ handleSubmit }>
              <ContainerJumbotron>
                <Button 
                  onClick={ () => setOnCreateProduct(false) }
                  className="mb-5"
                >
                  Close create product window
                </Button>
                <MultiPurposeCard>
                  <thead>
                    <tr>
                      <th className="text-capitalize h3">
                        <h2>
                          <strong>
                            Create Product
                          </strong>
                        </h2>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr><td>
                      <strong>Product Name:&nbsp;</strong>
                      <input 
                        type="text"
                        name="productName"
                        value={ productName }  
                        onChange={ handleInput } 
                      /> 
                    </td></tr>
                    
                    <tr><td>
                      <strong>Description:&nbsp;</strong>
                      <input 
                        type="text"
                        name="description"
                        value={ description }  
                        onChange={ handleInput } 
                      />
                    </td></tr>

                    <tr><td>
                      <strong>Price:&nbsp;</strong>
                      <input 
                        type="text"
                        name="price"
                        value={ price }  
                        onChange={ handlePrice } 
                      />
                    </td></tr>

                    <tr><td>
                      <strong>Available:&nbsp;</strong>
                      <select name="available" id="available">
                        <option value="yes" onClick={ handleAvailable }>Yes</option>
                        <option value="no" onClick={ handleAvailable }>No</option>
                      </select>
                    </td></tr>

                    <tr><td>
                      <label><strong>Product Picture:</strong></label>   
                      <UpdateImage 
                        currentPicture = { "" }
                        userName = { currentUser?.email }
                        handleInput = { handleInput }
                        newPicture = { productPicture }
                        setNewPicture = { setProductPicture }
                        namePicture={ "productPicture" }
                      />
                    </td></tr>
                    <tr><td>
                      <Button 
                        type="submit" 
                        value="Submit"
                        className="btn-success"
                      >
                        Create Product
                      </Button>
                    </td></tr>
                  </tbody>
                </MultiPurposeCard>
              </ContainerJumbotron>
            </form>
          </>
        ) : (
          <Button 
            onClick={ () => setOnCreateProduct(true) }
            className="mb-5"
          >
            Create New Product
          </Button>
        )
      }

    </>
  );
};

export default CreateProduct;
