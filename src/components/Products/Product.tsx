import React, { FC, useState } from 'react';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Popup from "reactjs-popup";

const Product: FC<TProductProps & TProductsProps> = ({ product, handleProducts }): JSX.Element => {

  const [ inEditMode, setInEditMode ] = useState<boolean>(false);

  const handleMode = (): void => {
    setInEditMode(!inEditMode);
  };

  return (
    <>
      {
        inEditMode ? (
          <EditProduct
            handleMode={ handleMode } 
            product={ product } 
            handleProducts={ handleProducts } 
          /> 
        ) : (
          <div 
            style={{ 
              width: '230px',
              borderRadius: "100px" 
            }}
            className="mb-4 "
          >
            <Card.Img 
              variant="top" 
              src={ `${product.product_picture}` }
              style={{
                height: "160px",
              }}
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
                  padding: "0"
                }}
              >
                Price: ${ product.price }
              </ListGroup.Item>

              <ListGroup.Item
                style={{ 
                  color: "black",
                  fontSize: "16px",
                  padding: "0"
                }}
              >
                Available: { product.available ? "yes" : "no" }
              </ListGroup.Item>

              <ListGroup.Item
                style={{ 
                  color: "black",
                  fontSize: "16px",
                  padding: "0"
                }}
              >
                Tax: ${ product.tax.toFixed(2) }
              </ListGroup.Item>

              <ListGroup.Item
                style={{ 
                  color: "black",
                  fontSize: "16px",
                  padding: "0",
                  borderRadius: "4px"   
                }}
              >
                <Button className="w-50" onClick={ handleMode }>Edit</Button>
                <DeleteProduct 
                  product={ product } 
                  handleProducts={ handleProducts } 
                />
              </ListGroup.Item>                
            </ListGroup>
          </div>
        )
      }
    </>
  );
};

export default Product;
