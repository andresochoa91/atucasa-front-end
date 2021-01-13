import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AtucasaContext } from '../../Context';

const BackHomePage: FC = (): JSX.Element => {

  const { setSearchMerchants } = useContext<TContextProps>(AtucasaContext);

  return (
    <Link 
      to="/home"
      onClick={ () => setSearchMerchants(null) }
    >
      Go back to home page
    </Link>     
  );
};

export default BackHomePage;
