import React, { FC } from 'react';

const SignOut: FC = () => {
  
  const handleSignOut = (event:React.MouseEvent<HTMLButtonElement>):void => {
    event.preventDefault();
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "DELETE"
    })
    .then(response => response.json())
    .then(console.log)
    .catch(err => console.error(err))
  }

  return (
    <button onClick={ handleSignOut }>Sign Out</button>
  );
}

export default SignOut;