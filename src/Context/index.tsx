import React, { FC, createContext, useState, useEffect } from 'react';

export const AtucasaContext = createContext({} as TContextProps);

export const Provider: FC = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<TCurrentUser | null>(null);

  useEffect(() => {
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
        setCurrentUser({ user_id: id, email, role })
      }
    })
  }, [setCurrentUser])

  return (
    <AtucasaContext.Provider value={{
      currentUser,
      setCurrentUser
    }}>
      { children }
    </AtucasaContext.Provider>
  );

}
