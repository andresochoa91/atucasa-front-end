import React, { FC, useState } from 'react'

const CreateLink: FC<TLinksProps> = ({ handleLinks }): JSX.Element => {

  const [ siteName, setSiteName ] = useState<string>("");
  const [ url, setUrl ] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { name, value } = event.target;
    ( name === "siteName" ? setSiteName : setUrl )(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch("http://localhost:3000/current_user/links", {
      method: "POST",
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
        setSiteName("")
        setUrl("")
        handleLinks();
      } else {
        console.log(data);
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <h2>Create Link</h2>
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
      </form> 
    </>
  );
};

export default CreateLink;
