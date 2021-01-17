import React, { FC, useEffect, useState } from 'react';
import Order from './Order';

const Orders: FC = (): JSX.Element => {

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
      <h2 className="text-center mb-5 font-weight-bold">Orders</h2>
      {
        orders.map(order => (
          <Order order={ order } key={ order.id }/>
        ))
      }
    </>
  );
};

export default Orders;
