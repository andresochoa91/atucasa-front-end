import React, { FC, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import SignOut from '../SignForms/SignOut';

const MainNavbar: FC = () => {

  const {  currentUser, currentCustomer, currentMerchant } = useContext<TContextProps>(AtucasaContext);

  // const helper = () => {
  //   setLoggedOut(true);
  //   // auth.signOut();
  // }

  return (
    <>
      {
        currentUser && (
          <Navbar bg="dark" variant="dark" className="py-0">
            <NavLink className="mb-1 mt-1" to="/home">
              <img 
                height={ 45 } 
                width={ 45 } 
                src={ currentCustomer?.profile_picture || currentMerchant?.profile_picture } 
                alt="img"
                style={{
                  borderRadius: "50%",
                  backgroundSize: "cover",
                  backgroundColor: "white"
                }}
              />
            </NavLink>
            <Nav className="mr-auto">
              <NavLink className="nav-link px-3 py-3 ml-3 text-info" to="/home/map">Map</NavLink>
              <NavLink className="nav-link px-3 py-3 text-info" to="/home/orders">Orders</NavLink>
              <NavLink className="nav-link px-3 py-3 text-info" to="/home/user_information">Account Information</NavLink>
              { currentCustomer && <NavLink className="nav-link px-3 py-3 text-info" to="/home/personal_information">Personal Information</NavLink> }
              <NavLink className="nav-link px-3 py-3 text-info" to="/home/location">Location</NavLink>
              { currentMerchant && <NavLink className="nav-link px-3 py-3 text-info" to="/home/links">Links</NavLink> }
              { currentMerchant && <NavLink className="nav-link px-3 py-3 text-info" to="/home/products">Products</NavLink> }
            </Nav>
            <SignOut />
          </Navbar>
        ) 
      }      
    </>
  );
}

export default MainNavbar;