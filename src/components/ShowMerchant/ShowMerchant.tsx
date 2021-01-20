import React, { FC, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import ShowProducts from '../ShowProducts/ShowProducts';
import downarrow from '../../pictures/downarrow.png';
import uparrow from '../../pictures/uparrow.png';
import ScrollableAnchor, { goToAnchor } from 'react-scrollable-anchor';
import Cart from '../Cart/Cart';
import { Modal } from 'react-bootstrap';
import ContainerJumbotron from '../ContainerJumbotron/ContainerJumbotron';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';

interface IParams {
  params: { slug: string }
}
interface IMerchantProps {
  match?: IParams,
  merchant?: TShowMerchant
};

const ShowMerchantNoLogged:FC<IMerchantProps & RouteComponentProps> = ({ match, merchant }):JSX.Element => {

  const { 
    currentUser, 
    handleCurrentUser, 
    cart, 
    openCart, 
    currentCustomer,
    cartModal,
    setCartModal 
  } = useContext<TContextProps>(AtucasaContext);

  const [ currentMerchant, setCurrentMerchant ] = useState<TShowMerchant | null>(null);
  const [ showProducts, setShowProducts ] = useState<boolean>(false);
  const [ state, setState ] = useState<string>();
  const [ city, setCity ] = useState<string>();
  const [ address, setAddress ] = useState<string>();
  const [ userChecked, setUserChecked ] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    if (merchant) {
      const { state, city, address } = merchant.location;
      setCurrentMerchant(merchant);
      setState(state);
      setCity(city);
      setAddress(address);
    } else {
      fetch(`${process.env.REACT_APP_API}/${match.params.slug}`)
      .then(response => response.json())
      .then(data => {
        if (mounted) {
          setCurrentMerchant({
            email: data.email ? data.email : "",
            links: data.links ? data.links : [],
            location: data.location,
            merchant_info: data.merchant_info ? data.merchant_info : "",
            products: data.products
          })
          console.log(data.location)
          const { state, city, address } = data.location;
          setState(state);
          setCity(city);
          setAddress(address);
        }
      })
      .catch(console.error);
    }
    return () => {mounted = false};
  }, [match.params.slug, merchant]);

  return (
    <>
      {
        !currentUser && (
          <a
            style={{
              position: 'fixed',
              right: "10px",
              top: "10px",
              borderColor: "#444",
              borderWidth: "5px"
            }}
            className="btn btn-primary"
            href="/"
          >
            Go to A Tu Casa
          </a>
        )
      }

      {
        currentMerchant && (
          <div key={ currentMerchant.merchant_info.id }>
            <div
              style={{
                backgroundImage: `url("${ currentMerchant.merchant_info.background_picture })"`,
                height: "500px",
                backgroundSize: "cover",
                backgroundPosition: 'center',
                backgroundRepeat: "no-repeat",
                display: "flex"
              }}
            >
              <div
                style={{
                  width: "100%",
                  margin: "auto",
                }}
              >
                <p
                  className="mb-0 w-100 mx-auto display-3 text-center"
                  style={{
                    textShadow: `
                      4px 4px 2px #fff, 
                      -4px -4px 2px #fff, 
                      -4px 4px 2px #fff, 
                      4px -4px 2px #fff
                    `
                  }}
                >
                  { currentMerchant.merchant_info.merchant_name }
                </p>

                <p
                  className="mb-5 w-100 mx-auto h2 text-center"
                  style={{
                    textShadow: `
                      4px 4px 2px #fff, 
                      -4px -4px 2px #fff, 
                      -4px 4px 2px #fff, 
                      4px -4px 2px #fff
                    `
                  }}
                >
                  { currentMerchant.merchant_info.description }
                </p>

                <div
                  style={{
                    width: "200px",
                    margin: "auto"
                  }}
                >
                  <img 
                    src={ currentMerchant.merchant_info.profile_picture } 
                    alt="img"
                    height="200px"
                    width="200px"
                    style={{
                      margin: "auto",
                      borderRadius: "50%",
                      boxShadow: "0 0 15px 20px rgba(0,0,0,0.6)"
                    }}
                  />
                </div>
              </div>
            
            </div>

            <ScrollableAnchor id="show-products">
              <div
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  setShowProducts(!showProducts);
                  if (!showProducts) goToAnchor("#show-products", true)
                  if (showProducts) goToAnchor("#no-show-products", true)
                  if (!userChecked) {
                    handleCurrentUser();  
                    setUserChecked(true);
                  }
                }}
                className="mt-4"
              >

                {
                  showProducts && (
                    <>
                      <div
                        style={{
                          width: "50px",
                          margin: "auto"
                        }}
                      >
                        <img
                          src={uparrow}
                          height="50px"
                          alt="down-arrow"
                          style={{
                            width: "50px"
                          }}
                        />
                      </div>
                      <hr
                        style={{
                          backgroundColor: "#000",
                          border: "none",
                          color: "#eee",
                          height: "3px",
                          margin: "0"
                        }}
                      />
                    </>
                  )
                }

                <p className="text-center font-weight-bold mb-0 h4">
                  { !showProducts ? "Click arrow to see products" : "Click arrow to hide products" }
                </p>
                {
                  !showProducts && (
                    <>
                      <hr
                        style={{
                          backgroundColor: "#000",
                          border: "none",
                          color: "#eee",
                          height: "3px",
                          margin: "0"
                        }}
                      />
                      <div
                        style={{
                          width: "50px",
                          margin: "auto"
                        }}
                      >
                        <img
                          src={downarrow}
                          height="50px"
                          alt="down-arrow"
                          style={{
                            width: "50px"
                          }}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </ScrollableAnchor>

            {
              showProducts && (  
                <>
                  <ShowProducts 
                    merchantID={ currentMerchant.merchant_info.id } 
                    products={ currentMerchant.products }
                  />
                </>        
              )
            }

            {
              openCart && currentUser && (
                <Modal
                  size="lg"
                  show={cartModal}
                  onHide={() => setCartModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                      Cart
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {
                      cart.length ? (
                        <Cart 
                          merchantID={ currentMerchant.merchant_info.id }
                          currentCustomerID={ currentCustomer?.id }
                        />
                      ) : (
                        <p>Cart is empty</p>
                      )
                    }
                  </Modal.Body>
                </Modal>

              )
            }
            <ContainerJumbotron>

              <div
                className="d-flex flex-wrap justify-content-around"
              >
                <MultiPurposeCard>
                  <tbody>
                    <tr><td>
                      <h4>Merchant Information</h4>
                    </td></tr>
                    <tr><td>
                      <p><strong>Phone Number</strong>: { currentMerchant.merchant_info.phone_number }</p>
                    </td></tr>
                    <tr><td>
                      <p><strong>Email</strong>: { currentMerchant.email}</p>
                    </td></tr>
                    <tr><td>
                      <p><strong>Location</strong>
                        : { `${address}, ${city}, ${state}.` }
                      </p>
                    </td></tr>
                  </tbody>
                </MultiPurposeCard>

                <MultiPurposeCard>
                  <tbody>
                    <tr><td>
                      <h4>Links</h4>
                    </td></tr>
                    {
                      currentMerchant.links &&
                      currentMerchant.links.map((link) => (
                        <tr key={ link.id }><td>
                          <p><strong>{ link.site_name }</strong>: <a href={ link.url } target={`_blank`}>{ link.url }</a></p>
                        </td></tr>
                      ))
                    }
                  </tbody>
                </MultiPurposeCard>
              </div>

            </ContainerJumbotron>
          </div>
        ) 
      }
    </>
  );
};

export default ShowMerchantNoLogged;
