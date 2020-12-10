import React, { FC, useState, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditCustomer from'./EditCustomer';
import EditLocation from '../Location/EditLocation';
import Location from '../Location/Location';

const Customer: FC = (): JSX.Element => {
  const { currentUser, location } = useContext<TContextProps>(AtucasaContext);
  const [ currentCustomer, setCurrentCustomer ] = useState<TCurrentCustomer | null>(null);


  const handleCurrentCustomer = () => {
    fetch("http://localhost:3000/current_user/customer", {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCurrentCustomer(data.customer);
    })
    .catch(console.error);
  };

  useEffect((handleCurrentCustomer), []);

  return(
    <>
      {
        (currentUser && currentCustomer && location) && (
          <>
            <h1>Customer</h1>
            <EditUser />
            <EditCustomer handleCurrentCustomer={handleCurrentCustomer}/>
            <EditLocation />
            <h2>User information</h2>
            <p><strong>Email: </strong>{ currentUser.email }</p>
            <p><strong>Role: </strong>{ currentUser.role }</p>
            <h2>Personal information</h2>
            <p><strong>Username: </strong>{ currentCustomer.username }</p>
            <p><strong>First Name: </strong>{ currentCustomer.first_name }</p>
            <p><strong>Last Name: </strong>{ currentCustomer.last_name }</p>
            <p><strong>Slug: </strong>{ currentCustomer.slug }</p>
            <p><strong>Phone Number: </strong>{ currentCustomer.phone_number }</p>
            <p><strong>Profile Picture: </strong>{ currentCustomer.profile_picture }</p>
            <Location />
          </>
        )
      }
    </>
  );
};

export default Customer;