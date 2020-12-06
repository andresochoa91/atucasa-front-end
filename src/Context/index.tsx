import React, { FC, createContext, useState } from 'react';

export const AtucasaContext = createContext({} as TContextProps);

export const Provider: FC = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<TCurrentUser | null>(null);

  return (
    <AtucasaContext.Provider value={{
      currentUser,
      setCurrentUser
    }}>
      { children }
    </AtucasaContext.Provider>
  );

}
