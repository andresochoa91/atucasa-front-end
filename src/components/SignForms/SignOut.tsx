import React, { FC, useContext } from 'react';
import { AtucasaContext } from '../../Context';
// import { useHistory } from 'react-router-dom';

const SignOut: FC = () => {
  const { setCurrentUser, setLoggedOut } = useContext<TContextProps>(AtucasaContext);
  // const history = useHistory();

  const handleSignOut = ():void => {
    fetch(`${process.env.REACT_APP_API}/logout`, {
      credentials: "include",
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setLoggedOut(true);
      setCurrentUser(null);
    })
    .catch(err => console.error(err))
  };

  return (
    <button onClick={ () => {
      // history.push('/');
      handleSignOut(); 
    }}>
      Sign Out
    </button>
  );
}

export default SignOut;