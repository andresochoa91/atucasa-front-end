import React, { FC, useState, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditCustomer from'./EditCustomer';

const Customer: FC = (): JSX.Element => {

  const { currentUser } = useContext<TContextProps>(AtucasaContext);
  const [ currentCustomer, setCurrentCustomer ] = useState<TCurrentCustomer | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/current_user/customer", {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setCurrentCustomer(data.customer)
      
      }
    )
    .catch(console.error);
  }, [currentUser])

  return(
    <>
    {/* { currentCustomer && console.log(currentCustomer.customer) } */}
      <h1>Customer</h1>
      <EditUser />
      <EditCustomer />
      <h2>Personal information</h2>
      <p><strong>Email: </strong>{ currentUser && currentUser.email }</p>
      <p><strong>Role: </strong>{ currentUser && currentUser.role }</p>
      <p><strong>Full Name: </strong>{ currentCustomer && `${currentCustomer.first_name} ${currentCustomer.last_name}` }</p>
      <p><strong>Slug: </strong>{ currentCustomer && currentCustomer.slug }</p>
      <p><strong>Phone Number: </strong>{ currentCustomer && currentCustomer.phone_number }</p>
      <p><strong>Profile Picture: </strong>{ currentCustomer && currentCustomer.profile_picture }</p>
    </>
  );
}

export default Customer;