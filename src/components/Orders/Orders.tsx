import React, { FC, useEffect, useState } from 'react';
import BackHomePage from '../BackHomePage/BackHomePage';
import Order from './Order';

const Orders: FC = (): JSX.Element => {

  // const { currentUser } = useContext<TContextProps>(AtucasaContext)
  const [ orders, setOrders ] = useState<TOrders>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/current_user/orders`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      } 
    })
    .then(response => response.json())
    .then(data => {
      setOrders([...data.orders]);
      console.log(data.orders);
    })
    .catch(console.error);
  }, []);

  return (
    <> 
      <BackHomePage />     
      <h2>Orders</h2>
      {
        orders.map(order => (
          <Order order={ order } key={ order.id }/>
        ))
      }
    </>
  );
};

export default Orders;
