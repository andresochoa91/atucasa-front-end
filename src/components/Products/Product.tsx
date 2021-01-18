import React, { FC, useState } from 'react';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import { Button, Card, ListGroup } from 'react-bootstrap';

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
          <Card 
            style={{ 
              width: '230px', 
            }}
            className="mb-4"
          >
            <Card.Img 
              variant="top" 
              src={ `${product.product_picture}` }
              style={{
                height: "160px",
              }}
            />
            <ListGroup variant="flush">
              <ListGroup.Item
                style={{ 
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "18px",
                  padding: "3px 10px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                { product.product_name }
              </ListGroup.Item>
              <ListGroup.Item
                style={{ 
                  color: "black",
                  fontSize: "16px",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  // maxWidth: "200px",
                }}
              >
                { product.description || "..." }  
              </ListGroup.Item>

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
                  padding: "0"
                }}
                // className="position-absolute fixed-bottom"
              >
                <Button className="w-50" onClick={ handleMode }>Edit</Button>
                <DeleteProduct 
                  product={ product } 
                  handleProducts={ handleProducts } 
                />
              </ListGroup.Item>                
            </ListGroup>
          </Card>
        )
      }
    </>
  );
};

export default Product;
