import React, { FC, useEffect, useState } from 'react';

const ShowMerchant: FC<TMerchantProps> = ({ merchant }): JSX.Element => {

  const [ current_user, setCurrentUser ] = useState<TCurrentUser>();

  console.log(merchant.user_id)
  console.log(`${process.env.REACT_APP_API}/users/${merchant.user_id?.toString()}`)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/users/${merchant.user_id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.user);
      setCurrentUser(data.user);
    })
    .catch(console.error);
  }, [merchant.user_id]);

  return (
    <div>
      { current_user && current_user.email}
    </div>
  );
};

export default ShowMerchant;
