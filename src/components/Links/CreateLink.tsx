import React, { FC, useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AtucasaContext } from '../../Context';
import MainModal from '../MainModal/MainModal';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';
import cookie from 'react-cookies';

interface ILinksProps {
  onCreateLink: boolean,
  setOnCreateLink: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateLink: FC<TLinksProps & ILinksProps> = ({ handleLinks, setOnCreateLink }): JSX.Element => {

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

  /**
   *Checks all the information submitted by the merchant is correct
   *Creates links 
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API}/current_user/links`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.load("token")
      },
      body: JSON.stringify({
        site_name: siteName,
        url
      })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        setSiteName("")
        setUrl("")
        handleLinks();
        setOnCreateLink(false);

      } else {
        //Handling validations in response sent from the back-end
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
      <h2 className="mb-4">Create Link</h2>
      <MainModal titleMessage={ currentTitleMessage }>
        <p>{ currentMessage }</p>
      </MainModal>

      <form onSubmit={ handleSubmit }>
        <Button 
          onClick={ () => setOnCreateLink(false) }
          className="mb-5"
        >
          Close create link window
        </Button>
        <MultiPurposeCard>
          <tbody>
            <tr><td>
              <strong>Site Name:&nbsp;</strong>   
              <input 
                type="text"
                name="siteName"
                value={ siteName }  
                onChange={ handleInput } 
                style={{
                  width: "300px"
                }} 
              /> 
            </td></tr>
            
            <tr><td>
              <strong>Url:&nbsp;</strong>   
              <input 
                type="text"
                name="url"
                value={ url }  
                onChange={ handleInput } 
                style={{
                  width: "355px"
                }} 
              />
            </td></tr>

            <tr><td className="pb-0">
              <Button 
                type="submit" 
                value="Submit"
                className="btn-success"
              >
                Create link
              </Button>
            </td></tr>
          </tbody>
        </MultiPurposeCard>
      </form>
    </>
  );
};

export default CreateLink;
