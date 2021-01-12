import React, { FC, useContext, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AtucasaContext } from '../../Context';
import ShowProducts from '../ShowProducts/ShowProducts';
import SignOut from '../SignForms/SignOut';

interface IParams {
  params: { slug: string }
}
interface IMerchantProps {
  match?: IParams,
  merchant?: TShowMerchant
};

const ShowMerchantNoLogged:FC<IMerchantProps & RouteComponentProps> = ({ match, merchant }):JSX.Element => {
  const { currentUser } = useContext<TContextProps>(AtucasaContext);
  const [ currentMerchant, setCurrentMerchant ] = useState<TShowMerchant | null>(null);
  const [ showProducts, setShowProducts ] = useState<boolean>(false);
  const [ country, setCountry ] = useState<string>();
  const [ state, setState ] = useState<string>();
  const [ city, setCity ] = useState<string>();
  const [ address, setAddress ] = useState<string>();

  useEffect(() => {
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
      })
      .catch(console.error);
    }
  }, [match.params.slug, merchant]);

  return (
    <>
      {
        currentUser && (
          <>
            <SignOut />
            <br/>
            <br/>
          </>
        )
      }
      <Link to="/">Go back to home page</Link>
      {
        currentMerchant && (
          <div key={ currentMerchant.merchant_info.id }>
            <p style={{ color: "red" }}>You have to be logged to buy through the website</p>
            <p style={{ color: "red" }}>You can always contact the merchant through their phone or email</p>
            <h2>{ currentMerchant.merchant_info.merchant_name }</h2>
            <p><strong>Description</strong>: { currentMerchant.merchant_info.description }</p>
            <p><strong>Phone Number</strong>: { currentMerchant.merchant_info.phone_number }</p>
            <p><strong>Email</strong>: { currentMerchant.email}</p>
            <p><strong>Location</strong>
              : { `${country}, ${state}, ${city}, ${address}.` }
            </p>
            <br/>
            <h3>Products</h3>
            <button onClick={ () => setShowProducts(!showProducts) }>
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
