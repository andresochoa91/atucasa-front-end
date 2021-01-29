import React, { FC, useContext, useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import SignOut from '../SignForms/SignOut';
import cartPicture from '../../pictures/cartPicture.png';

const MainNavbar: FC = (): JSX.Element => {  
  const { 
    currentUser, 
    currentCustomer, 
    currentMerchant, 
    setOpenCart, 
    setCartModal,
    cart 
  } = useContext<TContextProps>(AtucasaContext);
  const history = useHistory();
  const [ showCart, setShowCart ] = useState<boolean>(false);

  
  useEffect(() => {
    /**Regular Expression used to check if path contains /merchants/ */
    const regex = /\/merchants\//g;

    /**Current path */
    const url = history.location.pathname;

    //Checks if we are in merchants path
    if (url && ((JSON.stringify(url.match(regex))) === (JSON.stringify(["/merchants/"])))) {
      setShowCart(true);
    }
  }, [history]);

  return (
    <>
      {
        currentUser && (
          <Navbar bg="dark" variant="dark" className="py-0" sticky="top">
            <Nav className="mr-auto">
              <Navbar.Brand className="mt-2 ml-4 lead" href="/home">A Tu Casa</Navbar.Brand>
              <Nav.Link className="px-2 py-3 text-info" href="/home/map">Map</Nav.Link>
              <Nav.Link className="px-2 py-3 text-info" href="/home/orders">Orders</Nav.Link>
              { currentMerchant && <NavLink className="nav-link px-3 py-3 text-info" to="/home/products">Products</NavLink> }
            </Nav>

            {
              (showCart && currentUser.role === "customer") && (
                <Nav>
                  <img 
                    src={cartPicture} 
                    alt="cart"
                    width="40px"
                    onClick={() => {
                      setCartModal(true)
                      setOpenCart(true);
                    }}
                    style={{
                      cursor: "pointer"
                    }}
                  />
                  {
                    cart.length ? (
                      <div
                        style={{
                          height: "20px",
                          width: "20px",
                          borderColor: "#f00",
                          backgroundColor: "#f00",
                          borderRadius: "50%"
                        }}
                      >
                        <p 
                          className="text-center text-light"
                          style={{
                            fontSize: "13px"
                          }}
                        >
                          { cart.length }
                        </p>
                      </div>
                    ) : <></>
                  }
                </Nav>
              )
            } 

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
              <NavDropdown.Item href="/home/location">Location</NavDropdown.Item>
              { currentMerchant && <NavDropdown.Item href="/home/links">Links</NavDropdown.Item> }              
              { currentMerchant && <NavDropdown.Item href="/home/products">Products</NavDropdown.Item> }              
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <SignOut />
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar>
        ) 
      }
    </>
  );
}

export default MainNavbar;