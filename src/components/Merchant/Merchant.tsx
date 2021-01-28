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
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';
import cookie from 'react-cookies';

/**Main Merchant page */
const Merchant: FC = (): JSX.Element => {
  const { currentUser, location, currentMerchant, setCurrentMerchant } = useContext<TContextProps>(AtucasaContext);

  //Get request to api to get current merchant
  const handleCurrentMerchant = () => {
    fetch(`${process.env.REACT_APP_API}/current_user/merchant`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.load("token")
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

            <Route 
              path="/home/edit_user" 
              render={() => (
                <ContainerJumbotron>
                  <EditUser />
                </ContainerJumbotron>
              )}
            /> 

            <Route path="/home/edit_merchant" render={() => (
              <ContainerJumbotron>
                <EditMerchant 
                  handleCurrentMerchant={ handleCurrentMerchant }
                  currentMerchant={ currentMerchant }
                />
              </ContainerJumbotron>
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
                <h2 className="mb-5">User Information</h2>
                <MultiPurposeCard>

                  <thead>
                    <tr>
                      <th className="text-capitalize h3">
                        <h2>
                          <strong>
                            { currentMerchant.merchant_name }
                          </strong>
                        </h2>
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr><td>
                      <div className="d-flex flex-wrap justify-content-around">
                        <div>
                          <p><strong>Profile Picture: </strong></p>
                          <img 
                            src={ currentMerchant.profile_picture } 
                            alt="pic"
                            height={ 100 }
                          />
                        </div>
                        <div>
                          <p><strong>Background Picture: </strong></p>
                          <img 
                            src={ currentMerchant.background_picture } 
                            alt="pic"
                            height={ 100 }
                          />
                        </div>
                      </div>
                    </td></tr>

                    <tr><td><strong>Email: </strong>  { currentUser.email }</td></tr>
                    <tr><td><strong>Phone Number: </strong>  { currentMerchant.phone_number }</td></tr>
                    <tr><td><strong>Tax ID: </strong>  { currentMerchant.tax_id }</td></tr>
                    <tr><td><strong>Description: </strong>  { currentMerchant.description }</td></tr>
                    <tr><td className="pb-0">
                      <Link className="btn btn-primary mr-1" to="/home/edit_user">Update email or password</Link>
                      <Link className="btn btn-primary" to="/home/edit_merchant">Edit merchant information</Link>
                    </td></tr>
                  </tbody>
                </MultiPurposeCard>
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