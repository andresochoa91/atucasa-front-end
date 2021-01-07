import React, { FC, useState } from 'react'
import UploadImage from './UploadImage';

interface IImageProps {
  currentPicture?: string,
  userName?: string,
  newPicture: string,
  setNewPicture: React.Dispatch<React.SetStateAction<string>>,
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UpdateImage: FC<IImageProps> = (
  {
    currentPicture, 
    userName, 
    handleInput,
    newPicture,
    setNewPicture 
  }): JSX.Element => {

  const [ copyUrl, setCopyUrl ] = useState<boolean>(false);
  const [ uploadImage, setUploadImage ] = useState<boolean>(false);

  return (
    <div>
      <img 
        src={ newPicture ? newPicture : currentPicture } 
        alt="img"
        height={ 200 }
      />
      <br/>
      {
        newPicture && (
          <>
            <button onClick={ () => setNewPicture("") }>Keep original image</button>
            <br/>
          </>
        )
      }
      {
        !uploadImage && (
          <button 
            onClick={ (event) => {
              event.preventDefault();
              setCopyUrl(!copyUrl);
              setUploadImage(false); 
            }}
          >
            { !copyUrl ? "Copy url of the image" : "Go back" }
          </button>
        )
      }
      {
        !copyUrl && (
          <button 
            onClick={ (event) => {
              event.preventDefault();
              setUploadImage(!uploadImage);
              setCopyUrl(false); 
            }}
          >
            { !uploadImage ? "Upload image from Computer" : "Go back" }
          </button>
        )
      }
      <br/>
      <br/>
      {
        copyUrl && (
          <>
            <label>Copy url of the image</label>
            <input 
              type="text"
              name="profilePicture"
              value={ newPicture }
              onChange={ handleInput }
              placeholder={ currentPicture }
            />
            <br/>
            <br/>
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
            <br/>
            <br/>
          </>
        )
      }
    </div>
  )
};

export default UpdateImage
