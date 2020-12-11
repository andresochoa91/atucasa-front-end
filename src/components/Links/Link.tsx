import React, { FC, useState } from 'react';
import EditLink from './EditLink';

const Link: FC<TLinkProps & TLinksProps> = ({ link, handleLinks }): JSX.Element => {

  const [ inEditMode, setInEditMode ] = useState<boolean>(false);

  const handleMode = (): void => {
    setInEditMode(!inEditMode);
  };

  return (
    <>
      {
        inEditMode ?
        <EditLink handleMode={ handleMode } link={ link } handleLinks={ handleLinks } /> :
        <>
          <p><strong>Site Name: </strong>{ link.site_name }</p> 
          <p><strong>Url: </strong>{ link.url }</p>
          <button onClick={ handleMode }>Edit</button>
          <button>Delete</button>
          <br/> 
          <br/> 
        </>       
      }
    </>
  );
};

export default Link;
