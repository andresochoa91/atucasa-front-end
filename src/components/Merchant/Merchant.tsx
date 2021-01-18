import React, { FC, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditMerchant from'./EditMerchant';
import EditLocation from'../Location/EditLocation';
import Location from '../Location/Location';
import Links from '../Links/Links';
import Products from '../Products/Products';
import Orders from '../Orders/Orders';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import MyMap from '../MyMap/MyMap';
import ContainerJumbotron from '../ContainerJumbotron/ContainerJumbotron';

const Merchant: FC = (): JSX.Element => {
  const { currentUser, location, currentMerchant, setCurrentMerchant } = useContext<TContextProps>(AtucasaContext);

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

  useEffect(handleCurrentMerchant, [setCurrentMerchant]);
  
  return (
    <>
      {/* <h1>Welcome { currentMerchant?.merchant_name }</h1> */}
      {
        (currentUser && currentMerchant && location) && (          
          <Switch>
            <Route exact path="/home" render={() => <Redirect to={ `/merchants/${currentMerchant.slug}` } />} />
            <Route path="/home/map" render={() => (
              <ContainerJumbotron>
                {
                  location.latitude && location.longitude ? (
                    <MyMap lat={location.latitude} lng={location.longitude} />
                  ) : (
                    <MyMap />
                  )
                }
              </ContainerJumbotron>
            )}/>
            <Route path="/home/edit_user" render={() => <EditUser />}/> 
            <Route path="/home/edit_merchant" render={() => (
              <EditMerchant 
                handleCurrentMerchant={ handleCurrentMerchant }
                currentMerchant={ currentMerchant }
              />
            )}/> 
            <Route 
              path="/home/edit_location" 
              render={() => (
                <ContainerJumbotron>
                  <EditLocation />
                </ContainerJumbotron>
              )
            }
            /> 
            <Route 
              path="/home/orders" 
              render={() => (
                <ContainerJumbotron>
                  <Orders />
                </ContainerJumbotron>
              )
            }/> 
            <Route path="/home/user_information" render={() => (
              <ContainerJumbotron>
                <h2>User information</h2>
                <Link to="/home/edit_user">Update email or password</Link>
                <br/>
                <Link to="/home/edit_merchant">Edit merchant information</Link>
                <br/>
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
                <p><strong>Email: </strong>{ currentUser.email }</p>
                <p><strong>Merchant Name: </strong>{ currentMerchant.merchant_name }</p>
                <p><strong>Phone Number: </strong>{  currentMerchant.phone_number }</p>
                <p><strong>Tax ID: </strong>{ currentMerchant.tax_id }</p>
                <p><strong>Description: </strong>{  currentMerchant.description }</p>
              </ContainerJumbotron>
            )}/>
            <Route 
              path="/home/location" 
              render={() => (
                <ContainerJumbotron>
                  <Location />
                </ContainerJumbotron>
              )}
            /> 

            <Route 
              path="/home/links" 
              render={() => (
                <ContainerJumbotron>
                  <Links />
                </ContainerJumbotron>
              )}
            /> 

            <Route 
              path="/home/products" 
              render={() => (
                <ContainerJumbotron>
                  <Products />
                </ContainerJumbotron>
              )}
            /> 
          </Switch>          
        )
      }
    </>
  );
};

export default Merchant;