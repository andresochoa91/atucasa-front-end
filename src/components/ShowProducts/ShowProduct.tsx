import React, { FC, useState, useContext } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import { AtucasaContext } from '../../Context';
import DeleteProduct from '../Products/DeleteProduct';

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
          <div 
            style={{ 
              width: '230px',
            }}
            className="mb-4 "
          >
            <Card.Img 
              variant="top" 
              src={ `${product.product_picture}` }
              style={{
                height: "160px"
              }}
              className="border"
            />    
            <ListGroup variant="flush">
              <Popup 
                trigger={
                  <ListGroup.Item
                    style={{ 
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      padding: "3px 10px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "pointer"
                    }}
                  >
                    { product.product_name }
                  </ListGroup.Item>
                }
                position="top center"
              >
                <div 
                  className="bg-white p-3 rounded text-dark border border-dark"
                >
                  { product.product_name }
                </div>
              </Popup>

              <Popup 
                trigger={
                  <ListGroup.Item
                    style={{ 
                      color: "black",
                      padding: "3px 10px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "pointer"
                    }}
                  >
                    { product.description || "..." }
                  </ListGroup.Item>
                }
                position="top center"
              >
                <div 
                  className="bg-white p-3 rounded text-dark border border-dark"
                >
                  { product.description || "..." }
                </div>
              </Popup>

              <ListGroup.Item
                style={{ 
                  color: "black",
                  fontSize: "16px",
                  padding: "3px"
                }}
              >
                Unit Price: ${ product.price }
              </ListGroup.Item>

              {
                checkProductId ?  (
                  <ListGroup.Item
                    style={{ 
                      color: "black",
                      fontSize: "16px",
                      padding: "0"
                    }}
                  >
                    <p 
                      style={{color: "#0a0"}}
                      className="mb-1"
                    ><strong>
                      Product in Cart
                    </strong></p>
                  </ListGroup.Item>
                ) : <></>
              }

              {
                currentUser && currentUser.role === "customer" && (
                  !checkProductId && (
                    <>
                      <ListGroup.Item
                        style={{ 
                          color: "black",
                          fontSize: "16px",
                          padding: "3px"
                        }}
                      >
                        Amount:&nbsp;
                        <Button 
                          style={{
                            borderRadius: "50%",
                            padding: "1px 11px"
                          }}
                          className="btn-light btn-outline-secondary" 
                          onClick={ () => (amount > 1) ? setAmount(amount - 1) : amount }
                        >
                          -
                        </Button>
                        { amount }
                        <Button 
                          style={{
                            borderRadius: "50%",
                            padding: "1px 9px"
                          }}
                          className="btn-light btn-outline-secondary" 
                          onClick={ () => (amount < 20) ? setAmount(amount + 1) : amount }
                        >
                          +
                        </Button>
                      </ListGroup.Item>

                      <ListGroup.Item
                        style={{ 
                          color: "black",
                          fontSize: "16px",
                          padding: "0",
                          borderRadius: "5px"
                        }}
                      >
                        <Button 
                          onClick={ handleCart }
                          style={{
                            width: "104px",
                          }}
                          className="btn-success w-100"
                        >
                          Add to cart
                        </Button>
                      </ListGroup.Item>
                    </>
                  ) 
                )
              }
            </ListGroup>
          </div>
    </>
  );
};

export default ShowProduct;
