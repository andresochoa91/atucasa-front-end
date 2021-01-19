import React, { FC, createContext, useState, useEffect } from 'react';

export const AtucasaContext = createContext({} as TContextProps);

export const Provider: FC = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<TCurrentUser | null>(null);
  const [ location, setLocation ] = useState<TLocation | null>(null);
  const [ loggedOut, setLoggedOut ] = useState<boolean>(false);
  const [ merchants, setMerchants ] = useState<Array<TShowMerchant>>([]);
  const [ searchMerchants, setSearchMerchants ] = useState<Array<TShowMerchant> | null>(null);
  const [ currentCustomer, setCurrentCustomer ] = useState<TCurrentCustomer | null>(null);
  const [ currentMerchant, setCurrentMerchant ] = useState<TCurrentMerchant | null>(null);
  const [ currentMessageValidation, setCurrentMessageValidation ] = useState<boolean>(false);
  const [ currentMessage, setCurrentMessage ] = useState<string>("");
  const [ currentTitleMessage, setCurrentTitleMessage ] = useState<string>("");
  const [ cart, setCart ] = useState<Array<TCartProduct>>([]);
  const [ openCart, setOpenCart ] = useState<boolean>(false);
  const [ cartModal, setCartModal ] = useState<boolean>(false);


  const handleCurrentCustomer = () => {
    fetch(`${process.env.REACT_APP_API}/current_user/customer`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCurrentCustomer(data.customer);
    })
    .catch(console.error);
  };

  const handleLocation = (): void => {
    fetch(`${process.env.REACT_APP_API}/current_user/location`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (!data.error) {
        const { country, city, state, address, zip_code, details, latitude, longitude } = data.location;
        setLocation({ country, city, state, address, zip_code, details, latitude, longitude });
      }
    })
    .catch(console.error);
  }

  const handleCurrentUser = (): void => {
    fetch(`${process.env.REACT_APP_API}/current_user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (!data.error) {
        const { id, email, role } = data.user;
        setCurrentUser({ user_id: id, email, role });
        setLoggedOut(false);
        handleLocation();
      }
    })
    .catch(console.error);
  };

  useEffect(handleCurrentUser, []);

  const handleMerchants = ():void => {
    fetch(`${process.env.REACT_APP_API}/merchants`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      setMerchants(data.merchants);
    })
  };

  useEffect(handleMerchants, []);

  return (
    <AtucasaContext.Provider value={{
      currentUser,
      setCurrentUser,
      handleCurrentUser,
      location,
      setLocation,
      handleLocation,
      loggedOut,
      setLoggedOut,
      merchants,
      setMerchants,
      currentCustomer,
      setCurrentCustomer,
      currentMerchant,
      setCurrentMerchant,
      handleCurrentCustomer,
      handleMerchants,
      searchMerchants,
      setSearchMerchants,
      currentMessageValidation,
      setCurrentMessageValidation,
      currentMessage, 
      setCurrentMessage,
      currentTitleMessage, 
      setCurrentTitleMessage,
      cart,
      setCart,
      openCart,
      setOpenCart,
      cartModal,
      setCartModal
    }}>
      { children }
    </AtucasaContext.Provider>
  );
};
