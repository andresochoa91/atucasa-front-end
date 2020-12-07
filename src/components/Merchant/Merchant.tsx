import React, { FC } from 'react';
import EditUser from '../EditUser/EditUser';
import EditMerchant from '../Merchant/EditMerchant';

const Merchant: FC = (): JSX.Element => {
  return (
    <>
      <h1>Merchant</h1>
      <EditUser />
      <EditMerchant />
    </>
  );
}

export default Merchant;