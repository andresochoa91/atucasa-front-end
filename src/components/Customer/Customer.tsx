import React, { FC, useState, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditCustomer from'./EditCustomer';
import EditLocation from '../Location/EditLocation';
import Location from '../Location/Location';
import ShowMerchants from '../ShowMerchant/ShowMerchants';
import Orders from '../Orders/Orders';
import MyMap from '../MyMap/MyMap';

const Customer: FC = (): JSX.Element => {
  const { currentUser, location } = useContext<TContextProps>(AtucasaContext);
  const [ currentCustomer, setCurrentCustomer ] = useState<TCurrentCustomer | null>(null);
  const [ showOrder, setShowOrder ] = useState<boolean>(false);
  const [ showMerchants, setShowMerchants ] = useState<boolean>(false);
  const [ showMap, setShowMap ] = useState<boolean>(false);

  const handleCurrentCustomer = () => {
    fetch(`${process.env.REACT_APP_API}/current_user/customer`, {
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

  useEffect(handleCurrentCustomer, []);

  console.log(location)

  return(
    <>
      {
        (currentUser && currentCustomer && location) && (
          <>
            <h1>Customer</h1>
            {
              (location.latitude && location.longitude) && (
                <>
                  <button onClick={ () => setShowMap(!showMap) }>Show Map</button>
                  {
                    showMap && <MyMap lat={location.latitude} lng={location.longitude} />
                  }
                </>
              )
            }
            <br/>
            <br/>
            <button 
              onClick={ () => setShowOrder(!showOrder) }
            >
              { !showOrder ? "Show Orders" : "Do Not Show Orders" }
            </button>
            {
              showOrder && (
                <Orders />
              )
            }
            <br/>
            <br/>
            <button onClick={ () => setShowMerchants(!showMerchants) } >
                { showMerchants ? "Don't show merchants" : "Show Merchants"}
            </button>
            {
              showMerchants && (
                <ShowMerchants currentCustomer={ currentCustomer }/>
              )
            }
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