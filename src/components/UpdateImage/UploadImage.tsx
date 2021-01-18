import React, { FC } from 'react';
import { app } from '../../base';

interface IPictureProps {
  setPicture: React.Dispatch<React.SetStateAction<string>>,
  pictureName?: string
}

const UploadImage: FC<IPictureProps> = ({ setPicture, pictureName }): JSX.Element => {

  const onFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(`${pictureName}${file.name}`);
      await fileRef.put(file);
      const getUrl = await fileRef.getDownloadURL();
      setPicture(getUrl);
    }
  };

  return (
    <input 
      type="file" 
      onChange={ onFileChange }
    />
  );
};

export default UploadImage;