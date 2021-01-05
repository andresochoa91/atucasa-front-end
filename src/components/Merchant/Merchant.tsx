import React, { FC, useState, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditMerchant from'./EditMerchant';
import EditLocation from'../Location/EditLocation';
import Location from '../Location/Location';
import Links from '../Links/Links';
import Products from '../Products/Products';
import Orders from '../Orders/Orders';

const Merchant: FC = (): JSX.Element => {
  const { currentUser, location } = useContext<TContextProps>(AtucasaContext);
  const [ showOrder, setShowOrder ] = useState<boolean>(false);
  const [ currentMerchant, setCurrentMerchant ] = useState<TCurrentMerchant | null>(null);

  const handleCurrentMerchant = () => {
    fetch(`${process.env.REACT_APP_API}/current_user/merchant`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCurrentMerchant(data.merchant);
    })
    .catch(console.error);
  };

  useEffect(handleCurrentMerchant, []);
  
  return(
    <>
      {
        (currentUser && currentMerchant && location) && (
          <>
            <h1>Merchant</h1>
            <button onClick={ () => setShowOrder(!showOrder) }>
              {
                showOrder ? "Do not show orders" : "Show orders"
              }
            </button>
            {
              showOrder && (
                <Orders />
              )
            }
            <EditUser />
            <EditMerchant 
              handleCurrentMerchant={ handleCurrentMerchant }
              currentMerchant={ currentMerchant }
            />
            <EditLocation />
            <h2>Personal information</h2>
            <p><strong>Email: </strong>{ currentUser.email }</p>
            <p><strong>Role: </strong>{ currentUser.role }</p>
            <p><strong>Merchant Name: </strong>{ currentMerchant.merchant_name }</p>
            <p><strong>Slug: </strong>{ currentMerchant.slug }</p>
            <p><strong>Phone Number: </strong>{  currentMerchant.phone_number }</p>
            <p><strong>Tax ID: </strong>{ currentMerchant.tax_id }</p>
            <p><strong>Description: </strong>{  currentMerchant.description }</p>
            <p><strong>Profile Picture: </strong></p>
            <img 
              src={ currentMerchant.profile_picture } 
              alt="pic"
              height={ 100 }
            />
            <p><strong>Background Picture: </strong></p>
            <img 
              src={ currentMerchant.background_picture } 
              alt="pic"
              height={ 100 }
            />
            <Location />
            <Links />
            <Products />
          </>
        )
      }
    </>
  );
};

export default Merchant;