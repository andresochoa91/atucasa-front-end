import React, { FC, useContext } from 'react';
import { Navbar, Nav, NavDropdown, Image/* , Form, FormControl, Button */ } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import SignOut from '../SignForms/SignOut';
import cart from '../../pictures/cart.png';

const MainNavbar: FC = () => {

  const {  currentUser, currentCustomer, currentMerchant, setOpenCart, setCartModal } = useContext<TContextProps>(AtucasaContext);

  // const helper = () => {
  //   setLoggedOut(true);
  //   // auth.signOut();
  // }

  return (
    <>
      {
        currentUser && (
          <Navbar bg="dark" variant="dark" className="py-0" sticky="top">
            <Nav className="mr-auto">
              <Navbar.Brand className="mt-2 ml-4 lead" href="/home">A Tu Casa</Navbar.Brand>
              <Nav.Link className="px-2 py-3 text-info" href="/home/map">Map</Nav.Link>
              <Nav.Link className="px-2 py-3 text-info" href="/home/orders">Orders</Nav.Link>
              {/* <NavLink className="nav-link px-2 py-3 text-info" to="/home/orders">Orders</NavLink> */}
              { currentMerchant && <NavLink className="nav-link px-3 py-3 text-info" to="/home/products">Products</NavLink> }
            </Nav>

            <Nav>
              <img 
                src={cart} 
                alt="cart"
                width="40px"
                onClick={() => {
                  setCartModal(true)
                  setOpenCart(true);
                }}
              />
            </Nav>
            
            <NavDropdown 
              className="mr-2"
              drop="left"
              title={
                <Image 
                  height={ 45 } 
                  width={ 45 } 
                  roundedCircle
                  src={ currentCustomer?.profile_picture || currentMerchant?.profile_picture } 
                  className="border border-info"
                  alt="img"
                  style={{
                    // borderRadius: "50%",
                    backgroundSize: "cover",
                    backgroundColor: "white",
                    border: "20px",
                    borderColor: "black"
                  }}
                />
              } 
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/home">Home</NavDropdown.Item>
              <NavDropdown.Item href="/home/user_information">Account</NavDropdown.Item>
              {/* { currentCustomer && <NavDropdown.Item href="/home/personal_information">Personal Information</NavDropdown.Item> } */}
              <NavDropdown.Item href="/home/location">Location</NavDropdown.Item>
              { currentMerchant && <NavDropdown.Item href="/home/links">Links</NavDropdown.Item> }              
              { currentMerchant && <NavDropdown.Item href="/home/products">Products</NavDropdown.Item> }              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <SignOut />
              </NavDropdown.Item>
            </NavDropdown>
            {/* <SignOut /> */}
          </Navbar>
        ) 
      }      
    </>
  );
}

export default MainNavbar;