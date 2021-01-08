import React, { FC, useState, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditCustomer from'./EditCustomer';
import EditLocation from '../Location/EditLocation';
import Location from '../Location/Location';
import ShowMerchants from '../ShowMerchant/ShowMerchants';
import Orders from '../Orders/Orders';
import MyMap from '../MyMap/MyMap';
import { Switch, Link, Route } from 'react-router-dom';
import GoBack from '../GoBack/GoBack';

const Customer: FC = (): JSX.Element => {
  const { currentUser, location } = useContext<TContextProps>(AtucasaContext);
  const [ currentCustomer, setCurrentCustomer ] = useState<TCurrentCustomer | null>(null);

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

  return(
    <Switch>
      {
        (currentUser && currentCustomer && location) && (
          <>
            <h1>Customer</h1>
            <Route exact path="/home" render={() => (
              <>
                <Link to="/home/map">Open Map</Link>
                <br/>
                <Link to="/home/orders">Orders</Link>
                <br/>
                <Link to="/home/merchants">Merchants</Link>
                <br/>
                <Link to="/home/edit_user">Edit user</Link>
                <br/>
                <Link to="/home/edit_customer">Edit customer</Link>
                <br/>
                <Link to="/home/edit_location">Edit location</Link>
                <br/>
                <Link to="/home/user_information">User information</Link>
                <br/>
                <Link to="/home/personal_information">Personal information</Link>
                <br/>
              </>
            )} />
            <Route path="/home/map" render={() => (
              <>
                {
                  location.latitude && location.longitude && (
                    <MyMap lat={location.latitude} lng={location.longitude} />
                  )
                }
              </>
            )}/>
            <Route path="/home/orders" render={() => <Orders />} />
            <Route path="/home/merchants" 
              render={() => (
                <ShowMerchants currentCustomer={ currentCustomer }/>
              )}
            />
            <Route path="/home/edit_user" render={() => <EditUser />} />
            <Route path="/home/edit_customer" render={() => (
              <EditCustomer 
                currentCustomer={ currentCustomer }
                handleCurrentCustomer={handleCurrentCustomer}
              />
            )} />
            <Route path="/home/edit_location" render={() => <EditLocation />} />
            <Route path="/home/user_information" 
              render={() => (
                <>
                  <GoBack />
                  <h2>User information</h2>
                  <p><strong>Email: </strong>{ currentUser.email }</p>
                  <p><strong>Role: </strong>{ currentUser.role }</p>
                </>
              )
            } />
            <Route path="/home/personal_information" 
              render={() => (
                <>
                  <GoBack />
                  <h2>Personal information</h2>
                  <p><strong>Username: </strong>{ currentCustomer.username }</p>
                  <p><strong>First Name: </strong>{ currentCustomer.first_name }</p>
                  <p><strong>Last Name: </strong>{ currentCustomer.last_name }</p>
                  <p><strong>Slug: </strong>{ currentCustomer.slug }</p>
                  <p><strong>Phone Number: </strong>{ currentCustomer.phone_number }</p>
                  <p><strong>Profile Picture: </strong></p>
                  <img 
                    src={ currentCustomer.profile_picture } 
                    alt="pic"
                    height={ 100 }
                  />
                </>
              )
            } />
            <Route path="/home/location" render={() => <Location />} />
          </>
        )
      }
    </Switch>
  );
};

export default Customer;