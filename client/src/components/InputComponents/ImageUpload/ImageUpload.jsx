import React,{useState} from 'react';
import classNames from 'classnames';
import { useField } from 'formik';
import CONSTANTS from '../../../constants.js'


const ImageUpload = props => {
  const [{value,...restField}, meta, helpers] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  const onChange = e => {
    const node = window.document.getElementById('imagePreview');
    const file = e.target.files[0];
    const imageType = /^image\//;
    if (!file||!file.type.replace(imageType,'')) {
      e.target.value = '';
    } else {
      helpers.setValue(file,false);
    }
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg, *.jpg)</span>
        <input
          {...restField}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg, .jpg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Chose file</label>
      </div>
      {(value || props.avatar)&&
      <img
        id="imagePreview"
        className={classNames( imgStyle )}
        src={
      value
        ? URL.createObjectURL(value)
        : props.avatar === 'anon.png'
          ? CONSTANTS.ANONYM_IMAGE_PATH
          : `${CONSTANTS.publicURL}/${props.avatar}`
    }
        alt="user"
      />}
    </div>
  );
};

export default ImageUpload;
