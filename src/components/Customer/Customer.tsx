import React, { FC, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditCustomer from'./EditCustomer';
import EditLocation from '../Location/EditLocation';
import Location from '../Location/Location';
import ShowMerchants from '../ShowMerchant/ShowMerchants';
import Orders from '../Orders/Orders';
import MyMap from '../MyMap/MyMap';
import { Switch, Link, Route } from 'react-router-dom';

const Customer: FC = (): JSX.Element => {
  const { currentUser, location, handleCurrentCustomer, currentCustomer } = useContext<TContextProps>(AtucasaContext);

  useEffect(() => {
    if (!currentCustomer) {
      handleCurrentCustomer();
    }
  }, [currentCustomer, handleCurrentCustomer]);

  return(
    <Switch>
      {
        (currentUser && currentCustomer && location) && (
          <>
            <h1>Customer</h1>
            <Route exact path="/home" render={() => (
              <>
                {/* <Link to="/home/map">Open Map</Link>
                <br/> */}
                <MyMap 
                  lat={ location.latitude }
                  lng={ location.longitude }
                />
                <Link to="/home/orders">Orders</Link>
                <br/>
                {/* <Link to="/home/merchants">Merchants</Link>
                <br/> */}
                <Link to="/home/user_information">User information</Link>
                <br/>
                <Link to="/home/personal_information">Personal information</Link>
                <br/>
                <Link to="/home/location">Location</Link>
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
            {/* <Route path="/home/merchants" 
              render={() => (
                <ShowMerchants currentCustomer={ currentCustomer }/>
              )}
            /> */}
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
                  <Link to="/home">Go back to home page</Link>     
                  <h2>User information</h2>
                  <Link to='/home/edit_user'>Update email and/or password</Link>
                  <p><strong>Email: </strong>{ currentUser.email }</p>
                  <p><strong>Role: </strong>{ currentUser.role }</p>
                </>
              )
            } />
            <Route path="/home/personal_information" 
              render={() => (
                <>
                  <Link to="/home">Go back to home page</Link>    
                  <h2>Personal information</h2>
                  <Link to='/home/edit_customer'>Edit personal information</Link>
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