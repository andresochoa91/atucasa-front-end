import React, { FC } from 'react';

const EditLink: FC<THandleMode & TLinksProps & TLinkProps> = ({ handleMode, handleLinks, link }): JSX.Element => {
  return (
    <>
      <h1>In Edit Mode</h1>
      <button onClick={ handleMode }>Cancel</button>
    </> 
  );
};

export default EditLink;
