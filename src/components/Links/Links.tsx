import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateLink from './CreateLink';
import LinkUrl from './LinkUrl';

const Links: FC = (): JSX.Element => {
  const [ links, setLinks ] = useState<TLinks>([]);
  
  const handleLinks = (): void => {
    fetch(`${process.env.REACT_APP_API}/current_user/links`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setLinks([...data.links]);
    })
    .catch(console.error);
  };

  useEffect(handleLinks, []);

  return (
    <>
      <Link to="/">Go back to home page</Link>    
      <h2>Links</h2>
      { links.map((link) => (
        <LinkUrl handleLinks={ handleLinks } link={ link } key={ link.id } />
      )) }
      <CreateLink handleLinks={ handleLinks } />
    </>
  );
};

export default Links;
