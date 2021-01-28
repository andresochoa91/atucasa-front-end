import React, { FC, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ContainerJumbotron from '../ContainerJumbotron/ContainerJumbotron';
import CreateLink from './CreateLink';
import LinkUrl from './LinkUrl';

import cookie from 'react-cookies';

const Links: FC = (): JSX.Element => {
  const [ links, setLinks ] = useState<TLinks>([]);
  const [ onCreateLink, setOnCreateLink ] = useState<boolean>(false);
  
  /**
   *Get request, gets links associated with current metchant
   */
  const handleLinks = (): void => {
    fetch(`${process.env.REACT_APP_API}/current_user/links`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.load("token")
      }
    })
    .then(response => response.json())
    .then(data => {
      setLinks([...data.links]);
    })
    .catch(console.error);
  };

  useEffect(handleLinks, []);

  return (
    <>
      <h2 className="mb-5">Links</h2>
      {
        !onCreateLink && (
          <Button
            className="mb-5"
            onClick={() => setOnCreateLink(!onCreateLink)}
          >
            Create Link
          </Button>
        )
      }
      {
        onCreateLink && (
          <ContainerJumbotron>
            <CreateLink 
              handleLinks={ handleLinks } 
              onCreateLink={ onCreateLink }
              setOnCreateLink={ setOnCreateLink }
            />
          </ContainerJumbotron>

        )
      }
      { links.map((link) => (
        <LinkUrl handleLinks={ handleLinks } link={ link } key={ link.id } />
      )) }
    </>
  );
};

export default Links;
