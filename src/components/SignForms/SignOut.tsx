import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';

const SignOut: FC = () => {
  const { setCurrentUser } = useContext<TContextProps>(AtucasaContext);


  const handleSignOut = (event:React.MouseEvent<HTMLButtonElement>):void => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}/logout`, {
      credentials: "include",
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCurrentUser(null);
    })
    .catch(err => console.error(err))
  };

  return (
    <button onClick={ handleSignOut }>Sign Out</button>
  );
}

export default SignOut;