import React, { FC, useContext, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import BackHomePage from '../BackHomePage/BackHomePage';
import ShowProducts from '../ShowProducts/ShowProducts';

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
        currentUser ? <BackHomePage /> : <Link to="/">Go back to home page</Link>
      }
      
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
            <h2>{ currentMerchant.merchant_info.merchant_name }</h2>
            <p><strong>Description</strong>: { currentMerchant.merchant_info.description }</p>
            <p><strong>Phone Number</strong>: { currentMerchant.merchant_info.phone_number }</p>
            <p><strong>Email</strong>: { currentMerchant.email}</p>
            <p><strong>Location</strong>
              : { `${country}, ${state}, ${city}, ${address}.` }
            </p>
            <br/>
            <h3>Products</h3>
            <button 
              onClick={ () => {
                setShowProducts(!showProducts);
                if (!userChecked) {
                  handleCurrentUser();  
                  setUserChecked(true);
                }
              }
            }>
              { showProducts ? "Do not show products" : "Show products" }
            </button>
            <br/>
            <br/>
            {
              showProducts && (          
                <ShowProducts 
                  merchantID={ currentMerchant.merchant_info.id } 
                  products={ currentMerchant.products }
                />
              )
            }
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
