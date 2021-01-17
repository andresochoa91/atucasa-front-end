import React, { FC, useContext, useEffect, useState } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditCustomer from'./EditCustomer';
import EditLocation from '../Location/EditLocation';
import Location from '../Location/Location';
import Orders from '../Orders/Orders';
import MyMap from '../MyMap/MyMap';
import { Switch, Link, Route } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const Customer: FC = (): JSX.Element => {
  const { currentUser, location, handleCurrentCustomer, currentCustomer, setSearchMerchants } = useContext<TContextProps>(AtucasaContext);
  const [ searchbox, setSearchbox ] = useState<string>(""); 
  const [ tempProduct, setTempProduct ] = useState<string>(""); 
  const [ showMap, setShowMap ] = useState<boolean>(false);

  // const history = useHistory();

  useEffect(() => {
    if (!currentCustomer) {
      handleCurrentCustomer();
    }
  }, [currentCustomer, handleCurrentCustomer]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}/merchants/product/${searchbox}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setSearchMerchants(data.merchants);
      setTempProduct(searchbox);
      setShowMap(true);
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
              <>
                <h1 className="mb-4">Welcome { currentCustomer.username }</h1>

                <h5>Looking for products close to you?</h5>
                <h5 className="mb-4" >Find closest merchants close to you that have your desired product</h5>

                <form onSubmit={ handleSearch }>
                  <div className="input-group mb-3 container" id="searchbox">
                    <input 
                      type="text" 
                      name={ "searchbox" }
                      onChange={ (event) => setSearchbox(event.target.value) }
                      placeholder="Type product" 
                      value={ searchbox }
                      className="ml-5 form-control" 
                    />
                    <div className="input-group-append mr-5">
                      <button 
                        type="submit"
                        className="btn btn-outline-info" 
                      >
                        Search Product
                      </button>
                    </div>
                  </div>
                </form>
                { 
                  showMap && (
                    <div className="mt-5">
                      <h5>These are the merchants close to you that have that match with "{ tempProduct }"</h5>
                      <h5 className="mb-4">Click Merchant on map and visit their website to start buying</h5>
                      <MyMap lat={location.latitude} lng={location.longitude} />
                    </div>
                  ) 
                }
              </>
            )} />
            <Route path="/home/map" render={() => (
              location.latitude && location.longitude ? (
                <MyMap lat={location.latitude} lng={location.longitude} />
              ) : (
                <MyMap />
              )
            )}/>

            <Route path="/home/orders" render={() => <Orders />} />
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
                  <h2>Personal information</h2>
                  <Link to='/home/edit_customer'>Edit personal information</Link>
                  <p><strong>Profile Picture: </strong></p>
                  <img 
                    src={ currentCustomer.profile_picture } 
                    alt="pic"
                    height={ 100 }
                  />
                  <p><strong>Username: </strong>{ currentCustomer.username }</p>
                  <p><strong>First Name: </strong>{ currentCustomer.first_name }</p>
                  <p><strong>Last Name: </strong>{ currentCustomer.last_name }</p>
                  <p><strong>Phone Number: </strong>{ currentCustomer.phone_number }</p>
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