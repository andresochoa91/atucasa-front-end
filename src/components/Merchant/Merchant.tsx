import React, { FC, useState, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditMerchant from'./EditMerchant';
import EditLocation from'../Location/EditLocation';
import Location from '../Location/Location';
import Links from '../Links/Links';
import Products from '../Products/Products';
import Orders from '../Orders/Orders';
import { Switch, Link, Route } from 'react-router-dom';
import MyMap from '../MyMap/MyMap';
import BackHomePage from '../BackHomePage/BackHomePage';

const Merchant: FC = (): JSX.Element => {
  const { currentUser, location } = useContext<TContextProps>(AtucasaContext);
  const [ currentMerchant, setCurrentMerchant ] = useState<TCurrentMerchant | null>(null);

  const handleCurrentMerchant = () => {
    fetch(`${process.env.REACT_APP_API}/current_user/merchant`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCurrentMerchant(data.merchant);
    })
    .catch(console.error);
  };

  useEffect(handleCurrentMerchant, []);
  
  return (
    <>
      <h1>Merchant</h1>
      {
        (currentUser && currentMerchant && location) && (          
          <Switch>
            <Route exact path="/home" render={() => (
              <>
                <Link to="/home/map">Show Map</Link>
                <br/>
                <Link to="/home/orders">Orders</Link>
                <br/>
                <Link to="/home/user_information">Personal Information</Link>
                <br/>
                <Link to="/home/location">Location</Link>
                <br/>          
                <Link to="/home/links">Links</Link>
                <br/>      
                <Link to="/home/products">Products</Link>
                <br/>    
              </>
            )}/> 
            {
              location.latitude && location.longitude && (
                <Route path="/home/map" render={() => (
                  <MyMap lat={location.latitude} lng={location.longitude} />
                )}/>
              )
            }
            {/* <Route path="/home/map" render={() => (
              location.latitude && location.longitude && (
                <MyMap lat={location.latitude} lng={location.longitude} />
              )
            )}/>  */}
            <Route path="/home/edit_user" render={() => <EditUser />}/> 
            <Route path="/home/edit_merchant" render={() => (
              <EditMerchant 
                handleCurrentMerchant={ handleCurrentMerchant }
                currentMerchant={ currentMerchant }
              />
            )}/> 
            <Route path="/home/edit_location" render={() => <EditLocation />}/> 
            <Route path="/home/orders" render={() => <Orders />}/> 
            <Route path="/home/user_information" render={() => (
              <>
                <BackHomePage />   
                <h2>User information</h2>
                <Link to="/home/edit_user">Update email or password</Link>
                <br/>
                <Link to="/home/edit_merchant">Edit merchant information</Link>
                <br/>
                <p><strong>Email: </strong>{ currentUser.email }</p>
                <p><strong>Role: </strong>{ currentUser.role }</p>
                <p><strong>Merchant Name: </strong>{ currentMerchant.merchant_name }</p>
                <p><strong>Slug: </strong>{ currentMerchant.slug }</p>
                <p><strong>Phone Number: </strong>{  currentMerchant.phone_number }</p>
                <p><strong>Tax ID: </strong>{ currentMerchant.tax_id }</p>
                <p><strong>Description: </strong>{  currentMerchant.description }</p>
                <p><strong>Profile Picture: </strong></p>
                <img 
                  src={ currentMerchant.profile_picture } 
                  alt="pic"
                  height={ 100 }
                />
                <p><strong>Background Picture: </strong></p>
                <img 
                  src={ currentMerchant.background_picture } 
                  alt="pic"
                  height={ 100 }
                />
              </>
            )}/>
            <Route path="/home/location" render={() => <Location />}/> 
            <Route path="/home/links" render={() => <Links />}/> 
            <Route path="/home/products" render={() => <Products />}/> 
          </Switch>          
        )
      }
    </>
  );
};

export default Merchant;