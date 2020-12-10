import React, { FC, createContext, useState, useEffect } from 'react';

export const AtucasaContext = createContext({} as TContextProps);

export const Provider: FC = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<TCurrentUser | null>(null);
  const [ location, setLocation ] = useState<TLocation | null>(null);

  const handleLocation = (): void => {
    fetch("http://localhost:3000/current_user/location", {
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
        const { country, city, state, address, zip_code, details } = data.location;
        setLocation({ country, city, state, address, zip_code, details });
      }
    })
    .catch(console.error);
  }

  const handleCurrentUser = (): void => {
    fetch("http://localhost:3000/current_user", {
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
        const { id, email, role } = data.user;
        setCurrentUser({ user_id: id, email, role });
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
      handleLocation
    }}>
      { children }
    </AtucasaContext.Provider>
  );
};
