import React, { FC, useState } from 'react';

const EditLink: FC<THandleMode & TLinksProps & TLinkProps> = ({ handleMode, handleLinks, link }): JSX.Element => {

  const [ siteName, setSiteName ] = useState<string>(link.site_name);
  const [ url, setUrl ] = useState<string>(link.url);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { name, value } = event.target;
    ( name === "siteName" ? setSiteName : setUrl)(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}/current_user/links/${link.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        site_name: siteName,
        url
      })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        console.log(data);
        handleLinks();
        handleMode();
      } else {
        console.log(data);
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <h2>Edit Link</h2>
      <form onSubmit={ handleSubmit }>
        <label>Site Name</label>   
        <input 
          type="text"
          name="siteName"
          value={ siteName }  
          onChange={ handleInput } 
        />
        <br/>
        <label>Url</label>   
        <input 
          type="text"
          name="url"
          value={ url }  
          onChange={ handleInput } 
        />
        <br/>
        <input type="submit" value="Submit"/>
        <button onClick={ handleMode }>Cancel</button>
      </form> 
    </>
  );
};

export default EditLink;
