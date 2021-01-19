import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

const DeleteLink: FC<TLinkProps & TLinksProps> = ({ link, handleLinks }): JSX.Element => {

  const handleDelete = (): void => {
    if (window.confirm("are you sure?")) {
      fetch(`${process.env.REACT_APP_API}/current_user/links/${link.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
