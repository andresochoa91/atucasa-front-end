import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

import cookie from 'react-cookies';

const DeleteLink: FC<TLinkProps & TLinksProps> = ({ link, handleLinks }): JSX.Element => {

  /**Delete request to api to delete links */
  const handleDelete = (): void => {
    if (window.confirm("are you sure?")) {
      fetch(`${process.env.REACT_APP_API}/current_user/links/${link.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": cookie.load("token")
        }
      })
      .then(response => response.json())
      .then(data => {
        handleLinks();
      })
      .catch(console.error);
    }
  };

  return (
    <Button className="btn-danger" onClick={ handleDelete }>Delete</Button>  
  );
};

export default DeleteLink;
