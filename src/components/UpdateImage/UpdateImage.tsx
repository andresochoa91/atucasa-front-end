import React, { FC, useState } from 'react'
import { Button } from 'react-bootstrap';
import UploadImage from './UploadImage';

interface IImageProps {
  currentPicture?: string,
  userName?: string,
  newPicture: string,
  setNewPicture: React.Dispatch<React.SetStateAction<string>>,
  namePicture: string
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UpdateImage: FC<IImageProps> = (
  {
    currentPicture, 
    userName, 
    handleInput,
    newPicture,
    setNewPicture,
    namePicture 
  }): JSX.Element => {

  const [ copyUrl, setCopyUrl ] = useState<boolean>(false);
  const [ uploadImage, setUploadImage ] = useState<boolean>(false);

  return (
    <div>
      <img 
        src={ newPicture ? newPicture : currentPicture } 
        alt="img"
        height={ 200 }
        className="mb-3"
      />
      <br/>
      {
        newPicture && (
          <>
            <Button 
              className="mb-2"
              onClick={ () => setNewPicture("") }>Keep original image
            </Button>
            <br/>
          </>
        )
      }
      {
        !uploadImage && (
          <div 
            onClick={ (event) => {
              event.preventDefault();
              setCopyUrl(!copyUrl);
              setUploadImage(false); 
            }}
            style={{
              cursor: "pointer"
            }}
            className={ `mr-2 ${ !copyUrl ? "btn btn-primary" : "text-primary" }` }
          >
            { !copyUrl ? "Copy url of the image" : "Go back" }
          </div>
        )
      }
      {
        !copyUrl && (
          <div 
            onClick={ (event) => {
              event.preventDefault();
              setUploadImage(!uploadImage);
              setCopyUrl(false); 
            }}
            style={{
              cursor: "pointer"
            }}
            className={ `${ !uploadImage ? "btn btn-primary" : "text-primary" }` }
          >
            { !uploadImage ? "Upload image from Computer" : "Go back" }
          </div>
        )
      }



      {
        copyUrl && (
          <>
            <label className="mr-2">Copy url of the image</label>
            <input 
              type="text"
              name={ namePicture }
              value={ newPicture }
              onChange={ handleInput }
              placeholder={ currentPicture }
              className="mt-3"
            />
          </>
        )
      }
      {
        uploadImage && (
          <>
            <label>Upload image</label>
            <br/>
            <UploadImage 
              setPicture={ setNewPicture }
              pictureName={ userName }
            />
          </>
        )
      }
    </div>
  )
};

export default UpdateImage
