import React, { FC } from 'react';

const DeleteLink: FC<TLinkProps & TLinksProps> = ({ link, handleLinks }): JSX.Element => {

  const handleDelete = (): void => {
    if (window.confirm("are you sure?")) {
      fetch(`http://localhost:3000/current_user/links/${link.id}`, {
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
    <>
      <button onClick={ handleDelete }>Delete</button>  
    </>
  );
};

export default DeleteLink;
