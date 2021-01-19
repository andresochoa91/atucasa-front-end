import React, { FC, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';

const EditLink: FC<THandleMode & TLinksProps & TLinkProps> = ({ handleMode, handleLinks, link }): JSX.Element => {

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
    ( name === "siteName" ? setSiteName : setUrl)(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!siteName && !url) {
      setCurrentMessage("There is nothing to update");
      setCurrentTitleMessage("Error updating Site");
      setCurrentMessageValidation(true); 
      return;
    }

    interface IUrlSubmit {
      site_name?: string,
      url?: string
    }

    const urlSubmit: IUrlSubmit = {
      site_name: siteName ? siteName : link.site_name,
      url: url ? url : link.url
    };

    fetch(`${process.env.REACT_APP_API}/current_user/links/${link.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(urlSubmit)
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        console.log(data);
        handleLinks();
        handleMode();
      } else if (data.error.site_name) {
        setCurrentMessage(`Site Name ${data.error.site_name[0]}`);
        setCurrentTitleMessage("Error updating Site Name");
        setCurrentMessageValidation(true); 
      } else if (data.error.url) {
        setCurrentMessage(data.error.url[0]);
        setCurrentTitleMessage("Error updating Url");
        setCurrentMessageValidation(true); 
      }
    })
    .catch(console.error);
  };

  return (
    <>
      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>
      <form onSubmit={ handleSubmit }>
        <MultiPurposeCard>

          <tbody>
            <tr><td>
              <label><strong>Site Name:</strong>&nbsp;</label>   
              <input 
                type="text"
                name="siteName"
                value={ siteName }  
                onChange={ handleInput } 
                placeholder={ link.site_name }
              />
            </td></tr>

            <tr><td>
              <label><strong>Url:</strong>&nbsp;</label>   
              <input 
                type="text"
                name="url"
                value={ url }  
                onChange={ handleInput } 
                placeholder={ link.url }
                style={{
                  width: "278px"
                }}
              />
            </td></tr>
            <tr><td className="pb-0">
              <Button className="btn-success mr-2" type="submit">Update</Button>
              <Button onClick={ handleMode }>Cancel</Button>
            </td></tr>
          </tbody>
        </MultiPurposeCard>
      </form> 
    </>
  );
};

export default EditLink;
