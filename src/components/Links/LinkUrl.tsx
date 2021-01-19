import React, { FC, useState } from 'react';
import EditLink from './EditLink';
import DeleteLink from './DeleteLink';
import MultiPurposeCard from '../MultiPurposeCard/MultiPurposeCard';
import { Button } from 'react-bootstrap';

const LinkUrl: FC<TLinkProps & TLinksProps> = ({ link, handleLinks }): JSX.Element => {

  const [ inEditMode, setInEditMode ] = useState<boolean>(false);

  const handleMode = (): void => {
    setInEditMode(!inEditMode);
  };

  return (
    <div className="mb-3">
      {
        inEditMode ? (
          <EditLink 
            handleMode={ handleMode } 
            link={ link } 
            handleLinks={ handleLinks } 
          /> 
        ) : (
          <>
            <MultiPurposeCard>
              <tbody>

                <tr><td>
                  <p className="mb-1"><strong>Site Name: </strong>{ link.site_name }</p> 
                  <p className="mb-1"><strong>Url: </strong><a href={ link.url }>{ link.url }</a></p>
                </td></tr>

                <tr><td className="pb-0">
                  <Button className="mr-2" onClick={ handleMode }>Edit</Button>
                  <DeleteLink link={ link } handleLinks={ handleLinks } />
                </td></tr>
              </tbody>                      
            </MultiPurposeCard>
          </>       
        )
      }
    </div>
  );
};

export default LinkUrl;
