import React, { FC, useContext, useState } from 'react'
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';

const CreateLink: FC<TLinksProps> = ({ handleLinks }): JSX.Element => {

  const {
    setCurrentMessageValidation, 
    currentMessage, 
    setCurrentMessage,
    currentTitleMessage,
    setCurrentTitleMessage 
  } = useContext<TContextProps>(AtucasaContext);

  const [ siteName, setSiteName ] = useState<string>("");
  const [ url, setUrl ] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { name, value } = event.target;
    ( name === "siteName" ? setSiteName : setUrl )(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}/current_user/links`, {
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
        if (data.error.site_name) {
          setCurrentMessage(`Site name ${data.error.site_name[0]}`);
          setCurrentTitleMessage("Error Site Name")
        } else if (data.error.url) {
          setCurrentMessage(`${data.error.url[0]}`);
          setCurrentTitleMessage("Error Url")
        }
        setCurrentMessageValidation(true) 
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>
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
