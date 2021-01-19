import React, { FC, useContext, useEffect, useState } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditCustomer from'./EditCustomer';
import EditLocation from '../Location/EditLocation';
import Location from '../Location/Location';
import Orders from '../Orders/Orders';
import MyMap from '../MyMap/MyMap';
import { Switch, Link, Route } from 'react-router-dom';
import ScrollableAnchor, { goToAnchor } from 'react-scrollable-anchor';
import ContainerJumbotron from '../ContainerJumbotron/ContainerJumbotron';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';
import { Image } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';

const Customer: FC = (): JSX.Element => {
  const { currentUser, location, handleCurrentCustomer, currentCustomer, setSearchMerchants } = useContext<TContextProps>(AtucasaContext);
  const [ searchbox, setSearchbox ] = useState<string>(""); 
  const [ tempProduct, setTempProduct ] = useState<string>(""); 
  const [ showMap, setShowMap ] = useState<boolean>(false);
  const [ loadingMap, setLoadingMap ] = useState<boolean>(false);

  // const history = useHistory();

  useEffect(() => {
    if (!currentCustomer) {
      handleCurrentCustomer();
    }
  }, [currentCustomer, handleCurrentCustomer]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingMap(true);
    fetch(`${process.env.REACT_APP_API}/merchants/product/${searchbox}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setLoadingMap(false);
      setSearchMerchants(data.merchants);
      setTempProduct(searchbox);
      setShowMap(true);
      setTimeout(() => {
        goToAnchor("#show-map", true)
      }, 200)
      // history.push('/home/map');
    })
    .catch(console.error);
  };

  return(
    <Switch>
      {
        (currentUser && currentCustomer && location) && (
          <>
            <Route exact path="/home" render={() => (
              <ContainerJumbotron>
                <h1 className="mb-4 font-weight-bold">Welcome { currentCustomer.username }</h1>
                <h5>Looking for products close to you?</h5>
                <h5 className="mb-4" >Find closest merchants close to you that have your desired product</h5>
                <form onSubmit={ handleSearch }>
                  <div className="input-group mb-3 container" id="searchbox">
                    <ScrollableAnchor id="show-map">
                      <input 
                        type="text" 
                        name={ "searchbox" }
                        onChange={ (event) => setSearchbox(event.target.value) }
                        placeholder="Type product" 
                        value={ searchbox }
                        className="ml-5 form-control" 
                      />
                    </ScrollableAnchor>
                    <div className="input-group-append mr-5">
                      <a type="submit" className="btn btn-outline-info" href='#show-map'>Search Product</a>
                    </div>
                  </div>
                </form>
                { 
                  showMap && !loadingMap ? (
                    <div className="mt-5">                      
                      <h5>These are the merchants close to you that have that match with "{ tempProduct }"</h5>
                      <MyMap lat={location.latitude} lng={location.longitude} />
                    </div>
                  ) : loadingMap && (
                    <p>Loading map...</p>
                  )
                }
              </ContainerJumbotron>
            )} />
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

            <Route path="/home/orders" render={() => (
              <ContainerJumbotron>
                <Orders />
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
            <Route 
              path="/home/edit_customer" 
              render={() => (
                <ContainerJumbotron>
                  <EditCustomer 
                    currentCustomer={ currentCustomer }
                    handleCurrentCustomer={handleCurrentCustomer}
                  />
                </ContainerJumbotron>
              )} 
            />
            <Route 
              path="/home/edit_location" 
              render={() => (
                <ContainerJumbotron>
                  <EditLocation />
                </ContainerJumbotron>
              )} 
            />
            <Route path="/home/user_information" 
              render={() => (
                <ContainerJumbotron>
                  <h2>User Information</h2>
                  <MultiPurposeCard>
                    
                    <thead>
                      <tr>
                        <th className="text-capitalize h3">
                          <h2>
                            <strong>
                              { currentCustomer.username }
                            </strong>
                          </h2>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr><td>
                        <Image 
                          src={ currentCustomer.profile_picture } 
                          alt="pic"
                          height={ 150 }
                          width={ 150 }
                          roundedCircle
                        />
                      </td></tr>
                      {/* <tr><td className="h3">Username: { currentCustomer.username }</td></tr> */}
                      <tr><td><strong>First Name:</strong>  { currentCustomer.first_name }</td></tr>
                      <tr><td><strong>Last Name:</strong>  { currentCustomer.last_name }</td></tr>
                      <tr><td><strong>Email:</strong>  { currentUser.email }</td></tr>
                      <tr><td><strong>Phone Number:</strong>  { currentCustomer.phone_number }</td></tr>
                      <tr><td className="pb-0">
                        <Link className="btn btn-primary mr-2" to='/home/edit_user'>Update account data</Link>
                        <Link className="btn btn-primary" to='/home/edit_customer'>Edit personal data</Link>
                      </td></tr>
                    </tbody>
                  </MultiPurposeCard>
                </ContainerJumbotron>
              )
            } />
            {/* <Route path="/home/personal_information" 
              render={() => (
                <>
                  <h2>Personal information</h2>
                </>
              )
            } /> */}
            <Route 
              path="/home/location" 
              render={() => (
                <ContainerJumbotron>
                  <Location />
                </ContainerJumbotron>
              ) 
            } />
          </>
        )
      }
    </Switch>
  );
};

export default Customer;