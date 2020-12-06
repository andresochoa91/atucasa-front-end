import React, { FC, createContext, useState } from 'react';

export const AtucasaContext = createContext<any>("");

export const Provider: FC = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<any>(null);

  // useEffect(() => {
  //   fetch("http://localhost:3000/current_user")
  //   .then(response => response.json())
  //   .then(setCurrentUser)
  // }, [currentUser]);

  return (
    <AtucasaContext.Provider value={{
      currentUser,
      setCurrentUser
    }}>
      { children }
    </AtucasaContext.Provider>
  );

}
