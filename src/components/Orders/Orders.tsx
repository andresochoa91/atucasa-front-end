import React, { FC, useEffect, useState } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import Order from './Order';

import cookie from 'react-cookies';

const Orders: FC = (): JSX.Element => {

  const [ orders, setOrders ] = useState<TOrders>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/current_user/orders`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.load("token")
      } 
    })
    .then(response => response.json())
    .then(data => {
      setOrders([...data.orders].reverse());
      console.log(data.orders);
    })
    .catch(console.error);

    // const refreshPage = () => {
    //   window.location.reload();
    // }

    // setTimeout(refreshPage, 600000);
  }, []);

  return (
    <> 
      <h2 className="text-center mt-4 mb-5 font-weight-bold">Orders</h2>
      {
        orders.map(order => (
          <div className="mb-4" key={ order.id }>
            <Container className="text-center mt-5">
              <Jumbotron
                className="rounded text-center text-dark p-5" 
                fluid
                style={{
                  backgroundColor: "#fff"
                }}
              >
                <Order order={ order } />
              </Jumbotron>
            </Container>
          </div>
        ))
      }
    </>
  );
};

export default Orders;
