import React, { FC, createContext, useState, useEffect } from 'react';

export const AtucasaContext = createContext({} as TContextProps);

export const Provider: FC = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<TCurrentUser | null>(null);
  const [ location, setLocation ] = useState<TLocation | null>(null);
  const [ loggedOut, setLoggedOut ] = useState<boolean>(false);

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
        // "Accept": "application/json"
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

  return (
    <AtucasaContext.Provider value={{
      currentUser,
      setCurrentUser,
      handleCurrentUser,
      location,
      setLocation,
      handleLocation,
      loggedOut,
      setLoggedOut
    }}>
      { children }
    </AtucasaContext.Provider>
  );
};
