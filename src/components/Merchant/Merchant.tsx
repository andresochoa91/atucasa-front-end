import React, { FC, useState, useContext, useEffect } from 'react';
import { AtucasaContext } from '../../Context';
import EditUser from '../EditUser/EditUser';
import EditMerchant from'./EditMerchant';
import EditLocation from'../Location/EditLocation';
import Location from '../Location/Location';
import Links from '../Links/Links';
import Products from '../Products/Products';

const Merchant: FC = (): JSX.Element => {
  const { currentUser, location } = useContext<TContextProps>(AtucasaContext);
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
            <EditUser />
            <EditMerchant handleCurrentMerchant={handleCurrentMerchant}/>
            <EditLocation />
            <h2>Personal information</h2>
            <p><strong>Email: </strong>{ currentUser.email }</p>
            <p><strong>Role: </strong>{ currentUser.role }</p>
            <p><strong>Merchant Name: </strong>{ currentMerchant.merchant_name }</p>
            <p><strong>Slug: </strong>{ currentMerchant.slug }</p>
            <p><strong>Phone Number: </strong>{  currentMerchant.phone_number }</p>
            <p><strong>Tax ID: </strong>{ currentMerchant.tax_id }</p>
            <p><strong>Description: </strong>{  currentMerchant.description }</p>
            <p><strong>Profile Picture: </strong>{  currentMerchant.profile_picture }</p>
            <p><strong>Background Picture: </strong>{  currentMerchant.background_picture }</p>
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