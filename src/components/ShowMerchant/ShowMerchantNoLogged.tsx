import React, { FC, useEffect, useState } from 'react';
import ShowProducts from '../ShowProducts/ShowProducts';

interface IMerchantProps {
  match: any
};

const ShowMerchantNoLogged:FC<IMerchantProps> = ({ match }):JSX.Element => {
  const [ merchant, setMerchant ] = useState<TShowMerchant | null>(null);
  const [ showProducts, setShowProducts ] = useState<boolean>(false);
  const [ country, setCountry ] = useState<string>();
  const [ state, setState ] = useState<string>();
  const [ city, setCity ] = useState<string>();
  const [ address, setAddress ] = useState<string>();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/${match.params.slug}`)
    .then(response => response.json())
    .then(data => {
      setMerchant({
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
  }, [match.params.slug]);

  return (
    <>
      {
        merchant && (
          <div key={ merchant.merchant_info.id }>
            <p><strong>Email</strong>: { merchant.email}</p>
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
                  merchantID={ merchant.merchant_info.id } 
                  products={ merchant.products }
                />
              )
            }
            <br/>
            <h3>Links</h3>
            {
              merchant.links &&
              merchant.links.map((link) => (
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
