import React, { FC, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import ShowProducts from '../ShowProducts/ShowProducts';
import downarrow from '../../pictures/downarrow.png';
import uparrow from '../../pictures/uparrow.png';

interface IParams {
  params: { slug: string }
}
interface IMerchantProps {
  match?: IParams,
  merchant?: TShowMerchant
};

const ShowMerchantNoLogged:FC<IMerchantProps & RouteComponentProps> = ({ match, merchant }):JSX.Element => {
  const { currentUser, handleCurrentUser } = useContext<TContextProps>(AtucasaContext);
  const [ currentMerchant, setCurrentMerchant ] = useState<TShowMerchant | null>(null);
  const [ showProducts, setShowProducts ] = useState<boolean>(false);
  const [ country, setCountry ] = useState<string>();
  const [ state, setState ] = useState<string>();
  const [ city, setCity ] = useState<string>();
  const [ address, setAddress ] = useState<string>();
  const [ userChecked, setUserChecked ] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    if (merchant) {
      const { country, state, city, address } = merchant.location;
      setCurrentMerchant(merchant);
      setCountry(country);
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
          const { country, state, city, address } = data.location;
          setCountry(country);
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
        currentMerchant && (
          <div key={ currentMerchant.merchant_info.id }>
            {
              !currentUser && (
                <>
                  <p style={{ color: "red" }}>You have to be logged to buy through the website</p>
                  <p style={{ color: "red" }}>You can always contact the merchant through their phone or email</p>
                </>
              )
            }
            <div
              style={{
                backgroundImage: `url("${ currentMerchant.merchant_info.background_picture })"`,
                height: "400px",
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
                  className="mb-4"
                  style={{
                    width: "100%",
                    margin: "auto",
                    fontSize: "60px",
                    textAlign: "center",
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

            {/* <h2>{ currentMerchant.merchant_info.merchant_name }</h2> */}

            
            <div
              style={{
                cursor: "pointer"
              }}
              onClick={() => {
                setShowProducts(!showProducts);
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

            <p><strong>Description</strong>: { currentMerchant.merchant_info.description }</p>
            <p><strong>Phone Number</strong>: { currentMerchant.merchant_info.phone_number }</p>
            <p><strong>Email</strong>: { currentMerchant.email}</p>
            <p><strong>Location</strong>
              : { `${country}, ${state}, ${city}, ${address}.` }
            </p>
            <br/>
            
            <br/>
            <br/>
            <br/>
            <h3>Links</h3>
            {
              currentMerchant.links &&
              currentMerchant.links.map((link) => (
                <div key={ link.id }>
                  <p><strong>{ link.site_name }</strong>: { link.url }</p>
                </div>
              ))
            }
          </div>
        ) 
      }
    </>
  );
};

export default ShowMerchantNoLogged;
